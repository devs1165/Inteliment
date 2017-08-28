var axios = require('axios')

var cors = require('cors')
const express = require('express')
var proxy = require('http-proxy-middleware');

const http = require('http')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const webpack = require('webpack')
const webpackDevMiddleWare = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js')

const app = express()
// const server = http.createServer(app)
// const io = socketIo(server)

app.use(express.static(__dirname+'/src'))
app.use(webpackDevMiddleWare(webpack(webpackConfig)))
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json());

// app.use('/api', proxy({target: 'https://freshmenu.recko.io', changeOrigin: true}));
app.listen(9000);

// timer
var timer = null;
var output = "";

// io connection
// io.on('connectison', socket => {
//   	// live trips
//     socket.on('liveTrips', (type, from, to, search_type, search_value) => {
//   		// start timer
  		  // if(type == "live"){
            // console.log("Live tracking started for - "+socket.id);
//             timer = setInterval(function(){		 
//             // route data api
//             var url = "http://54.200.72.154/api/route_report_default/";

//             // header info
//             var options = {
//                 host: '54.200.72.154',
//                 path: '/api/route_report_default/',
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 }
//             };

//             // request
//             var req = http.request(options, function(res) {
//             	output = "";
//                 var response = "";
//                 // if status code == 200
//                 if(res.statusCode == 200) {

//                 // getting chunks and appending them
//                 res.on('data', function (chunk) {
//                     response += chunk;
//                 });

//                 // on request processing ends
//                 res.on('end', function() {
// 		    		if(response !== output){
// 		    			console.log("new data", response !== output);
// 		    			output = response;
// 		    			socket.emit('newRouteData', "available");
// 		    		}	
//                 });
//               }
//             }).on('error', function(e) {
//                 console.log("Error: " + e.message);
//             });

//             // write the request parameters
//             req.write('from_date='+from+'&to_date='+to+'&search_type='+search_type+'&search_value='+search_value);
//             req.end();

//   			}, 1000*60*15) //time interval of 15 mins
//   		}
//   		// stop timer
//   		else{
//     			if(timer !== null){
//     				console.log("Live tracking stopped for socket- "+socket.id);
// 		            // deleting sockets
// 		            // delete sockets[socket.id];
// 		            clearInterval(timer);
//     		  }
//   		}
//     })

//     // sending new route data to client on request
//     socket.on('fetchNewRouteData', status => {
//     	if(status == "true"){
//     		console.log(output);
//     		socket.emit('liveData', output);
//     	}
//     })

    // disconnect
    // socket.on('disconnect', function(){
      // console.log("socket disconnected - ", socket.id)
      // delete sockets
      // delete sockets[socket.id];
      // clearInterval(timer);
    // });
// })

// server.listen(3000)