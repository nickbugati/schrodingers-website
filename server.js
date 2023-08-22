require('@babel/register');

const express = require('express');
const http = require('http');
const path = require('path');
const { renderHomePage } = require('./renderer');

const PORT = 3000;
const app = express();
app.use(express.static(path.join(__dirname, 'assets')));

const server = http.createServer(app);
let schrodingerLogic = true;

const globalStyles = `
    html, body {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
`;

// To store all active connections
const connections = {};

server.on('connection', (conn) => {
    const key = `${conn.remoteAddress}:${conn.remotePort}`;
    connections[key] = conn;
    conn.on('close', () => {
        delete connections[key];
    });
});

app.get('/', (req, res) => {
    if (schrodingerLogic) {
        console.log('Someone tried to observe the server!');

        // Destroy all active connections
        for (const key in connections) {
            connections[key].destroy();
        }

        // Close the server and set it to restart after 1 minute
        server.close(() => {
            console.log('Server is now offline.');
            setTimeout(() => {
                server.listen(PORT, () => {
                    console.log(`Server is running on http://localhost:${PORT}`);
                });
            }, 60000);  // 1 minute
        });

    } else {
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
            </body>
            </html>
        `;

        res.send(html);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});