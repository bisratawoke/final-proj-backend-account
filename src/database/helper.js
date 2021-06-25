
const {fork} = require('child_process');
//register helper 

const registerHelper = (password) => {

	return new Promise(async(resolve,reject) => {
	
		try{
		
		
			const gen_hash = fork(`./src/database/gen_hash.js`);
			
			gen_hash.send(password);
			
			gen_hash.on('message',hashedPassword => {
			
				
				const gen_pub_id = fork('./src/database/gen_pub_id.js');
				
				gen_pub_id.on('message',pub_id => {
				
					resolve({
					
						pub_id,
						
						hashedPassword
						
					})
					
				})
				
				
				
			})
			
		}catch(err) {
		
			reject(err);
		}
	
	})

}



//exporting helpers

module.exports = {
	
	
	registerHelper

}
