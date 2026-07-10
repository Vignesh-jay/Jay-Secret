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
            >

            <h2>${secret.title || "Shared Secret"}</h2>

            <p class="reveal-text">

                This secret will self-destruct in

            </p>

            <div class="timer-wrapper">

                <svg
                    class="timer-ring"
                    width="220"
                    height="220"
                >
                <defs>

                <linearGradient
                id="ringGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
                >

                <stop
                offset="0%"
                stop-color="#9FD983"/>

                <stop
                offset="100%"
                stop-color="#2F855A"/>

                </linearGradient>

                </defs>

                    <circle
                        class="timer-bg"
                        cx="110"
                        cy="110"
                        r="96"
                    />

                    <circle
                        id="progressRing"
                        class="timer-progress"
                        cx="110"
                        cy="110"
                        r="96"
                    />

                </svg>

                <div
                    id="countdown"
                    class="countdown"
                >

                    --:--

                </div>

            </div>

            <button
                id="revealBtn"
                class="primary-btn"
            >

                🔓 Reveal Secret

            </button>

        </div>

    `;

  startCountdown(secret.expiresAt);

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

function startCountdown(expiresAt) {
  const total = expiresAt - Date.now();

  const ring = document.getElementById("progressRing");

  const timer = document.getElementById("countdown");

  const revealBtn = document.getElementById("revealBtn");

  const radius = 96;

  const circumference = 2 * Math.PI * radius;

  ring.style.strokeDasharray = circumference;

  ring.style.strokeDashoffset = 0;

  const interval = setInterval(() => {
    const remaining = expiresAt - Date.now();
    const progress = remaining / total;

    ring.style.strokeDashoffset = circumference * (1 - progress);

    if (remaining <= 0) {
      clearInterval(interval);

      // Smoothly complete the ring
      ring.style.transition = "stroke-dashoffset 0.8s ease";
      ring.style.strokeDashoffset = circumference;

      // Disable button
      revealBtn.disabled = true;
      revealBtn.innerHTML = "Expired";

      // Show the expired screen after the animation
      setTimeout(() => {
        showExpired();
      }, 800);

      return;
    }

    if (remaining <= 0) {
      clearInterval(interval);

      showExpired();

      return;
    }

    if (remaining <= 5000) {
      revealBtn.disabled = true;

      revealBtn.innerHTML = "⏳ Expiring...";
    }

    const totalSeconds = Math.floor(remaining / 1000);

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;

    if (hours > 0) {
      timer.innerHTML = `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    } else {
      timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    if (remaining <= 30000) {
      timer.className = "countdown danger";
      ring.style.stroke = "#E53935";
    } else if (remaining <= 120000) {
      timer.className = "countdown warning";
      ring.style.stroke = "#E67E22";
    } else {
      timer.className = "countdown";
      ring.style.stroke = "#2F855A";
    }
  }, 1000);
}

function showExpired() {
  const card = document.querySelector(".glass-card");

  card.classList.add("expiring");

  setTimeout(() => {
    card.classList.remove("expiring");

    card.innerHTML = `

            <div class="reveal-container">

                <img
                    src="/assets/images/logo.svg"
                    class="reveal-logo"
                    alt="JΛY Secret"
                >

                <h2>⏳ Secret Expired</h2>

                <p class="reveal-text">

                    This secret expired before it could be revealed.

                </p>

                <button
                    id="homeBtn"
                    class="primary-btn"
                >

                    Create New Secret

                </button>

            </div>

        `;

    document.getElementById("homeBtn").addEventListener("click", () => {
      window.location = "/";
    });
  }, 500);
}
