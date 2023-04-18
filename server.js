/* This code is importing the necessary modules and data, setting up an Express server, and defining a
CORS policy. */
const express = require('express');

const cors = require("cors")


const mvps = require('./mocks/data.json')

const server = express();

let corsPolicy = {host:"http://127.0.0.1:5501/:8080"}

server.use(cors(corsPolicy));
/* `server.use(express.static('public'))` is setting up a middleware function that serves static files
from the `public` directory. This means that any files in the `public` directory can be accessed by
clients making requests to the server, without the need for a specific endpoint to be defined for
each file. For example, if there is a file called `index.html` in the `public` directory, it can be
accessed by making a GET request to the root URL of the server (e.g. `http://localhost:8080/`). */
server.use(express.static('public'))

/* This code sets up a GET request handler for the `/mvps` endpoint on the Express server. When a
client makes a GET request to this endpoint, the server responds by sending back a JSON
representation of the `mvps` data. */
server.get('/mvps', (req,res) =>{
    res.json(mvps);
});


/* This code sets up a GET request handler for the `/mvps/:year` endpoint on the Express server. When a
client makes a GET request to this endpoint with a specific year parameter, the server responds by
searching the `mvps` data for the MVP record that matches the year parameter and sending back a JSON
representation of that record. The `req.params` object is used to extract the year parameter from
the request URL, and the `mvps.find()` method is used to search the `mvps` data for the record with
the matching year. The resulting record is stored in the `targetYear` variable and sent back to the
client as a JSON response using the `res.json()` method. */
server.get('/mvps/:year', (req,res) => {
    const {year} = req.params;
    const targetYear = mvps.find(mvp => mvp.year === year);
    res.json((targetYear));
            
});

/* This code sets up a GET request handler for the `/mvps/name/:player` endpoint on the Express server.
When a client makes a GET request to this endpoint with a specific player parameter, the server
responds by searching the `mvps` data for the MVP records that match the player parameter and
sending back a JSON representation of those records. The `req.params` object is used to extract the
player parameter from the request URL, and a loop is used to iterate through the `mvps` data and
check if the `player` property of each record includes the search term. If a match is found, the
record is added to the `targetList` array. Finally, the `targetList` array is sent back to the
client as a JSON response using the `res.json()` method. */
server.get('/mvps/name/:player', (req,res) => {

    const {player} = req.params;
    let targetList = [];

    for(let i = 0; i < mvps.length; i++){
      
          let searchWord = player.toLowerCase();
          let item =  mvps[i].player.toLowerCase();
         if( item.includes(searchWord) ){
           targetList.push(mvps[i]) 
         } 

    }
    console.log("targetList", targetList);

   
    res.json((targetList));   
    
    
});

/* This code sets up a default GET request handler for any endpoint that is not explicitly defined in
the server. When a client makes a GET request to an undefined endpoint, the server responds by
sending back a JSON object with a message indicating that the requested page does not exist and
suggesting that the client read the documentation or ask for better documentation. The `*` wildcard
character is used to match any undefined endpoint. The `server.listen()` method is used to start the
server and listen for incoming requests on port 8080. */
// server.get("*", (req, res) => 
//   res.json({
//     message: "this page does not exist. Read the documentation. Or ask the people to write better documentation."
//   }
// ));


   server.listen(8080,() => {
       console.log('the server is running at PORT 8080');
   });