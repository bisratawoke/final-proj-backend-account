const jwt = require('jsonwebtoken');
const {registerToBase,loginToBase} = require('../database/account.js');
const {fork} = require('child_process');

//register middleware

const register = async(req,res,next) => {
	
	if(req.body.email && req.body.password){
		
		try{
			
			const result = await registerToBase(req.body);
			
			console.log(result);
			
			return next();
			
			
		
		}catch(err) {
			
			console.log(err);
			
			return res.status(500).json({
			
				message:'[SERVER ERROR] unkown.'
			})
		
		}
	
	return;
	} 
	
	return res.status(400).json({
	
		message:'[BAD REQUEST] missing arguments.'
		
	});
}

//login middleware

const login = async(req,res,next) => {
	
	if(req.body) {
		
		try{
		
			const result = await loginToBase(req.body);
		
			console.log(result);
			
			res.userInfo = result;
		
			return next();
		
		}
		catch(err) {
		
			if(err.type == process.env.OFF_ERR) {
			
				return res.status(500).json({
				
					message:err.message
				})
			}
			
			return res.status(404).json({message:err.message})
		}
	
	}
	
	return res.status(400).json({
	
		message:'[BAD REQUEST] missing arguments baby'
		
	})

}
//token giver middleware
const tokenGiver = async(req,res,next) => {
	
	try{
	
		if(res.userInfo) {
			
			try{
				
				const token = await jwt.sign(res.userInfo,process.env.SECRET_KEY);
				
				console.log(token);
				
				res.token = token;
				
				return next();
			
			}
			catch(err) {
			
				return res.status(500).json({
				
					message:err.message
				});
				
			}
	
		} 
	
		return res.status(400).json({
		
			message:'bad request'
		
		})
	
	}catch(err) {
	
		console.error(err);
		
		return res.status(500).json({
		
			message:'server error'
		})
	
	}
}


module.exports = {

	tokenGiver,
	
	register,
	
	login
}
