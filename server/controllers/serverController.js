module.exports = {
    newServer: async(req, res) => {
        console.log("new server--------------")
        const db = req.app.get('db')
            // const {userId} = req.session.user
        const userId = 21
        const { serverName, serverImg, private, password } = req.body

        const [existing] = await db.server.check_server([serverName])
        console.log(existing)

        if (existing) {
            return res.status(400).send('Server name taken')
        }

        const [{ server_id }] = await db.server.new_server([serverName, userId, serverImg, private, password])
        await db.server.new_server_user([userId, server_id])
        const [server] = await db.server.get_server([server_id])

        res.status(200).send(server)
    },

    getServers: async(req, res) => {
        console.log('im getting the servers.....**********###########')
        const db = req.app.get('db')
        console.log('db content: ', db)
        const userId = 21

        const servers = await db.server.get_servers([userId])
        console.log('servers for user 21: ', servers)
        res.status(200).send(servers)
    }
}