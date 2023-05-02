const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

const { loadPlanetsData }= require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://wanggar16:oQugUTXklQTae0z4@nasa.6vik3z5.mongodb.net/?retryWrites=true&w=majority'

const server = http.createServer(app);

mongoose.connection.once('open',()=> {
    console.log("MongoDB connection ready");
});

mongoose.connection.on('error',(err)=> {
    console.error(err);
});

async function startServer(){
    await mongoose.connect(MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
    await loadPlanetsData();
    server.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}...`)
    });
}

startServer();

