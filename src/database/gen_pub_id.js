const {v4:uuidv4} = require('uuid');

(() => {

	const uuid = uuidv4();
	
	process.send(uuid);

})()
