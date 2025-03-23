//const pluginToggle = document.getElementById("pluginToggle");
//const snifferToggle = document.getElementById("snifferToggle");
const m3u8LinksElement = document.getElementById("m3u8Links");
const reloadButton = document.getElementById("reloadButton");
const refreshButton = document.getElementById("refreshButton");

// Load settings from storage and update UI
function loadSettings() {
  chrome.storage.local.get(
    //["pluginEnabled", "snifferEnabled", "m3u8Links"],
    ["m3u8Links"],
    (result) => {
      //pluginToggle.checked = result.pluginEnabled ?? true;
      //snifferToggle.checked = result.snifferEnabled ?? false;

        // Update m3u8 links
      m3u8LinksElement.innerHTML = "";
      (result.m3u8Links || []).forEach((link) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = link;

        // Extract the filename from the URL
        const url = new URL(link);
        const filename = url.pathname.split('/').pop(); // This extracts the last part of the path, like 'playlist.m3u8'

        // Set the display text to the filename (e.g., 'playlist.m3u8')
        a.textContent = filename;

        a.target = "_blank";
        li.appendChild(a);
        m3u8LinksElement.appendChild(li);
      });
    }
  );
}

// Save plugin enable state
//pluginToggle.addEventListener("change", () => {
//  chrome.storage.local.set({ pluginEnabled: pluginToggle.checked });
//});


// Save sniffer state
//snifferToggle.addEventListener("change", () => {
//  chrome.storage.local.set({ snifferEnabled: snifferToggle.checked });
//});


// Reload plugin
reloadButton.addEventListener("click", () => {
  // Clear the m3u8Links key from chrome.storage.local
  chrome.storage.local.remove("m3u8Links", () => {
    console.log('m3u8Links key has been removed from local storage.');
  });
  // Reload Plugin
  chrome.runtime.reload();
});

// Refresh Page
refreshButton.addEventListener("click", () => {
  chrome.tabs.reload();
});

// Initialize
loadSettings();


//m3u8LinksElement.innerHTML = "";
//(result.m3u8Links || []).forEach((link) => {
//  const li = document.createElement("li");
//  const a = document.createElement("a");
//  a.href = link;
//  a.textContent = link;
//  a.target = "_blank";
//  li.appendChild(a);
//  m3u8LinksElement.appendChild(li);
//});