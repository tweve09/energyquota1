var socket = io()
const meter_number = document.getElementById("meter-number").innerText;

socket.on('connection',()=>{
    console.log("User is connected")
})

socket.emit("joinRoomOwner", meter_number);

socket.on("all_data", (data)=>{
    document.getElementById("all-remaining").innerText = data.remaining;
    document.getElementById("all-used").innerText = data.used;
})   // handle data from meter