const express = require('express')
const router = express.Router();
const UserController = require('../controller/user.controller');
const jwtVerify = require('../Middleware/jwt');
/**
 * @swagger
 * /api/user:
 *   post:
 *     tags:
 *       - User Auth
 *     summary: User login/signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: rahul
 *               email:
 *                 type: string
 *                 example: rahul@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               phone:
 *                 type: string
 *                 example: 78678568575
 *             required:
 *               - email
 *               - name
 *               - password
 *               - phone
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad Request
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 */
router.post('/user', UserController.user);

/**
 * @swagger
 * /api/userProfile:
 *   get:
 *     tags:
 *       - User Auth
 *     summary: User Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad Request
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 */
router.get('/userProfile', jwtVerify, UserController.userProfile);

module.exports = router
