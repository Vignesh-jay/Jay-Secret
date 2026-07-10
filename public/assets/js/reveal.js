const id = window.location.pathname.split("/").pop();

loadSecret();

async function loadSecret() {
  const response = await fetch(`/api/secrets/${id}`);

  const data = await response.json();

  if (!data.success) {
    showError(data.message);

    return;
  }

  showSecret(data.secret);
}

function showSecret(secret) {
  document.getElementById("app").innerHTML = `

    <div class="reveal-container">

        <img
            src="/assets/images/logo.svg"
            class="reveal-logo"
            alt="JΛY Secret"
        >

        <h2>${secret.title || "Shared Secret"}</h2>

        <p class="reveal-text">
            This secret can only be viewed once.
            After revealing it, it will be permanently destroyed.
        </p>

        <button id="revealBtn" class="primary-btn">
            🔓 Reveal Secret
        </button>

    </div>

  `;

  document.getElementById("revealBtn").addEventListener("click", revealSecret);
}

async function revealSecret() {
  const response = await fetch(`/api/secrets/${id}/reveal`, {
    method: "POST",
  });

  const data = await response.json();

  if (!data.success) {
    showError(data.message);
    return;
  }

  document.getElementById("app").innerHTML = `

    <div class="reveal-container">

        <img
            src="/assets/images/logo.svg"
            class="reveal-logo"
            alt="JΛY Secret"
        >

        <h2>${data.secret.title}</h2>

        <p class="reveal-text">
            Your secret has been revealed.
            Copy it now because it cannot be viewed again.
        </p>

        <div class="secret-box">

            <input
                id="secretValue"
                value="${data.secret.secret}"
                readonly
            >

        </div>

        <button
            id="copyBtn"
            class="primary-btn"
        >
            📋 Copy Secret
        </button>

        <small class="destroyed">

            This secret has now been permanently destroyed.

        </small>

    </div>

  `;

  document.getElementById("copyBtn").addEventListener("click", () => {
    navigator.clipboard.writeText(data.secret.secret);

    const btn = document.getElementById("copyBtn");

    btn.innerHTML = "✅ Copied!";

    setTimeout(() => {
      btn.innerHTML = "📋 Copy Secret";
    }, 2000);
  });
}

function showError(message) {
  document.getElementById("app").innerHTML = `

    <div class="reveal-container">

        <img
            src="/assets/images/logo.svg"
            class="reveal-logo"
            alt="JΛY Secret"
        >

        <h2>Secret Unavailable</h2>

        <p class="reveal-text">

            ${message}

        </p>

        <a href="/">

            <button class="primary-btn">

                Create New Secret

            </button>

        </a>

    </div>

  `;
}
