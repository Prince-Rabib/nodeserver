const mongoose = require('mongoose');


const db = "mongodb+srv://dbuser:mombu1234@cluster0.y5hri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectdb = async () => {
  try {
    await mongoose.connect(db,{
      useNewUrlParser: true,
      useCreateIndex:true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('Mongo connected...');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectdb;
