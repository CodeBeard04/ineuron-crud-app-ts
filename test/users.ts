import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server";
import moment from 'moment';

import User from '../models/user.model';

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Users API', () => {

    /**
     * Test GET Route
     */
    describe('GET /users', () => {
        it('It should get all users', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })
    })

    /**
     * Test POST Route
     */
    describe('POST /users/add', () => {
        it('It should create user', (done) => {
            const newUser = {
                name: 'Vivek',
                age: 25,
                createdAt: moment().toDate()
            }
            chai.request(server)
                .post('/users/add')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('string');
                    done();
                })
        })
    })

    /**
     * Test POST Route
     */
    describe('POST /users/update/:id', () => {
        it('It should GET a user by the given id', (done) => {
            let user = new User({ name: "Lorem", age: 32, createdAt: moment().toDate() });
            user.save((err, user) => {
                chai.request(server)
                    .post('/users/update/' + user.id)
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('string');
                        done();
                    });
            })
        })
    })

    /*
     * Test DELETE Route
     */
    describe('DELETE /users/:id', () => {
        it('It should DELETE a user by given the given id', (done) => {
            let user = new User({ name: "Lorem", age: 32, createdAt: moment().toDate() });
            user.save((err, user) => {
                chai.request(server)
                    .delete('/users/' + user.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('string');
                        done();
                    });
            });
        });
    });

})