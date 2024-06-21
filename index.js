const express = require('express')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')

const swaggerDoc = YAML.load('./swagger.yaml')

const app = express()

app.use(express.json())

app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc))




app.get('/health',(_req,res)=>{
    res.status(200).json({health:'Success'})
})


const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})