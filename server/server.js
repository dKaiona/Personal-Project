require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./serverCtrls/authCtrl')
const disCtrl = require('./serverCtrls/disCtrl')


const app = express()

const {SERVER_PORT, CONNECTION_STRING, SECRET} = process.env

massive(CONNECTION_STRING)
.then(db => {
    app.set('db', db)
    console.log('db connected')
})
.catch(err => console.log('db not connected', err))

app.use(express.json())
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))


//endpoints for home.js
app.post('/auth/login', authCtrl.login)

//endpoint for addUser.js
app.post('/auth/register', authCtrl.register)

//endpoint for addInventory.js
app.post('/inventory/info', disCtrl.newItem)

//endpoint for dispatcher.js
app.get('/inventory/info', disCtrl.getItems)
app.get('/user/info', disCtrl.getDrivers)
app.get('/cust/info', disCtrl.getCust)
app.delete(`/inventory/info/:id`, disCtrl.deleteItem)
app.delete(`/user/info/:id`, disCtrl.deleteDriver)
app.delete(`/cust/info/:id`, disCtrl.deleteCust)
app.put(`/cust/info/:id`, disCtrl.updateCust)
app.listen(SERVER_PORT, () => {
    console.log(`Server flying on Port ${SERVER_PORT}`)
})