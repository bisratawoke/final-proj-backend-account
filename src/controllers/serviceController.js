const jwt = require('jsonwebtoken');




const tokenChecker = async(req,res,next) => {

	let token = req.headers['authorization'].split(' ')[1]
	
	if( token ){
		
		try{
		
			const userInfo = await jwt.verify(token,process.env.SECRET_KEY);
			
			console.log(`user ${JSON.stringify(userInfo)}`);
			
			res.userInfo = userInfo;
			
			return next();
		
		}catch(err) {
		
			if(err){
			
				console.log(err);
				
				return res.status(401).json({message:err.message});
			}
		
		}
		
		return 
	}
	
	return res.status(400).json({mesasge:'[BAD REQUEST MAN]'})

}


//exporting functions 

module.exports = {

	tokenChecker
}
