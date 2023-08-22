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

app.get('/', (req, res) => {
    if (schrodingerLogic) {
        console.log('Someone tried to observe the server!');
        server.close(() => {
            console.log('Server is now offline.');
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
            </body>
            </html>
        `;

        res.send(html);
    }
});

server.on('close', () => {
    setTimeout(() => {
        console.log('Restarting the server...');
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }, 5000);
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});