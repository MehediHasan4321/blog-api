require("dotenv").config();
const http = require('http')
const app =  require('./app');
const { connectDB } = require("./db");


const server = http.createServer(app)

const main = async ()=>{

    try {
      await connectDB()
    const port = process.env.PORT || 4000
    server.listen(port,()=>{
      console.log(`Server is listening on port ${port}`);
    })
    } catch (e) {
      console.log('Database error:');
      console.log(e);
    }
  
    
  }
  
  main()







