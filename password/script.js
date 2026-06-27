const passwordInput = document.getElementById("password");
const strengthFill = document.getElementById("strength-fill");
const strengthText = document.getElementById("strength-text");
const copyMsg = document.getElementById("copy-msg");

passwordInput.addEventListener("input", checkStrength);

function checkStrength() {
  const password = passwordInput.value;
  let score = 0;

  const rules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password)
  };

  for (let key in rules) {
    const el = document.getElementById(key);
    if (rules[key]) {
      el.classList.add("valid");
      score++;
    } else {
      el.classList.remove("valid");
    }
  }

  const percent = (score / 5) * 100;
  strengthFill.style.width = percent + "%";

  if (percent < 40) {
    strengthFill.style.background = "#ff4d4d";
    strengthText.innerText = "Strength: Weak";
  } else if (percent < 80) {
    strengthFill.style.background = "#ffaa00";
    strengthText.innerText = "Strength: Medium";
  } else {
    strengthFill.style.background = "#00ff9c";
    strengthText.innerText = "Strength: Strong";
  }
}

function generatePassword() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let pass = "";
  for (let i = 0; i < 14; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }
  passwordInput.value = pass;
  checkStrength();
}

function copyPassword() {
  navigator.clipboard.writeText(passwordInput.value);
  copyMsg.innerText = "Copied!";
  copyMsg.style.opacity = "1";

  setTimeout(() => {
    copyMsg.style.opacity = "0";
  }, 1500);
}

function togglePassword() {
  passwordInput.type =
    passwordInput.type === "password" ? "text" : "password";
}