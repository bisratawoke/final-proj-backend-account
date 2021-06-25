const accountRouter = require('express').Router();
const {register,tokenGiver,login} = require('../controllers/accountController.js');



//register endpoint

accountRouter.post('/register',register,(req,res) => {
	
	return res.status(200).json({
	
		message:"successfully created an account please login to continue"
		
	});

});


//login endpoint

accountRouter.post('/login',login,tokenGiver,(req,res) => {
	
	if(res.token){
	
		return res.status(200).json({
	
			message:res.token
	
		});
	
	}
	
	return res.status(500).json('[UNKOWN ERROR]')


});



module.exports = accountRouter;
