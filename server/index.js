const express = require('express')
const session = require('express-session')
const massive = require('massive')
require('dotenv').config()
const path = require('path')
    // const { addUser, removeUser, getUser, getUsersInRoom, getRoom } = require('./socketHelpers/users')

const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server)

const usersCtrl = require('./controllers/usersController')
const serverCtrl = require('./controllers/serverController')
const categoryCtrl = require('./controllers/categoryController')
const channelCtrl = require('./controllers/channelController')
const messagesCtrl = require('./controllers/messagesController')
const socketCtrl = require('./controllers/socketController')
const dmCtrl = require('./controllers/directMessagesController')

const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, //good for a month
    secret: SESSION_SECRET
}))

app.post('/api/users', usersCtrl.validateAdduser)
app.get('/api/users', usersCtrl.getUsers)

app.post('/api/servers/:userId', serverCtrl.newServer)
app.get('/api/servers/:userId', serverCtrl.getServers)
app.post('/api/servers', serverCtrl.addUser)
app.get('/api/most', serverCtrl.getMost)
app.post('/api/search', serverCtrl.searchServers)

app.post('/api/categories/:serverId', categoryCtrl.newCategory)
app.get('/api/categories/:serverId', categoryCtrl.getCategories)

app.post(`/api/channels/:categoryId`, channelCtrl.newChannel)
app.get(`/api/channels/:categoryId`, channelCtrl.getChannels)
    //get all current active users in each channel
app.get(`/app/channels/:serverId`, channelCtrl.getActiveChannelUser)
    //posts
app.post(`/api/messages`, messagesCtrl.newMessage)
app.get(`/api/messages/:channelId`, messagesCtrl.getMessages)
    //dms
app.post(`/api/conversations`, dmCtrl.newDmIfNotExist)
app.get(`/api/conversations/:user_id`, dmCtrl.getConversations)
app.get(`/api/dmMessages/:dmId`, dmCtrl.getDMmessages)


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
    io.on('connection', (socket) => {
        // once a client has connected, we expect to get a ping from them saying what room they want to join
        console.log('user conneted......')
        socketCtrl.socketOps(socket, dbInstance, io)
    })
})