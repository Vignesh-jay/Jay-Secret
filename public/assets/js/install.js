let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();

  deferredPrompt = e;

  showInstallBanner();
});

function showInstallBanner() {
  const existing = document.getElementById("installBanner");

  if (existing) return;

  document.body.insertAdjacentHTML(
    "beforeend",
    `
<div id="installBanner" class="install-banner">

    <div class="install-content">

        <h3>📲 Install JΛY Secret</h3>

        <p>

            Install the app for faster and secure
            one-time secret sharing.

        </p>

        <div class="install-buttons">

            <button id="installBtn">

                Install

            </button>

            <button id="dismissInstall" class="secondary">

                Later

            </button>

        </div>

    </div>

</div>
`,
  );

  document.getElementById("installBtn").addEventListener("click", installApp);

  document.getElementById("dismissInstall").addEventListener("click", () => {
    document.getElementById("installBanner").remove();
  });
}

async function installApp() {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  await deferredPrompt.userChoice;

  deferredPrompt = null;

  document.getElementById("installBanner")?.remove();
}
