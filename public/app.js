const socket = io();

document.getElementById('topup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const amount = document.getElementById('amount').value;
    
    socket.emit('topup', { username, amount });
});

socket.on('topupResponse', function(response) {
    const responseDiv = document.getElementById('response');
    if (response.status === 'success') {
        responseDiv.innerHTML = `Top-up berhasil untuk ${response.details.username} sejumlah ${response.details.amount}.`;
        responseDiv.style.backgroundColor = '#d4edda';
        responseDiv.style.color = '#155724';
    } else {
        responseDiv.innerHTML = `Top-up gagal.`;
        responseDiv.style.backgroundColor = '#f8d7da';
        responseDiv.style.color = '#721c24';
    }
});
