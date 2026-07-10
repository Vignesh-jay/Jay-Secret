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

<input
id="secretValue"
type="password"
value="${secret.secret}"
readonly
>

<button id="revealBtn">

Reveal Secret

</button>

`;

  document.getElementById("revealBtn").addEventListener("click", () => {
    const input = document.getElementById("secretValue");

    input.type = "text";
  });
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
