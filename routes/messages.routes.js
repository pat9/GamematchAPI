const express = require('express');
const router = express.Router();
const messages = require('../models/messages');
const socket = require('../sockets/index').socket
const mongoose = require('mongoose')

router.get('/:chat', async(req, res)=>{
    const chat = req.params.chat;
    console.log(`get Messages: ${chat}`)
    const messagesChat = await messages.find({chat}).populate('user').exec();
    console.log(messagesChat)
    res.json(messagesChat);

})

router.post('/new/:chat',async(req, res)=>{
    const {chat} = req.params
    console.log(chat)
    const {user, message, date} = req.body;
    
    const messageChat = new messages({ chat, user, message, date});
    await messageChat.save();

    const messageS = await messages.findOne(messageChat).populate('user').exec()

    socket.io.to(chat).emit('newMessage', messageS)
    
    res.json('Guardado!');

})

module.exports = router