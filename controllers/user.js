const User = require('../models/user');
const {signUpScheme} = require('../lib/validation/user');


const signUp = async(req,res) =>{
        try {
            const {Fullname,Username,email,password} = signUpScheme.parse(req.body); 
            
            return res.status(201).json({message: 'User created'});
        } catch (error) {
            console.log(error);     
            if(error instanceof z.ZodError){
                return res.status(400).json({message: error.errors[0].message});
            }
            return res.status(500).json({message :'Internal server error'});
        }
        
};

module.exports ={
    signUp,
}