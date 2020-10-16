const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports={
    async store (req,res){
        try {
            const {email,password} = req.body;
            if(!email || !password){
                return res.status(200).json({message:'required field missing'})
            }
            const user = await User.findOne({email});
            if(!user){
                return res.status(200).json({message:'user not found ! do you want to register instead!'})
                
            }
            if(user &&  await bcrypt.compare(password,user.password)){
                const userResponse = {
                    _id:user._id,
                    email:user.email,
                    firstName:user.firstName,
                    lastName:user.lastName
                }
                return jwt.sign({user:userResponse},'secret',(error,token)=>{
                    return res.json({
                        user: token,
                        user_id: userResponse._id

                    })
                })
                
            }else{

                return res.status(200).json({message:'email and password not matched!'})
            }

        } catch (error) {
            throw Error(`error while authenticating user ${error}`)          
        }
    }
};