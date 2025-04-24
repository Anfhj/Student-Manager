document.getElementById('saveKey').onclick = () => {
  const key = document.getElementById('keyInput').value;
  chrome.storage.local.set({ securityKey: key }, () => {
    document.getElementById('status').textContent = "Key saved. Connecting...";
    chrome.runtime.sendMessage({ type: "connect", key });
  });
};

document.getElementById('sendMsg').onclick = () => {
  const msg = document.getElementById('msgInput').value;
  chrome.runtime.sendMessage({ type: "student_message", message: msg });
};