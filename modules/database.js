const mongoose = require("mongoose");

const URI = `mongodb://localhost:27017/${process.env.database_name}`;
mongoose.connect(URI)
    .then(() => {
        console.log("Database connected with URL");
    })

const schema = new mongoose.Schema({
    SrNo :{
        type : Number,
        required : true
    },
    quote:{
        type: String,
        required: true
    }
});

// For Persistance or program state serialization
const counterSchema = new mongoose.Schema({
    counter :{
        type : Number
    }
})

const Quote = mongoose.model('Quote', schema);
const Counter = mongoose.model('Counter', counterSchema);

module.exports = {Quote,Counter};
