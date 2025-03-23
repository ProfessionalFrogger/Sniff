//let pluginEnabled = true;
//let snifferEnabled = false;

// Load initial settings
chrome.storage.local.get(
  //["pluginEnabled", "blockerEnabled", "snifferEnabled"],
  ["snifferEnabled"],

  (result) => {
    //pluginEnabled = result.pluginEnabled ?? true;
    //snifferEnabled = result.snifferEnabled ?? false;
  }
);

// Sniff for m3u8 links
chrome.webRequest.onCompleted.addListener(
  (details) => {
    //if (!pluginEnabled || !snifferEnabled) return;
    //if (!snifferEnabled) return;


    const url = details.url;
    if (url.endsWith(".m3u8") || url.endsWith(".m3u")) {
      chrome.storage.local.get(["m3u8Links"], (result) => {
        const m3u8Links = result.m3u8Links || [];
        if (!m3u8Links.includes(url)) {
          m3u8Links.push(url);
          chrome.storage.local.set({ m3u8Links });
        }
      });
    }
  },
  { urls: ["<all_urls>"] }
);
