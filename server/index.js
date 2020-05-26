const express = require('express')
const session = require('express-session')
const massive = require('massive')
require('dotenv').config()
const path = require('path')


const usersCtrl = require('./controllers/usersController')
const serverCtrl = require('./controllers/serverController')
const categoryCtrl = require('./controllers/categoryController')

const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env

const app = express()
app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, //good for a month
    secret: SESSION_SECRET
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(`${__dirname}/../client/build`));
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

app.post('/api/users', usersCtrl.validateAdduser)
app.get('/api/userss', usersCtrl.getUsers)

app.post('/api/servers/:userId', serverCtrl.newServer)
app.get('/api/servers/:userId', serverCtrl.getServers)

app.post('/api/categories/:serverId', categoryCtrl.newCategory)
app.get('/api/categories/:serverId', categoryCtrl.getCategories)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('DB connected and ready for use')
    app.listen(process.env.PORT || SERVER_PORT, () => console.log(`Server is up and running on port ${SERVER_PORT}`))
})