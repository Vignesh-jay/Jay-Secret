const form = document.getElementById("secretForm");

form.addEventListener("submit", createSecret);

async function createSecret(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;

  const secret = document.getElementById("secret").value;

  const expiry = document.getElementById("expiry").value;

  const response = await fetch("/api/secrets", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      title,
      secret,
      expiry,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    alert("Unable to create secret.");
    return;
  }

  showSuccess(data.id);
}

function showSuccess(id) {
  const link = `${window.location.origin}/s/${id}`;

  document.querySelector(".glass-card").innerHTML = `

        <div class="success">

            <h2>✅ Secret Created</h2>

            <p>
                Share this link.
                It can only be viewed once.
            </p>

            <input
                id="shareLink"
                value="${link}"
                readonly
            >

            <button id="copyBtn">
                Copy Link
            </button>

            <button id="newBtn" class="secondary">
                Create Another Secret
            </button>

        </div>

    `;

  document.getElementById("copyBtn").addEventListener("click", () => {
    navigator.clipboard.writeText(link);

    document.getElementById("copyBtn").innerText = "Copied ✓";
  });

  document.getElementById("newBtn").addEventListener("click", () => {
    location.reload();
  });
}
