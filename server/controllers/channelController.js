module.exports = {
    newChannel: async(req, res) => {
        const db = req.app.get('db')
        const { categoryId } = req.params
        const { channelName } = req.body

        await db.channel.new_channel([categoryId, channelName])

        res.sendStatus(200)
    },

    getChannels: async(req, res) => {
        const db = req.app.get('db')
        const { categoryId } = req.params

        const channels = await db.channel.get_channels([categoryId])

        res.status(200).send(channels)
    },
    getActiveChannelUser: async(req, res) => {
        const db = req.app.get('db')
        const { serverId } = req.params
        const channels = await db.channel.get_All_ServerChannels([serverId])
        res.status(200).send(channels)
    }
}