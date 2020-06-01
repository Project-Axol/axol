const { addUser, removeUser, getUser, getUsersInRoom, getRoom } = require('../socketHelpers/users')
const timeDate = () => {
    let today = new Date()
    return today
        // return `${today.getHours()}:${('0'+today.getMinutes()).slice(-2)}`
}
module.exports = {
    socketOps: (socket, db, io) => {
        //join room
        socket.on('join-room', ({ room, username, profilePic, userId }, callback) => {
            // console.log(userId, " : userId being sent in")
            const { user } = addUser({ id: socket.id, username, room: room, profilePic, userId })
                // console.log(user, " user added:", io.sockets.clients())
            console.log(user, " user added:", io.sockets.adapter.rooms)
            socket.emit('message', { user: 'axol-bot', text: `${user.username}, welcome to ${user.room}`, postTime: timeDate() })
            socket.broadcast.to(user.room).emit('message', { user: 'axol-bot', text: `${user.username}, joined ${user.room}` })
            socket.join(user.room);
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
                // socket.emit('roomData', { users: getUsersInRoom(room) })

            // callback()
        });
        socket.on('sendMessage', (message, callback) => {
            const user = getUser(socket.id)
            io.to(user.room).emit('message', { user: user.username, profilePic: user.profilePic, text: message, postTime: timeDate() })
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
            callback()
        })
        socket.on('getAllUsersInAllRoom', (room, callback) => {
            socket.emit('channelData', { users: getUsersInRoom(room) })
            callback()
        })
        socket.on('disconnect', () => {
            const user = removeUser(socket.id);
            if (user) {
                // console.log('user had left')
            }
        })
    }
}