const http = require('http'); 
const fs = require('fs'); 
const path = require('path'); 

// Serve HTML files 
const serveFile = (res, filePath, contentType, statusCode = 200) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'}); 
            res.end('500 - Internal Server Error'); 
        } else {
            res.writeHead(statusCode, {'Content-Type': contentType}); 
            res.end(data); 
        }
    }); 
}; 

// Create server 
const server = http.createServer((req, res) => {
    let filePath = ''; 
    switch (req.url) {
        case '/':
            filePath = path.join(__dirname, 'index.html'); 
            serveFile(res, filePath, 'text/html'); 
            break; 
        case '/contact-me':
            filePath = path.join(__dirname, 'contact-me.html'); 
            serveFile(res, filePath, 'text/html'); 
            break; 
        case '/about':
            filePath = path.join(__dirname, 'about.html'); 
            serveFile(res, filePath, 'text/html'); 
            break; 
        default:
            filePath = path.join(__dirname, '404.html'); 
            serveFile(res, filePath, 'text/html', 404); 
            break; 
    }
}); 

// Listen on port 8080 
server.listen(8080, () => {
    console.log('Server is running at http://localhost:8080'); 
}); 
