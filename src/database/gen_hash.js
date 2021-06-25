const crypto = require('crypto');

(() => {
	
	process.on('message',password => {
		
		let hasher = crypto.createHash('sha256');
		
		hasher.update(password);
		
		process.send(hasher.digest('hex'));	
	})
	
	
	
})();
