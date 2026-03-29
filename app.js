// ── Element References ──────────────────────────────────────────
const form        = document.getElementById("qrForm");
const urlInput    = document.getElementById("url");
const nameInput   = document.getElementById("filename");
const qrResult    = document.getElementById("qrResult");
const qrCanvas    = document.getElementById("qrCanvas");
const downloadBtn = document.getElementById("downloadBtn");
const generateBtn = form.querySelector(".btn-generate");
const btnText     = generateBtn.querySelector(".btn-text");
const btnIcon     = generateBtn.querySelector(".btn-icon");

// ── Validation ──────────────────────────────────────────────────
function isValidURL(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

function setError(inputEl, hasError) {
  const group = inputEl.closest(".input-group");
  if (hasError) {
    group.classList.add("error");
  } else {
    group.classList.remove("error");
  }
}

function validateInputs(url, filename) {
  let valid = true;

  if (!url || !isValidURL(url)) {
    setError(urlInput, true);
    valid = false;
  } else {
    setError(urlInput, false);
  }

  if (!filename) {
    setError(nameInput, true);
    valid = false;
  } else {
    setError(nameInput, false);
  }

  return valid;
}

// ── Clear errors on input ───────────────────────────────────────
urlInput.addEventListener("input", () => setError(urlInput, false));
nameInput.addEventListener("input", () => setError(nameInput, false));

// ── Loading State ───────────────────────────────────────────────
function setLoading(isLoading) {
  if (isLoading) {
    btnText.textContent = "Generating…";
    btnIcon.className = "fa-solid fa-spinner fa-spin btn-icon";
    generateBtn.disabled = true;
  } else {
    btnText.textContent = "Generate QR Code";
    btnIcon.className = "fa-solid fa-bolt btn-icon";
    generateBtn.disabled = false;
  }
}

// ── QR Code Generation ──────────────────────────────────────────
async function generateQRCode(url) {
  await QRCode.toCanvas(qrCanvas, url, {
    width: 240,
    margin: 2,
    color: {
      dark: "#0d0d14",
      light: "#ffffff",
    },
  });
}

// ── Show Result ─────────────────────────────────────────────────
function showResult() {
  qrResult.classList.remove("hidden");
  qrResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ── Download Handler ────────────────────────────────────────────
function handleDownload() {
  const filename = nameInput.value.trim() || "qrcode";
  const link = document.createElement("a");
  link.href = qrCanvas.toDataURL("image/png");
  link.download = `${filename}.png`;
  link.click();
}

// ── Form Submit ─────────────────────────────────────────────────
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const url      = urlInput.value.trim();
  const filename = nameInput.value.trim();

  if (!validateInputs(url, filename)) return;

  setLoading(true);

  try {
    await generateQRCode(url);
    showResult();
  } catch (err) {
    console.error("QR generation failed:", err);
    alert("Something went wrong generating the QR code. Please try again.");
  } finally {
    setLoading(false);
  }
});

// ── Download Button ─────────────────────────────────────────────
downloadBtn.addEventListener("click", handleDownload);