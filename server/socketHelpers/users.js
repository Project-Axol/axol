const users = [];
const addUser = ({ id, username, room, profilePic, userId }) => {
    const existingUser = users.find((user) => user.room === room && user.userId === userId);
    if (existingUser) {
        return { user: existingUser }
        // console.log(existingUser, s" existing user")

    }
    const user = { id, username, room, profilePic, userId }
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

const getUsersInRoom = (room) => users.filter(user => user.room === room)

const getRoom = (room) => {
    const usersInRoom = users.filter(user => user.room === room)
    if (usersInRoom) {
        return usersInRoom
    }
    return []
}
const getUserIds = (room, userId) => users.find(user => user.room === room && user.userId === userId)
module.exports = { addUser, removeUser, getUser, getUsersInRoom, getRoom, getUserIds }