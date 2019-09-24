const express = require('express');
const router = express.Router();
const messages = require('../models/messages');

router.get('/:chat', async(req, res)=>{
    const chat = req.params.chat;
    const messagesChat = await messages.find({idChat:chat});
    res.json(messagesChat);

})

router.post('/new/:chat',async(req, res)=>{
    const {chat} = req.params.chat
    const {user, message, date} = req.body;

    const messageChat = new messages({chat, user, message, date});
    await messageChat.save();
    
    res.json('Guardado!');

})