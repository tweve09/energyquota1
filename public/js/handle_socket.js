var socket = io()
const tenant_id = document.getElementById("tenant-id").innerText;

socket.on('connection',()=>{
    console.log("User is connected")
})

socket.emit("joinRoom", tenant_id);

socket.on("data", (data)=>{
    document.getElementById("remaining-units").innerText = data.remaining;
    document.getElementById("used-units").innerText = data.used;
})   // handle data from meter