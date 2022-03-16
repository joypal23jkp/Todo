const mongoose = require("mongoose");
const database = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// Connect the database
try {

    connectDB(
        database,
        mongoose,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

}catch (error){
    console.log(error.message);
}

async function connectDB (database, mongoose, config) {
   await mongoose.connect(database, config);
}
