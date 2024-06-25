const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('topup', (data) => {
        console.log('Top-up request:', data);
        // Proses top-up dan kirim respons ke client
        socket.emit('topupResponse', { status: 'success', details: data });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
const processPayment = async (username, amount) => {
    // Logika untuk memproses pembayaran
    return true; // Mengembalikan true jika pembayaran berhasil
};

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('topup', async (data) => {
        console.log('Top-up request:', data);
        
        const paymentSuccess = await processPayment(data.username, data.amount);
        
        if (paymentSuccess) {
            socket.emit('topupResponse', { status: 'success', details: data });
        } else {
            socket.emit('topupResponse', { status: 'failure' });
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
