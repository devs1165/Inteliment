export default function reducer(state={
	user : {},
	logout:null,
	login:null,
	error:null,
}, action){
	switch(action.type){
		case "USER_LOGIN": {
			var flag, error;
			if(action.payload.length != 0){
				flag = true;
				error=null;
			}
			else{
				flag = false;
				error = "Invalid username/password";
			}
			return {...state, user:action.payload, login:flag, error:error, logout:null}
		}
		case "USER_LOGOUT": {
			return {...state, login:null, logout:action.payload, user:{}}
		}
		case "RESET_LOGIN" : {
			return {...state, error:null, login:null, logout:null, user:{}}
		}
	}
	return state;
}