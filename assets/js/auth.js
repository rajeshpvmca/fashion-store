// REGISTER
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name        = document.getElementById("name").value;
    const selectedRoleInput = document.querySelector('input[name="role"]:checked');
    const role        = selectedRoleInput ? selectedRoleInput.value : 'Admin';
    const email       = document.getElementById("email").value;
    const password    = document.getElementById("password").value;
    const confirmPass = document.getElementById("confirmPassword").value;

    // Password rules
    if (password.length < 8) {
      showError("password", "Password must be at least 8 characters."); return;
    }
    if (!/[A-Z]/.test(password)) {
      showError("password", "Password must contain at least one uppercase letter."); return;
    }
    if (!/[0-9]/.test(password)) {
      showError("password", "Password must contain at least one number."); return;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      showError("password", "Password must contain at least one symbol (!@#$%…)."); return;
    }
    if (password !== confirmPass) {
      showError("confirmPassword", "Passwords do not match."); return;
    }

    localStorage.setItem(
      "user_" + email,
      JSON.stringify({ name, role, email, password })
    );
    window.location.href = "login.html";
  });
}

function showError(fieldId, msg) {
  const input = document.getElementById(fieldId);
  input.classList.add("is-invalid");
  let fb = input.parentElement.nextElementSibling;
  // if sibling is the strength bar or match msg, use it; else create
  if (!fb || !fb.classList || !fb.classList.contains("invalid-feedback")) {
    fb = document.createElement("div");
    fb.className = "invalid-feedback d-block";
    input.parentElement.insertAdjacentElement("afterend", fb);
  }
  fb.textContent = msg;
  input.addEventListener("input", () => {
    input.classList.remove("is-invalid");
    if (fb) fb.textContent = "";
  }, { once: true });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get selected role from radio buttons
    const selectedRoleInput = document.querySelector('input[name="loginRole"]:checked');
    const role = selectedRoleInput ? selectedRoleInput.value : '';
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Password validation for login as requested
    if (password.length < 8) {
      showError("loginPassword", "Password must be at least 8 characters."); return;
    }
    if (!/[A-Z]/.test(password)) {
      showError("loginPassword", "Password must contain at least one uppercase letter."); return;
    }
    if (!/[0-9]/.test(password)) {
      showError("loginPassword", "Password must contain at least one number."); return;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      showError("loginPassword", "Password must contain at least one symbol (!@#$%…)."); return;
    }

    // Demo Login: Create session even if not registered
    const user = { name: email.split("@")[0], role: role, email: email };
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    window.location.href = "dashboard.html";
  });
}

// Universal Password Visibility Toggle
document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function () {
        const input = this.parentElement.querySelector('input');
        if (input) {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
        
            // Toggle the eye icon
            const icon = this.querySelector('i');
            icon.classList.toggle('bi-eye');
            icon.classList.toggle('bi-eye-slash');
        }
    });
});

// Password Strength Indicator
const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

if (passwordInput && strengthBar && strengthText) {
    passwordInput.addEventListener('input', function() {
        const val = passwordInput.value;
        let strength = 0;
        
        if (val.length >= 8) strength += 25;
        if (/[A-Z]/.test(val)) strength += 25;
        if (/[0-9]/.test(val)) strength += 25;
        if (/[^A-Za-z0-9]/.test(val)) strength += 25;
        
        strengthBar.style.width = strength + '%';
        
        if (strength === 0) {
            strengthBar.className = 'progress-bar bg-danger';
            strengthText.textContent = 'Password must be at least 8 characters';
            strengthText.className = 'text-muted';
        } else if (strength < 50) {
            strengthBar.className = 'progress-bar bg-danger';
            strengthText.textContent = 'Weak';
            strengthText.className = 'text-danger';
        } else if (strength < 100) {
            strengthBar.className = 'progress-bar bg-warning';
            strengthText.textContent = 'Medium';
            strengthText.className = 'text-warning';
        } else {
            strengthBar.className = 'progress-bar bg-success';
            strengthText.textContent = 'Strong';
            strengthText.className = 'text-success';
        }
    });
}
