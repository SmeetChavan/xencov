const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes/all_routes');

const app = express();

app.use(express.json());

app.use((req , res , next) => {
    console.log(req.path , req.method);
    next();
})

// app.get('/', (req , res) => {
//     res.send("Hello");
// })

app.use("/api/" , router);

mongoose.connect("mongodb+srv://smeet:12345@xencov.ewlp0wl.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("Connected to db");
})
.catch((error) => {
    console.log({error : error.message});
})

app.listen(4000 , () => {
    console.log("Listening on 4000 ...");
})