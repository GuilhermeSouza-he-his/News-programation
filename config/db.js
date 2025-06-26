const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://root:gui2302200@cluster0.qmoslpv.mongodb.net/dankicode?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log('DB connected'))
}

module.exports = connectDB;
