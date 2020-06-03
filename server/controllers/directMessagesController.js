module.exports = {
    getConversations: async(req, res) => {
        const { user_id } = req.params
        const db = req.app.get('db')
        const convos = await db.dms.get_dms(+user_id)
        res.status(200).send(convos)
    },
    newDmIfNotExist: async(req, res) => {
        const db = req.app.get('db')
        const { myId, myName, chatWith, chatWithName } = req.body
        const dmgName = `${chatWithName}, ${myName}`
            // const dm = await db.dms.add_dm()
        const [dm] = await db.dms.add_dm_if_not_exist([dmgName])
        if (dm) {
            await db.dms.add_users_to_dm([myId, chatWith, dm.dmg_id])
        }
        res.status(200).send(dm)
    },
    getDMmessages: async(req, res) => {
        const db = req.app.get('db')
        const { dmId } = req.params
        const dmMessages = await db.dms.get_db_messages(+dmId)
        if (dmMessages) {
            const msgs = dmMessages.map(message => {
                return {
                    profilePic: message.profile_pic,
                    user: message.user_name,
                    text: message.message,
                    postTime: message.time
                }
            })
            return res.status(200).send(msgs)
        }
        res.status(200).send(dmMessages)
    },
    getDMName: async(req, res) => {
        const db = req.app.get('db')
        const { dmId } = req.params
        console.log('dmId is : ', dmId)
        const [dm] = await db.dms.get_dm_name(+dmId)
        res.status(200).send(dm)

    }
}