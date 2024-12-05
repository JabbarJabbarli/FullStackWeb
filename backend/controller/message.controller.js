import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"

export const sendMessage = async (req, res) => {

    try {
        const { message } = req.body
        const senderId = req.user._id
        const { id: receiverId } = req.params

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }
        const newMessage = new Message({
            message,
            senderId,
            receiverId,
        })
        console.log(newMessage)

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        //socket io

        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json({ mes: "message sent" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: conversationId } = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, conversationId] }
        }).populate("messages") // will return array of object and put messages in it
        // to be more precise it inserts all the messages in the array one by one 

        if (!conversation) {
            res.status(404).json([])
        }

        const messages = conversation.messages

        res.status(200).json(messages)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}
