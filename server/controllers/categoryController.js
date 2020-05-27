module.exports = {
  newCategory: async (req, res) => {
    const db = req.app.get('db')
    const {serverId} = req.params
    const {categoryName} = req.body

    await db.category.new_category([categoryName, serverId])

    res.sendStatus(200)
  },

  getCategories: async (req, res) => {
    const db = req.app.get('db')
    const {serverId} = req.params

    const categories = await db.category.get_categories([serverId])

    res.status(200).send(categories)
  }
}