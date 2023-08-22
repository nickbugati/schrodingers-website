const express = require('express');
const http = require('http');
const PORT = 3000;

const app = express();
const server = http.createServer(app);

let schrodingerLogic = false; // Set to true when you want the server to go offline upon visit

app.get('/', (req, res) => {
    if (schrodingerLogic) {
        console.log('Someone tried to observe the server!');
        server.close(() => { // close the server
            console.log('Server is now offline.');
        });
        // No response sent, so user's browser will eventually time out.
    } else {
        // If Schrodinger logic is off, send the homepage normally
        res.send('This is the beautiful homepage nobody will see.');
    }
});

server.on('close', () => {
    setTimeout(() => {
        console.log('Restarting the server...');
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }, 5000); // wait for 5 seconds before restarting
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});