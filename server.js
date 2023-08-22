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

// Toggle this variable to control the behavior
const schrodingerLogic = true;

let isLockdown = false;
let lockdownTimer;

const globalStyles = `
    html, body {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
`;

app.get('/', (req, res) => {
    if (schrodingerLogic) {
        // Initiate lockdown immediately on request
        isLockdown = true;
        console.log("Lockdown initiated.");

        // Serve the error page to everyone including the user who triggered the lockdown
        fs.readFile(path.join(__dirname, 'errorPage.html'), 'utf-8', (err, content) => {
            if (err) {
                res.status(500).send('Something went wrong!');
                return;
            }
            res.send(content);
        });

        // Reset after a certain duration
        const lockdownDuration = 60000;  // E.g., 1 minute; adjust as needed
        clearTimeout(lockdownTimer);  // Clear any previous timer to avoid overlaps
        lockdownTimer = setTimeout(() => {
            isLockdown = false;
            console.log("Lockdown expired.");
        }, lockdownDuration);

    } else {
        // If schrodingerLogic is false, always serve the home page
        const content = renderHomePage();
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Dog Eggs</title>
                <style>${globalStyles}</style>
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