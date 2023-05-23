const Room = require('../model/room');

const mongoose = require('mongoose');
require('dotenv').config();
const Booking = require('../model/booking');
// const { v4: uuidv4 } = require('uuid');
// const stripe = require('stripe')('sk_test_51N90CwSFazNLpqlU7qJl3DNyiUCcx4h38KEiX1glYeorKxnTU5hxBfoRENFpBcdFZFJd9QLuW9LyLC58cHFMp600009BRGLZI5')
const braintree = require("braintree");
//payment gateway
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.Braintree_Merchent_Id,
    publicKey: process.env.Braintree_Public_Key,
    privateKey: process.env.Braintree_Private_Key
});
//book a room   
const bookroom = async(req, res) => {
    const { room, userid, fromdate, todate, totalamount, totaldays, nonce } = req.body;
    try {
        let newTransaction = gateway.transaction.sale({
                amount: totalamount,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true
                }

            },

            async function(err, result) {
                if (result) {
                    try {
                        const newbooking = await Booking.create({ room: room.name, roomid: room._id, userid, fromdate, todate, totalamount, totaldays, transactionid: "123456789" });
                        const roomtemp = await Room.findById(room._id);
                        roomtemp.currentbooking.push({
                            bookingid: newbooking._id,
                            fromdate: fromdate,
                            todate: todate,
                            userid: userid,
                            status: newbooking.status
                        });
                        await roomtemp.save();

                    } catch (e) {

                        res.status(400).json({ message: e.message })
                    }


                    res.send("payment successfull your room is booked")
                } else {
                    res.satus(400).send(err)
                }
            });
    } catch (err) {
        console.log(err.message)
    }
}




//payment gateway controller
const getToken = async(req, res) => {
        try {
            gateway.clientToken.generate({}, function(error, response) {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        message: error
                    })
                } else {
                    // console.log(response)
                    res.status(200).send(response)
                }
            })

        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "some error in payment token verification"
            })
        }
    }
    //get a room of user
const getroombyuser = async(req, res) => {

        try {
            const { id } = req.params;
            const data = await Booking.find({ userid: id }).sort({ createdAt: -1 });
            // console.log(res);
            res.status(200).json(data);
        } catch (err) {
            res.status(400).json({ message: err.message })

        }
    }
    //update a booking
const updatebooking = async(req, res) => {
        try {
            const { id } = req.params;
            const data = await Booking.findById(id);
            data.status = "cancelled";
            await data.save();
            const roomid = data.roomid;
            const room = await Room.findById(roomid);
            room.maxcount = room.maxcount + 1;
            const newbooking = room.currentbooking.filter((item) => item.bookingid != id);
            room.currentbooking = newbooking;
            await room.save();
            res.status(200).json({ message: "booking cancelled" });


        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
    //get all bookings
const getallbookings = async(req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 }) //newest come first;

        res.status(200).json(bookings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};



module.exports = { getroombyuser, bookroom, getToken, updatebooking, getallbookings }