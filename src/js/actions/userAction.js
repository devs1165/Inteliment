import Conf from './../res/Conf';


// logging in
export function UserLogin(email,password){

	return function(dispatch){
		var mail='devs1165@gmail.com';
		var pass = '123456789';
		if(email==mail && pass==password){
			dispatch({
				type:"USER_LOGIN",
				payload:true
			})
		}
		else {
			dispatch({
				type:"USER_LOGIN",
				payload:"",
			})
		}
	}
}

