chrome.storage.local.get("securityKey", (res) => {
  const key = res.securityKey;
  if (!key) return;

  const checkSite = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url) return;

    chrome.runtime.sendMessage({ type: "get_lockdown_status" }, (res) => {
      if (res.lockdown) {
        const allowed = res.allowedSites || [];
        const allowedNow = allowed.some(site => tab.url.includes(site));
        if (!allowedNow) {
          chrome.tabs.update(tab.id, { url: "about:blank" });
        }
      }
    });
  };

  setInterval(checkSite, 3000); // check every 3s
});