import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

//  @desc    Auth user & get token
//  @route   POST /api/users/login
//  @access  Public
const authUser = asyncHandler( async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))){

        const token = jwt.sign({userId: user._id} , process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1d
        })

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }
    else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

//  @desc   Register user
//  @route  POST /api/user/register
//  @access Public
const registerUser = asyncHandler( async(req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user){

        const token = jwt.sign({userId: user._id} , process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1d
        })

        res.status(200).json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
         })
    } else {
        res.status(400);
        throw new Error('Invalid User Data');
    }


})

//  @desc   Get user profile
//  @route  GET /api/user/profile
//  @access Private
const getUserProfile = asyncHandler( async(req, res) => {
     const user = await User.findById(req.user._id);

        if(user){
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
});

//  @desc   logout user / clear cookie
//  @route  POST /api/user/logout
//  @access Public
const logoutUser = asyncHandler( async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({message: 'logged out successfully'})
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile
};