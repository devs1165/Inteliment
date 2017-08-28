var local = null, global = null;
if(process.env.NODE_ENV == "development"){
	local = "http://localhost:4200/";
	// global = "http://192.168.1.5:8000/";
	// global = "http://localhost:4200";
}
else if(process.env.NODE_ENV == "production"){
	// local = "production_local";
	// global = "production_global";
}
else if(process.env.NODE_ENV == "staging"){
	// local = "http://staging.cubito.in:3005/";
	// global = "http://staging.cubito.in:70/";
}

module.exports = {
	local : local,
	global : global
}