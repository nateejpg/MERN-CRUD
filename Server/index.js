const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const ShowModel = require('./MongoShow')
const UserModel = require('./MongoUser')
require('dotenv').config();

const app = express()

app.use(cors())
app.use(express.json())

app.post('/add', (req, res) => {

    const title = req.body.title
    const description = req.body.description;
    const rating = req.body.rating;
    const status = req.body.status;
    const userId = req.body.userId


    ShowModel.create({
        title: title,
        description: description,
        rating: rating,
        status: status,
        user: userId
    })
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.post('/register', async (req, res) => {

    const {username, password, email} = req.body;

    const user = await UserModel.create(({username, password, email}));

    res.json(user);

})


app.post('/login', async (req, res) => {

    const {email, password} = req.body;

    const user = await UserModel.findOne({email, password});

    if(user){

        res.json({success: true, userId: user._id, username: user.username});

    }else{

        res.json({sucess: false})

    }

})

app.get('/get', (req, res) => {

  // res.json(TempArray)

    ShowModel.find()
    .then(result => res.json(result))
    .catch(err => console.log(err))

})

app.get('/get/:userId', (req, res) => {
    ShowModel.find({user: req.params.userId})
    .then(result => res.json(result))
    .catch(err => res.status(500).json({error: err.message }))
})

app.delete('/delete/:id', (req, res) => {


    const {id} = req.params;

    ShowModel.findOneAndDelete({
        _id: id,
    })
    .then(result => console.log(result))
    .catch(err => console.log(err))

})

app.put('/update/:id', (req, res) => {

    const {id} = req.params;
    const title = req.body.title;
    const description = req.body.description;
    const rating = req.body.rating;
    const status = req.body.status;

    ShowModel.findOneAndUpdate(
        {_id: id},
        {title: title, description: description, rating: rating, status: status},
        {new: true}
    )
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

mongoose.connect(process.env.MONGO)


app.listen( 3001, (req, res) => {

    console.log('Server is Up!')

})