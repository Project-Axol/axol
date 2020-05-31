module.exports = {
    newMessage: async(req, res) => {
        const db = req.app.get('db')
        const {
            userId,
            time,
            post,
            channelId,
            from
        } = req.body
        if (from === 'post') {
            const [messageAdded] = await db.messages.add_new_message([userId, channelId, post, time])
            if (messageAdded) return res.sendStatus(200)
        }
        res.sendStatus(300)
    },
    getMessages: async(req, res) => {
        const db = req.app.get('db')
        const { channelId } = req.params
        const messages = await db.messages.get_messages(+channelId)
        if (messages) {
            const msgs = messages.map(message => {
                return {
                    profilePic: message.profile_pic,
                    user: message.user_name,
                    text: message.post,
                    postTime: message.time
                }
            })
            return res.status(200).send(msgs)
        }
        res.sendStatus(309)
    }
}