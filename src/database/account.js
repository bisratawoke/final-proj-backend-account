#! /usr/bin/env node 

const Pool = require('pg').Pool;

const {fork} = require('child_process');

const {registerHelper} = require('./helper.js');
//pool connection config object
const config = {
	
	host:process.env.PHOST,
	
	port:process.env.PPORT,
	
	user:process.env.PUSER,
	
	password:process.env.PPASSWORD,
	
	database:process.env.PDATABASE


}

const pool = new Pool(config);




//generic insert function

const genericInsert= (query,value) => {

	return new Promise(async(resolve,reject) => {
		
		try{
		
			const response = await pool.query(query,value)
			
			resolve(response)
			
		}
		catch(err) {
			
			reject(err)
			
		}
	
	})

} 


//generic select function
//generic select

const genericSelect = (query,value) => {

	return new Promise(async(resolve,reject) => {
	
		try{
		
			const response = await pool.query(query,value)
			
			if(response.rows.length < 1) reject({
				
				type:process.env.USER_ERR,
				
				message:'[NO RECORD FOUND]'
				
			})
			
			resolve(response.rows[0]);
		
		}catch(err) {
		
			reject({
				
				type:process.env.OFF_ERR,
					
				message:err.message
				
			})
			
		}
	
	
	
	})

}

//register to base 

const registerToBase = ({email,password}) => {


	return new Promise(async(resolve,reject) => {
	
		try{
			
			const {pub_id,hashedPassword} = await registerHelper(password);
			
			let query = 'insert into account(email,password,pub_id) values($1,$2,$3)';
			
			let value = [email,hashedPassword,pub_id]
			
			const response = await genericInsert(query,value)
			
			resolve(response)
		
		}
		catch(err) {
		
			reject(err);
		}
	});

}



//login to base
//authenticate then return pub_id on success

const loginToBase = ({email,password}) => {

	return new Promise((resolve,reject) => {
	
		try{
		
			const gen_hash = fork('./src/database/gen_hash.js')
			
			gen_hash.send(password)
			
			gen_hash.on('message',async(hashedPassword) => {
				
				try{
					
					let query = 'select pub_id from account where email=$1 and password=$2';
					
					let value = [email,hashedPassword];
					
					console.log(value)
					
					const response = await genericSelect(query,value);
					
					resolve(response)
					
					
				}
				catch(err) {
					
					reject({
			
						type:err.type,
				
						message:err.message
				
					})
				
				}
				
			})
		
		}catch(err) {
			
			reject({
			
				type:process.err.OFF_ERR,
				
				mssg:err.message
				
			})
		
		}
	
	
	
	
	} )




} 
//exporting functions

module.exports = {

	
	registerToBase,
	
	loginToBase
	
}


