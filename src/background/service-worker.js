chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ darkMode: false });
  console.log("Dark Switch instalado.");
});
