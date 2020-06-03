module.exports = {
    validateAdduser: async(req, res) => {
        console.log(req.body)
        const { uid, displayName, email, photoURL } = req.body
        const db = req.app.get('db')
        const [userExist] = await db.get_user(uid)
        if (userExist) {
            return res.status(200).send(userExist)
        }
        let date = Date.now()
        const [addUser] = await db.add_user([displayName, date, uid, email, photoURL])
        if (!addUser) return res.sendStatus(500)
        res.status(200).send(addUser)
    },

    getUsers: async(req, res) => {
        const db = req.app.get('db')
        const { username } = req.query
        if (!username) return res.status(200).send([])
        console.log(username)
        const usrName = `${username}%`
        const users = await db.get_users(usrName)
        console.log(usrName)
        console.log(users)
        res.status(200).send(users)
    }
}