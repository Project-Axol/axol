module.exports = {
  getServerSettings: async (req, res) => {
    const db = req.app.get('db')
    const {serverId} = req.params

    const [settings] = await db.settings.get_server_settings([serverId])

    res.status(200).send(settings)
  },

  updateServerSettings: async (req, res) => {
    const db = req.app.get('db')
    const {serverId} = req.params

    const {private} = req.body

    await db.settings.update_server_settings([serverId, private])

    res.sendStatus(200)
  },

  checkAdmin: async (req, res) => {
    const db = req.app.get('db')
    const {serverId, userId} = req.body

    const [{admin_id}] = await db.settings.check_admin([serverId])

    userId === admin_id ? res.status(200).send(true) : res.status(200).send(false)
  },

  deleteServer: async (req, res) => {
    const db = req.app.get('db')
    const {serverId} = req.params
    let channels = []
    
    const getChannels = async (categoryId) => {
      channels = await db.channel.get_channels([categoryId])
      res.status(200).send('hit')
    }
    
    const categories = await db.category.get_categories([serverId])
    
    categories.forEach(category => {
      getChannels(category.category_id)
    })

  }
}