import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/*
 * Authorization Middleware:
 * Checks if the bearer token provided in the request header is valid
 * If the token is valid, adds the corresponding user to the request
 */
const protect = asyncHandler(async (req, res, next) => {
	let token = null;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, "2e6a98abb5b23339ad14601d3bedc1d23847498cb18daf8cfc98c2a2095ec8f47d80053f6d4e22b8f6419407ac3083dc");
			req.user = await User.findById(decoded.id).select('_id');
			next();
		} catch (error) {
			console.log(`Error: ${error.message}`);
			res.status(401);
			throw new Error('Invalid authentication');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Invalid authentication');
	}
});

export default protect;
