var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express()
var mongoose = require("mongoose")
var port = process.env.PORT || 3000

// static web server
//const path = require('path');
//app.use(express.static(path.join(__dirname,'dist')));

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

// connection to mongodb
const mongoURI = 'mongodb+srv://dbUser:2TYVMZe)pRgc=f6@seacodebankwebapp-ils0g.gcp.mongodb.net/SeaCodeBankWebAppDatabase?retryWrites=true&w=majority'

mongoose
    .connect(mongoURI, {useNewUrlParser: true})
    .then(()=> console.log("MongoDB connected"))
    .catch(err => console.log(err))

mongoose.connection.on('error',(error)=>{
    console.log('ERROR '+ error);
});

mongoose.connection.once('open',()=>{
    console.log('The connection to MongoDB Atlas is working');
});

// REST API
//app.use('/api/users/register', require('./routes/Users.js'));

var Users = require('./routes/Users')

app.use('/users', Users)

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})

