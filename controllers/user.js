const User = require('../models/user')
const { signUpSchema,signInSchema} = require('../lib/validation/user')
const { z } = require('zod')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
    try {
        const { fullName, username, email, password } = signUpSchema.parse(req.body)
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'email already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = new User({
            fullName,
            username,
            email,
            password: hashPassword,
        });
       const newUser= await user.save()

        const token = jwt.sign(
            {
              id: newUser._id,
              username: newUser.username,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '1h',
            }
          );
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        });
        return res.status(201).json({ message: 'created' })
    }
    catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Internal server error' })

    }
};

const signIn = async(req,res)=>{
    try{
        const {username,password} = signInSchema.parse(req.body);
        const userExists = await User.findOne({ username }).select(+password);
        if (!userExists) {
            return res.status(400).json({ message: 'Username does not exists' });
        };
        const passwordmatch = await bcrypt.compare(password,userExists.password);
        if(!passwordmatch){
            return res.status(400).json({ message: 'Invalid credentials' });
        };
        const token = jwt.sign(
            {
              id: userExists._id,
              username: userExists.username,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '1h',
            }
          );
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        });
        return res.status(201).json({ message: 'User Autenticated' });

    }catch(error){
        if(error instanceof z.ZodError){
            return res.status(400).json({ message: error.errors[0].message });
    }
    return res.status(500).json({ message: 'Internal server error' })
    }
}

const logOut = async(req,res)=>{
    res.clearCookie('token');
    return res.status(200).json({message: "User logged out"});
}
module.exports = { signUp, signIn,logOut};