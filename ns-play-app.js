/**
 * 180 Faces - Hardware Interface
 * Created by jefferson.wu on 4/11/16.
 * Namespaced + Jade
 *
 * TODO: create a new random object with local RGBholder values on 'connect', Destroy on 'disconnect'
 * TODO: environmental variables.  Use them.
 */

// SOCKET.IO BOILERPLATE
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
// SOCKET.IO BOILERPLATE - END

var jade = require('jade');
var colors = require('colors');

// MIDDLEWARE
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

//enable CORS
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// GLOBALS
var allClients = [];
var port = process.argv[2];

// APP info
var appInfo = {
    app: 'ThreeJS Experiments',
    version: '0.0.3',
    author: {
        name: 'Jefferson Wu',
        email: 'jefferson.wu@180la.com'
    }
};


// ROUTES
app.get('/', function(request, response){
    response.render('index', appInfo);
});


/*SOCKET.IO NAMESPACE*/
var namespaceString = 'love33';
var nsp = io.of('/' + namespaceString);

nsp.on('connection', function(socket){
    console.log(socket.client.id.toString().blue + ' has connected to namespace: ' + namespaceString);
});

/*SOCKET.IO*/
io.on('connection', function(socket){
    allClients.push(socket);
    console.log(socket.client.id.toString().blue + ' connected');

    numberOfClients(allClients);

    //greeting message, fired at the beginning
    socket.emit('message', 'welcome message!');

    // ==== SOCKET EVENTS ====

    //on receiving of data
    socket.on('data', function(data){
    });

    //on disconnect
    socket.on('disconnect', function(){
    });

    // ==== SOCKET EVENTS - END ====
});

initServer(port);

// ==== HELPER FUNCTIONS ====
//TODO: move these to /helpers

function initServer(port){
    var serverPort = port || 3000;  //if no port, default to 3000
    server.listen(serverPort);

    if (port === undefined) {
        console.log('Starting server on default port ' + '3000');
    } else {
        console.log('Starting server on port ' + serverPort.rainbow);
    }
}

/**
 * Return and log to console the number of connected clients.
 * @param allClientsArr The 'allClients' array
 */
function numberOfClients(allClientsArr){
    console.log('Total clients: ' + allClientsArr.length);
    return allClientsArr.length;
}

