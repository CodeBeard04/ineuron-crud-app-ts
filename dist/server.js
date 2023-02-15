"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const Users_1 = __importDefault(require("./routes/Users"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8081;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
const uri = "mongodb+srv://test:test123@cluster0.n5zxrfk.mongodb.net/?retryWrites=true&w=majority";
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose_1.default.connect(uri)
    .then(() => {
    console.log("Connected to db");
}).catch((err) => {
    console.log("Error while connecting to mongodb: ", err);
});
app.use("/users", Users_1.default);
app.listen(port, () => {
    console.log("app is listening on", port);
});
exports.default = app;
