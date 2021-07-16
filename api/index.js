const express           = require('express'); 
const apiRouter         = express.Router();
const usersRouter       = require('./users')

apiRouter.get("/health", (req,res,next) => {
    res.send({message:"All is good on /api/health!"});
    next();
})


apiRouter.use('/users', usersRouter);

apiRouter.use((error, req, res, next)=>{
    res.send( error);
})


module.exports = apiRouter