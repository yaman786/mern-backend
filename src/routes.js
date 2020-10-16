const express = require('express');
const multer = require('multer');

const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const DashboardController = require("./controllers/DashboardController");
const uploadConfig = require("./config/upload");
const verifyToken = require('./config/verifyToken');
const RegistrationController = require('./controllers/RegistrationController');
const RejectionController = require('./controllers/RejectionController');
const ApprovalController = require('./controllers/ApprovalController');

const upload = multer(uploadConfig);
const routes = express.Router();

routes.get('/status', (req, res) => {
    res.send({
        status:200
    });
});

routes.post('/login',LoginController.store);

//Dashboard
routes.get("/dashboard/:sport",verifyToken, DashboardController.getAllEvents);
routes.get("/user/events",verifyToken, DashboardController.getAllEventsByUserId);
routes.get("/dashboard",verifyToken, DashboardController.getAllEvents);
routes.get("/event/:event_id",verifyToken, DashboardController.getEventById);
//Registraton
routes.post("/registration/:event_id",verifyToken,RegistrationController.create);
routes.get("/registration/:registration_id",RegistrationController.getRegistration);
routes.post("/registration/:registration_id/approvals",verifyToken, ApprovalController.approval);
routes.post("/registration/:registration_id/rejections",verifyToken, RejectionController.rejection);


//Event
routes.post('/event',verifyToken,upload.single("thumbnail"),EventController.createEvent);
routes.delete("/event/:event_id",verifyToken, EventController.delete);


//Users
routes.post('/user/register', UserController.CreateUser);
routes.get('/user/:user_id', UserController.getUserById);

module.exports = routes;
