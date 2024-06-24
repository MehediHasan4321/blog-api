const mongoose = require('mongoose')



/**
 * This function will generate database connection string from .env file
 * @returns srting
 */

const generateConnectionString = () => {
    let connectionURL = process.env.DB_CONNECTION_URL;
    connectionURL = connectionURL.replace("<username>", process.env.DB_USERNAME);
    connectionURL = connectionURL.replace("<password>", process.env.DB_PASSWORD);
    const name = process.env.DB_NAME;
    const query = process.env.DB_URL_QUERY;
  
    return `${connectionURL}/${name}?${query}`;
  };


  /**
 * connect to the mongodb database using mongoose
 */

const connectDB = async ()=>{

    const url = generateConnectionString()
    const options= {autoIndex:false}

    await mongoose.connect(url,options)
    console.log('Database Connected');
}

module.exports = connectDB