let socket = null;
let currentKey = null;
let lockdown = false;
let allowedSites = [];

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === "connect") {
    currentKey = req.key;
    connectToSocket(currentKey);
  } else if (req.type === "student_message") {
    if (socket && socket.connected) {
      socket.emit("student_message", { message: req.message });
    }
  }
});

function connectToSocket(key) {
  socket = io("http://localhost:5000");

  socket.on("connect", () => {
    socket.emit("connect_student", { security_key: key });
  });

  socket.on("update_lockdown", data => {
    lockdown = data.lockdown;
    allowedSites = data.allowed_sites;
    console.log("Lockdown updated:", lockdown, allowedSites);
  });

  socket.on("message", data => {
    console.log("Message from admin:", data.text);
    // (Optional) Show notification
  });
}
