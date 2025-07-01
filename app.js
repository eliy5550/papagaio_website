
// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express')
const app = express()


// app.use(express.static(__dirname, { dotfiles: 'allow' } ));

app.use(express.static("./public"))

// app.use(express.static("./well-known"))

// // Certificate
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');

// const credentials = {
// 	key: privateKey,
// 	cert: certificate,
// 	ca: ca
// };


// Starting both http & https servers
//const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);



app.listen(11000, () => {
	console.log('HTTP Server running on port 11000');
});



// httpsServer.listen(443, () => {
// 	console.log('HTTPS Server running on port 443');
// });