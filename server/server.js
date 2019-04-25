require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./serverCtrls/authCtrl')
const disCtrl = require('./serverCtrls/disCtrl')
const aws = require('aws-sdk')
const path = require('path');


const app = express()

const {SERVER_PORT, CONNECTION_STRING, SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

massive(CONNECTION_STRING)
.then(db => {
    app.set('db', db)
    console.log('db connected')
})
.catch(err => console.log('db not connected', err))

app.use( express.static( `${__dirname}/../build` ) );
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
app.get('/order/info', disCtrl.getOrders)
app.delete(`/inventory/info/:id`, disCtrl.deleteItem)
app.delete(`/user/info/:id`, disCtrl.deleteDriver)
app.delete(`/cust/info/:id`, disCtrl.deleteCust)
app.put(`/inventory/info/:itemId/:itemName/:itemCount/:specs`, disCtrl.updateItem)

//drop zone endpoint
app.get('/api/sign-s3', (req, res) => {

    aws.config = {
        region: 'us-west-1',
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
    
    const s3 = new aws.S3()
    const fileName = req.query['file-name']
    const fileType = req.query['file-type']
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    }
    
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
            
            return res.end()
        }
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        }
        
        return res.send(returnData)
    })
})


app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(SERVER_PORT, () => {
    console.log(`Server flying on Port ${SERVER_PORT}`)
})