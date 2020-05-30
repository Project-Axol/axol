const express = require('express')
const session = require('express-session')
const massive = require('massive')
require('dotenv').config()
const path = require('path')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./socketHelpers/users')

const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server)

const usersCtrl = require('./controllers/usersController')
const serverCtrl = require('./controllers/serverController')
const categoryCtrl = require('./controllers/categoryController')
const channelCtrl = require('./controllers/channelController')

const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, //good for a month
    secret: SESSION_SECRET
}))

const timeDate = () => {
    let today = new Date()
    return today
        // return `${today.getHours()}:${('0'+today.getMinutes()).slice(-2)}`
}
io.on('connection', (socket) => {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('join-room', ({ room, username, profilePic }, callback) => {
        console.log("ROOOMMMMMMMOOOMMM: ", room)
        const { user } = addUser({ id: socket.id, username, room: room, profilePic })
        console.log('who got added: ', user)
        socket.emit('message', { user: 'axol-bot', text: `${user.username}, welcome to ${user.room}`, postTime: timeDate() })
        socket.broadcast.to(user.room).emit('message', { user: 'axol-bot', text: `${user.username}, joined ${user.room}` })
        socket.join(user.room);
        // callback()
    });
    // socket.on('join', ({ username, group, profilePic }, callback) => {
    //     console.log('incoming user: ', username, group)
    //     const { user } = addUser({ id: socket.id, username, group, profilePic })
    //     console.log('who got added: ', user)
    //     socket.emit('message', { user: 'axol-bot', text: `${user.username}, welcome to ${user.group}` })
    //     socket.broadcast.to(user.group).emit('message', { user: 'axol-bot', text: `${user.username}, joined ${user.group}` })
    //     socket.join(user.group)
    //     callback()
    // })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        console.log('socket id messegint on: ', socket.id, 'user: ', user, 'message: ', message)
        io.to(user.room).emit('message', { user: user.username, profilePic: user.profilePic, text: message, postTime: timeDate() })
        callback()
    })
    socket.on('disconnect', () => {
        console.log('user had left')
    })
})

app.post('/api/users', usersCtrl.validateAdduser)
app.get('/api/userss', usersCtrl.getUsers)

app.post('/api/servers/:userId', serverCtrl.newServer)
app.get('/api/servers/:userId', serverCtrl.getServers)
app.post('/api/servers', serverCtrl.addUser)
app.get('/api/most', serverCtrl.getMost)
app.post('/api/search', serverCtrl.searchServers)

app.post('/api/categories/:serverId', categoryCtrl.newCategory)
app.get('/api/categories/:serverId', categoryCtrl.getCategories)

app.post(`/api/channels/:categoryId`, channelCtrl.newChannel)
app.get(`/api/channels/:categoryId`, channelCtrl.getChannels)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(`${__dirname}/../client/build`));
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('DB connected and ready for use')
    server.listen(process.env.PORT || SERVER_PORT, () => console.log(`Server is up and running on port ${SERVER_PORT}`))
})