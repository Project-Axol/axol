module.exports = {
    newServer: async(req, res) => {
        const db = req.app.get('db')
        const { userId } = req.params
        const { serverName, serverImg, private, password } = req.body

        const [existing] = await db.server.check_server([serverName])

        if (existing) {
            return res.status(400).send('Server name taken')
        }

        const [{ server_id }] = await db.server.new_server([serverName, userId, serverImg, private, password])
        await db.server.new_server_user([userId, server_id])
        const [server] = await db.server.get_server([server_id])

        res.status(200).send(server)
    },

    getServers: async(req, res) => {
        const db = req.app.get('db')
        const { userId } = req.params

        const servers = await db.server.get_servers([userId])
        
        res.status(200).send(servers)
    },

  addUser: async (req, res) => {
    const db = req.app.get('db')
    const {userId, serverId} = req.body
    
    await db.server.new_server_user([userId, serverId])

    res.sendStatus(200)
  },

  getMost: async (req, res) => {
    const db = req.app.get('db')

    const servers = await db.server.get_most_users()

    res.status(200).send(servers)
  },

  searchServers: async (req, res) => {
    const db = req.app.get('db')
    let {search} = req.body

    search += '%'

    const results = await db.server.search_server([search])

    res.status(200).send(results)
  }
}