const Event = require("../models/Event");
const jwt = require('jsonwebtoken');

module.exports = {
   getEventById(req, res) {

    jwt.verify(req.token,'secret',async(err,authData)=>{
      if (err) {
        res.sendStatus(401)
      } else {
        const { event_id } = req.params;
    
        try {
          const events = await Event.findById(event_id);
          if (events) {
            return res.json(authData,events);
          }
        } catch (error) {
          return res.status(400).json({
            message: `event doesnot exist!${error}`,
          });
        }}
    }
    )},
  
   getAllEvents(req, res) {
    jwt.verify(req.token,'secret',async(err,authData)=>{
      if(err){
        res.sendStatus(401)
      }else{
        const { sport } = req.params;
        const query = sport ? {sport}:{};
        try {
          const events = await Event.find(query);
          if (events) {
            return res.json({authData,events});
          }
        } catch (error) {
          return res.status(400).json({
            message: `no events yet!${error}`,
          });
        }
      }
    })
  }, 
  getAllEventsByUserId(req, res) {
    jwt.verify(req.token,'secret',async(err,authData)=>{
    if (err) {
      res.sendStatus(401)
    } else {
          try {
        const events = await Event.find({user:authData.user._id});
        if (events) {
          return res.json({authData,events});
        }
      } catch (error) {
        return res.status(400).json({
          message: `no events yet! with this userID `,
        });
      }
    }
      
    }
    )} 

};