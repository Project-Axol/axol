const users = [];
const addUser = ({ id, username, group, profilePic }) => {
    const user = { id, username, group, profilePic }
    users.push(user)
    return { user }
}
const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => users.find(user => user.id === id)

const getUsersInGroup = (group) => users.filter(user => user.group === group)

module.exports = { addUser, removeUser, getUser, getUsersInGroup }