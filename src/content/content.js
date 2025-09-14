let darkStyle;

function enableDark() {
  if (!darkStyle) {
    darkStyle = document.createElement("style");
    darkStyle.textContent = `
      html, body {
        background-color: #121212 !important;
        color: #f5f5f5 !important;
      }
      a { color: #80cbc4 !important; }
    `;
    document.head.appendChild(darkStyle);
  }
}

function disableDark() {
  if (darkStyle) {
    darkStyle.remove();
    darkStyle = null;
  }
}

chrome.storage.local.get("darkMode", ({ darkMode }) => {
  if (darkMode) enableDark();
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "TOGGLE_DARK") {
    msg.enabled ? enableDark() : disableDark();
  }
});
