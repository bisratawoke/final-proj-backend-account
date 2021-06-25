const serviceRouter = require('express').Router();
const {tokenChecker} = require('../controllers/serviceController.js');

//routes


serviceRouter.get('/check',tokenChecker,(req,res) => {

	if(res.userInfo){
	
		return res.status(200).json(res.userInfo);
	}
	
	return res.status(500).json({message:'[ACCOUNT SERVER ERR] unknown'})
	
	
})

module.exports = serviceRouter;
