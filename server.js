const express = require('express');
const app = express();
const PORT = 3000;

let serverInstance = null;

app.get('/', (req, res) => {
    console.log('Someone tried to observe the server!');
    res.send('You observed the server, and now it\'s offline.');

    // Close the server after sending the response
    serverInstance.close(() => {
        console.log('Server is now offline.');
    });
});

serverInstance = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Logic to restart the server after a certain time or event
// This is a simple example using setTimeout; you can enhance this further
serverInstance.on('close', () => {
    setTimeout(() => {
        console.log('Restarting the server...');
        serverInstance = app.listen(PORT);
    }, 5000); // wait for 5 seconds before restarting
});
