import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import router from './routes/Users';

const app = express()
const port = process.env.PORT || 5050

app.use(cors())
app.use(express.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'iNeuron CRUD Node.js App',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:5050/'
            }
        ]
    },
    apis: ['./routes/*.ts']
}

const swaggerSpec = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const uri = "mongodb+srv://test:test123@cluster0.n5zxrfk.mongodb.net/?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(uri)
.then(() => {
    console.log("Connected to db");
}).catch((err: any) => {
    console.log("Error while connecting to mongodb: ", err);
})

// Health Check
app.get('/', (req, res) => res.status(200).json('Status - OK'))

app.use( "/users", router);

app.listen(port, () => {
    console.log("app is listening on", port);
})

export default app;