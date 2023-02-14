import express, {Request, Response} from 'express';
import moment from 'moment';
import app from '../server'

const router = express.Router();

import User from '../models/user.model';

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - name
 *              - age
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the book
 *              name:
 *                  type: string
 *                  description: User name
 *              age:
 *                  type: number
 *                  description: User age
 *              createdAt:
 *                  type: date
 *                  description: User created at timestamp
 *              updatedAt:
 *                  type: date
 *                  description: User Updated at timestamp
 *          example:
 *              id: 63ea8d3c6dbd38d9f7bd5a14
 *              name: test
 *              age: 23
 *              createdAt: 2023-02-13T19:19:24.269Z
 *              updatedAt: 2023-02-13T19:19:24.269Z
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The user managing API's
 */

/* --------- Get Users ----------- */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Returns the list of all users
 *      tags: [Users]
 *      responses: 
 *          200:
 *              description: List of users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */

router.route('/').get((req: any, res: any) => {
    User.find()
        .then(Users => res.status(200).json(Users))
        .catch(err => res.status(400).json('Error ' + err));
})

// app.get( "/", ( req, res ) => {
//         User.find()
//         .then((Users: any) => res.status(200).json(Users))
//         .catch((err: string) => res.status(400).json('Error ' + err));
// });

/* --------- Add Users ----------- */

/**
 * @swagger
 * /users/add:
 *  post:
 *      summary: Create new user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: User Added Successfully
 *              content:
 *                  applictaion/json:
 *                      schema:
 *                      $ref: '#/components/schemas/User'
 *          500:
 *              description: Server Error
 */

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const createdAt = moment().toDate();

    const newUser = new User({ name, age, createdAt });
    newUser.save()
        .then(() => res.status(200).json('User Added'))
        .catch(err => res.status(400).json('Error ' + err))
})

/* --------- Update Users ----------- */

/**
 * @swagger
 * /users/update/{id}:
 *  post:
 *      summary: Update user
 *      tags: [Users]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: User id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: User Updated Successfully
 *              content:
 *                  applictaion/json:
 *                      schema:
 *                      $ref: '#/components/schemas/User'
 *          404:
 *              description: User not found
 *          500:
 *              description: Server Error
 */

router.route('/update/:id').post((req, res) => {
    const updatedAt = moment().toDate();

    User.findById(req.params.id)
        .then(User => {
            User!.name = req.body.name;
            User!.age = req.body.age;
            User!.updatedAt = updatedAt;

            User!.save()
                .then(() => res.status(200).json('User Updated'))
                .catch(err => res.status(400).json('Error ' + err))
        })
        .catch(err => res.status(400).json('Error ' + err))
})

/* --------- Delete Users ----------- */

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *      summary: Remove user by id
 *      tags: [Users]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: user id
 *      responses:
 *          200:
 *              description: User Deleted
 *          404:
 *              description: User not found
 */
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json('User Deleted'))
        .catch(err => res.status(400).json('Error ' + err))
})

export default router;