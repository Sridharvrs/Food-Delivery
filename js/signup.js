document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     ELEMENTS
  ========================================= */

  const form = document.getElementById("signupForm");

  const name = document.getElementById("name");

  const email = document.getElementById("email");

  const password = document.getElementById("password");

  const confirmPassword =
    document.getElementById("confirmPassword");

  const signupClose =
    document.getElementById("signupClose");

  const togglePassword =
    document.getElementById("togglePassword");

  const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");


  if (!form) return;


  /* =========================================
     SOCIAL BUTTONS
  ========================================= */

  document.querySelectorAll(".social-btn").forEach((btn) => {

    btn.addEventListener("click", () => {

      alert(
        "This is a demo signup page.\nSocial signup is currently unavailable."
      );

    });

  });


  /* =========================================
     PASSWORD TOGGLE
  ========================================= */

  function toggle(input, button) {

    const icon = button.querySelector("i");

    if (input.type === "password") {

      input.type = "text";

      icon.classList.remove("fa-eye");

      icon.classList.add("fa-eye-slash");

      button.setAttribute(
        "aria-label",
        "Hide password"
      );

    } else {

      input.type = "password";

      icon.classList.remove("fa-eye-slash");

      icon.classList.add("fa-eye");

      button.setAttribute(
        "aria-label",
        "Show password"
      );

    }

  }


  if (togglePassword) {

    togglePassword.addEventListener("click", () => {

      toggle(
        password,
        togglePassword
      );

    });

  }


  if (toggleConfirmPassword) {

    toggleConfirmPassword.addEventListener("click", () => {

      toggle(
        confirmPassword,
        toggleConfirmPassword
      );

    });

  }


  /* =========================================
     STRONG PASSWORD REGEX
  ========================================= */

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/;


  /* =========================================
     CREATE MESSAGE BOX
  ========================================= */

  function showMessage(message, success = false) {

    let box =
      document.getElementById("signupMessage");


    if (!box) {

      box = document.createElement("div");

      box.id = "signupMessage";

      form.appendChild(box);

    }


    box.textContent = message;

    box.classList.add("show");


    if (success) {

      box.classList.add("success");

      box.classList.remove("error");

    } else {

      box.classList.add("error");

      box.classList.remove("success");

    }

  }


  /* =========================================
     FORM SUBMIT
  ========================================= */

  form.addEventListener("submit", function (e) {

    e.preventDefault();


    const terms = document.querySelector(
      '.check-row input[type="checkbox"]'
    );


    /* =====================================
       NAME
    ===================================== */

    if (name.value.trim().length < 3) {

      showMessage(
        "Enter your full name."
      );

      name.focus();

      return;

    }


    /* =====================================
       EMAIL
    ===================================== */

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.value.trim()
      )
    ) {

      showMessage(
        "Enter a valid email address."
      );

      email.focus();

      return;

    }


    /* =====================================
       PASSWORD
    ===================================== */

    if (!passwordRegex.test(password.value)) {

      showMessage(
        "Password must contain at least 8 characters, uppercase, lowercase, number and special character."
      );

      password.focus();

      return;

    }


    /* =====================================
       CONFIRM PASSWORD
    ===================================== */

    if (
      password.value !==
      confirmPassword.value
    ) {

      showMessage(
        "Passwords do not match."
      );

      confirmPassword.focus();

      return;

    }


    /* =====================================
       TERMS
    ===================================== */

    if (terms && !terms.checked) {

      showMessage(
        "Please accept the Terms & Privacy Policy."
      );

      return;

    }


    /* =====================================
       BUTTON LOADING
    ===================================== */

    const button =
      form.querySelector(".submit-btn");

    const label =
      button.querySelector("span");


    button.disabled = true;

    button.classList.add("loading");

    label.textContent =
      "Creating Account...";


    /* =====================================
       CREATE ACCOUNT PROCESS
    ===================================== */

    setTimeout(() => {

      button.disabled = false;

      button.classList.remove("loading");

      label.textContent =
        "Create Account";


      /* =================================
         SUCCESS
      ================================= */

      showMessage(
        "✓ Account created successfully! Redirecting to Login...",
        true
      );


      /* =================================
         REDIRECT
      ================================= */

      setTimeout(() => {

        window.location.href =
          "login.html";

      }, 1800);


    }, 1800);

  });


  /* =========================================
     CLOSE SIGNUP PAGE
  ========================================= */

  if (signupClose) {

    signupClose.addEventListener("click", (e) => {

      e.preventDefault();

      window.location.href =
        "index.html";

    });

  }

});