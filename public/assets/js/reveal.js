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

        <h2>${secret.title || "Shared Secret"}</h2>

        <p>
            This secret can only be viewed once.
        </p>

        <button id="revealBtn">
            Reveal Secret
        </button>

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

        <h2>${data.secret.title}</h2>

        <input
            value="${data.secret.secret}"
            readonly
        >

        <button onclick="navigator.clipboard.writeText('${data.secret.secret}')">
            Copy Secret
        </button>

        <p style="margin-top:20px;color:#2F855A;">
            This secret has now been destroyed.
        </p>

    `;
}

function showError(message) {
  document.getElementById("app").innerHTML = `

<h2>

Secret Unavailable

</h2>

<p>

${message}

</p>

<a href="/">

<button>

Create Secret

</button>

</a>

`;
}
