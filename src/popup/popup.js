const toggleBtn = document.getElementById("toggle");
const statusEl = document.getElementById("status");

chrome.storage.local.get("darkMode", ({ darkMode }) => {
  updateUI(darkMode || false);
});

toggleBtn.addEventListener("click", () => {
  chrome.storage.local.get("darkMode", ({ darkMode }) => {
    const newState = !darkMode;
    chrome.storage.local.set({ darkMode: newState });
    updateUI(newState);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "TOGGLE_DARK", enabled: newState });
    });
  });
});

function updateUI(isOn) {
  toggleBtn.textContent = isOn ? "Desativar Modo Escuro" : "Ativar Modo Escuro";
  statusEl.textContent = "Status: " + (isOn ? "Ativado" : "Desativado");
}
