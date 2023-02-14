"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const server_1 = __importDefault(require("../server"));
const moment_1 = __importDefault(require("moment"));
const user_model_1 = __importDefault(require("../models/user.model"));
// Assertion Style
chai_1.default.should();
chai_1.default.use(chai_http_1.default);
describe('Users API', () => {
    /**
     * Test GET Route
     */
    describe('GET /users', () => {
        it('It should get all users', (done) => {
            chai_1.default.request(server_1.default)
                .get('/users')
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });
    /**
     * Test POST Route
     */
    describe('POST /users/add', () => {
        it('It should create user', (done) => {
            const newUser = {
                name: 'Vivek',
                age: 25,
                createdAt: (0, moment_1.default)().toDate()
            };
            chai_1.default.request(server_1.default)
                .post('/users/add')
                .send(newUser)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('string');
                done();
            });
        });
    });
    /**
     * Test POST Route
     */
    describe('POST /users/update/:id', () => {
        it('It should GET a user by the given id', (done) => {
            let user = new user_model_1.default({ name: "Lorem", age: 32, createdAt: (0, moment_1.default)().toDate() });
            user.save((err, user) => {
                chai_1.default.request(server_1.default)
                    .post('/users/update/' + user.id)
                    .send(user)
                    .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('string');
                    done();
                });
            });
        });
    });
    /*
     * Test DELETE Route
     */
    describe('DELETE /users/:id', () => {
        it('It should DELETE a user by given the given id', (done) => {
            let user = new user_model_1.default({ name: "Lorem", age: 32, createdAt: (0, moment_1.default)().toDate() });
            user.save((err, user) => {
                chai_1.default.request(server_1.default)
                    .delete('/users/' + user.id)
                    .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('string');
                    done();
                });
            });
        });
    });
});
