const User = require('../models/User');
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

module.exports = {
    createEvent(req, res) {
        jwt.verify(req.token,'secret',async (err,authData)=>{
            if (err) {
                res.sendStatus(401)
            } else {
            
                const { title, description, price,sport,date } = req.body;
                const { filename } = req.file;
        
                const user = await User.findById(authData.user._id);
        
                if (!user) {
                return res.status(400).json({ message: "user not found!" });
                }
                const event = await Event.create({
                title,
                description,
                price: parseFloat(price),
                user: authData.user._id,
                thumbnail: filename,
                sport,
                date
                });
                return res.json(event);
                
            }
        })
    },

    delete(req,res){
        jwt.verify(req.token,'secret',async(err,authData)=>{
            if (err) {
                
            } else {
                const {event_id} = req.params;  
                try {
                    await Event.findByIdAndDelete(event_id)
                    return res.status(204).send();
                } catch (error) {
                    return res.status(404).json({
                    message: `no events with this id exist yet!${error}`,
                    }); 
                }
                
            }
        })
    },

};