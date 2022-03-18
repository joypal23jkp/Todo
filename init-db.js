const mongoose = require("mongoose");

// Connect the database
try {

    connectDB(
        process.env.DATABASE,
        mongoose,
        {
            useNewUrlParser: true,
        });

}catch (error){
    console.log(error.message);
}

async function connectDB (database, mongoose, config) {
    await mongoose.connect(database, config).then(con => {
        console.log('DB connection Successfully!');
    })
    .catch(error => {
        console.log(error);
    });;
}
