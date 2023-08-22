require('@babel/register');

const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { Server } = require("socket.io");
const { renderHomePage } = require('./renderer');

const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'assets')));

let hasActiveUsers = false;

// Toggle this variable to control the behavior
const schrodingerLogic = true;  // Set to 'false' for development to see the home page, 'true' for production use.

let activeUserCount = 0;  // New variable to keep track of the number of active users.

io.on('connection', (socket) => {
    if (schrodingerLogic) {
        activeUserCount++; // Increment the count of active users.
        hasActiveUsers = activeUserCount > 0; // If there's at least one user, set 'hasActiveUsers' to true.
    }

    socket.on('disconnect', () => {
        if (schrodingerLogic) {
            activeUserCount--; // Decrement the count of active users on disconnect.
            hasActiveUsers = activeUserCount > 0; // Recheck the condition.
        }
    });
});

const globalStyles = `
    html, body {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
`;

app.get('/', (req, res) => {
    if (hasActiveUsers && schrodingerLogic) {
        fs.readFile(path.join(__dirname, 'errorPage.html'), 'utf-8', (err, content) => {
            if (err) {
                res.status(500).send('Something went wrong!');
                return;
            }
            res.send(content);
        });
    } else {
        const content = renderHomePage();
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Dog Eggs</title>
                <style>${globalStyles}</style>  <!-- Inserted the globalStyles here -->
            </head>
            <body>
                <div id="app">${content}</div>
                <script src="/socket.io/socket.io.js"></script>
                <script>
                    const socket = io.connect('http://localhost:${PORT}');
                </script>
            </body>
            </html>
        `;
        res.send(html);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
