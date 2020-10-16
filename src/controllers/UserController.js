const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async CreateUser(req,res){
        try{
            const{firstName,lastName,password,email} = req.body;
            const existentUser = await User.findOne({email});

        if(!existentUser){
            const hashedpassword = await bcrypt.hash(password,10)
            const userResponse = await User.create({
                firstName,
                lastName,
                password:hashedpassword,
                email,
            
            });
             
            return jwt.sign({user:userResponse},'secret',(err,token)=>{
               return res.json({
                   user:token,
                   user_id : userResponse._id

               })
            })
        }
        return res.status(400).json({
            message:'emai/user already exist!'
        });
        }catch(error){
            throw Error(`error whle registering${error}`);
        }
    },
    async getUserById(req,res){
       const { user_id } = req.params;
        
        try {
            const user = await User.findById(user_id);
            return res.json(user);     
        
        } catch (error) {
            return res.status(400).json({
                message: `user doesnot exist!${error}`
            });

        }
    }
}