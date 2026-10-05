document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     ELEMENTS
  ========================================= */

  const loginForm = document.getElementById("f");

  const emailInput = loginForm
    ? loginForm.querySelector('input[type="email"]')
    : null;

  const passwordInput = document.getElementById("pw");
  const passwordToggle = document.getElementById("eye");

  const rememberMe = document.querySelector(
    '.ck input[type="checkbox"]'
  );

  const roleButtons = document.querySelectorAll(".roles button");
  const roleSlider = document.querySelector(".roles .slide");

  const titleText = document.getElementById("t");
  const subtitleText = document.getElementById("st");
  const roleName = document.getElementById("rn");

  const formMessage = document.getElementById("ok");
  const submitButton = document.querySelector(".go");

  const restaurantId = document.getElementById("rid");

  if (!loginForm) return;


  /* =========================================
     PASSWORD SHOW / HIDE
  ========================================= */

  if (passwordToggle && passwordInput) {

    passwordToggle.innerHTML =
      '<i class="fa-regular fa-eye"></i>';

    passwordToggle.addEventListener("click", () => {

      if (passwordInput.type === "password") {

        passwordInput.type = "text";

        passwordToggle.innerHTML =
          '<i class="fa-regular fa-eye-slash"></i>';

        passwordToggle.setAttribute(
          "aria-label",
          "Hide password"
        );

      } else {

        passwordInput.type = "password";

        passwordToggle.innerHTML =
          '<i class="fa-regular fa-eye"></i>';

        passwordToggle.setAttribute(
          "aria-label",
          "Show password"
        );
      }
    });
  }


  /* =========================================
     EMAIL VALIDATION
  ========================================= */

  function validateEmail(value) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  }


  /* =========================================
     PASSWORD VALIDATION
  ========================================= */

  function validatePassword(value) {

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/;

    return passwordRegex.test(value);

  }


  /* =========================================
     SHOW ERROR
  ========================================= */

  function showError(message) {

    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.style.color = "var(--orange)";
    formMessage.classList.add("show");

  }


  /* =========================================
     SHOW SUCCESS
  ========================================= */

  function showSuccess(message) {

    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.style.color = "#16845c";
    formMessage.classList.add("show");

  }


  /* =========================================
     HIDE MESSAGE
  ========================================= */

  function hideMessage() {

    if (!formMessage) return;

    formMessage.textContent = "";
    formMessage.classList.remove("show");

  }


  /* =========================================
     REMOVE INPUT ERRORS
  ========================================= */

  [emailInput, passwordInput].forEach((input) => {

    if (!input) return;

    input.addEventListener("input", () => {

      input.style.borderColor = "";

      hideMessage();

    });

  });


  /* =========================================
     ROLE SLIDER
  ========================================= */

  function updateRoleSlider(activeButton) {

    if (!roleSlider || !activeButton) return;

    if (activeButton === roleButtons[0]) {

      roleSlider.style.transform = "translateX(0)";

    } else {

      roleSlider.style.transform = "translateX(100%)";

    }

  }


  /* =========================================
     ROLE SELECTOR
  ========================================= */

  roleButtons.forEach((button) => {

    button.addEventListener("click", () => {

      /* Remove active state */
      roleButtons.forEach((item) => {

        item.classList.remove("on");

      });


      /* Add active state */
      button.classList.add("on");


      /* Move black indicator */
      updateRoleSlider(button);


      const selectedRole = button.dataset.r;


      /* Update role name */
      if (roleName) {

        roleName.textContent = selectedRole;

      }


      /* Update heading */
      if (titleText) {

        titleText.textContent =
          button.dataset.t ||
          "Welcome back, foodie!";

      }


      /* Update subtitle */
      if (subtitleText) {

        subtitleText.textContent =
          button.dataset.s ||
          "Login as a customer to order your favourites.";

      }


      /* Restaurant Owner fields */
      if (restaurantId) {

        const restaurantInput =
          restaurantId.querySelector("input");


        if (selectedRole === "Restaurant Owner") {

          restaurantId.classList.remove("hide");

          if (restaurantInput) {

            restaurantInput.required = true;

          }

        } else {

          restaurantId.classList.add("hide");

          if (restaurantInput) {

            restaurantInput.required = false;
            restaurantInput.value = "";

          }

        }

      }


      hideMessage();

    });

  });


  /* =========================================
     LOGIN
  ========================================= */

  loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    hideMessage();

    let valid = true;


    const emailValue = emailInput
      ? emailInput.value.trim()
      : "";


    const passwordValue = passwordInput
      ? passwordInput.value
      : "";


    /* =========================================
       EMAIL CHECK
    ========================================= */

    if (!validateEmail(emailValue)) {

      if (emailInput) {

        emailInput.style.borderColor =
          "var(--orange)";

      }

      showError(
        "Please enter a valid email address."
      );

      valid = false;

    }


    /* =========================================
       PASSWORD EMPTY CHECK
    ========================================= */

    if (passwordValue === "") {

      if (passwordInput) {

        passwordInput.style.borderColor =
          "var(--orange)";

      }

      showError(
        "Please enter your password."
      );

      return;

    }


    /* =========================================
       PASSWORD FORMAT CHECK
    ========================================= */

    if (!validatePassword(passwordValue)) {

      if (passwordInput) {

        passwordInput.style.borderColor =
          "var(--orange)";

      }

      showError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      );

      return;

    }


    if (!valid) return;


    /* =========================================
       GET ACTIVE ROLE
    ========================================= */

    const activeRole =
      document.querySelector(".roles button.on");


    const selectedRole = activeRole
      ? activeRole.dataset.r
      : "Customer";


    /* =========================================
       RESTAURANT ID CHECK
    ========================================= */

    if (selectedRole === "Restaurant Owner") {

      const restaurantInput =
        restaurantId
          ? restaurantId.querySelector("input")
          : null;


      if (
        restaurantInput &&
        restaurantInput.value.trim() === ""
      ) {

        restaurantInput.style.borderColor =
          "var(--orange)";

        showError(
          "Please enter your Restaurant ID."
        );

        return;

      }

    }


    /* =========================================
       LOGIN LOADING
    ========================================= */

    const originalHTML = submitButton
      ? submitButton.innerHTML
      : "";


    if (submitButton) {

      submitButton.classList.add("loading");

      submitButton.innerHTML = `
        <span>Signing in...</span>
        <strong class="login-spinner"></strong>
      `;

      submitButton.disabled = true;

    }


    /* =========================================
       LOGIN PROCESS
    ========================================= */

    setTimeout(() => {

      const currentUser = {

        name: emailValue.split("@")[0],

        email: emailValue,

        role: selectedRole

      };


      /* Save login session */
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
      );


      /* Success message */
      showSuccess(
        `Welcome back! Signed in as ${selectedRole}.`
      );


      /* Reset form */
      loginForm.reset();


      if (emailInput) {

        emailInput.value = "";

      }


      if (passwordInput) {

        passwordInput.value = "";
        passwordInput.type = "password";

      }


      /* Reset password icon */
      if (passwordToggle) {

        passwordToggle.innerHTML =
          '<i class="fa-regular fa-eye"></i>';

        passwordToggle.setAttribute(
          "aria-label",
          "Show password"
        );

      }


      /* Reset Restaurant ID */
      if (restaurantId) {

        restaurantId.classList.add("hide");

        const restaurantInput =
          restaurantId.querySelector("input");


        if (restaurantInput) {

          restaurantInput.required = false;
          restaurantInput.value = "";

        }

      }


      /* Reset role selector */
      roleButtons.forEach((button, index) => {

        button.classList.toggle(
          "on",
          index === 0
        );

      });


      if (roleSlider) {

        roleSlider.style.transform =
          "translateX(0)";

      }


      if (roleName) {

        roleName.textContent = "Customer";

      }


      if (titleText) {

        titleText.textContent =
          "Welcome back, foodie!";

      }


      if (subtitleText) {

        subtitleText.textContent =
          "Login as a customer to order your favourites.";

      }


      /* Restore login button */
      if (submitButton) {

        submitButton.classList.remove("loading");

        submitButton.innerHTML =
          originalHTML;

        submitButton.disabled = false;

      }


      /* =========================================
         REDIRECT
      ========================================= */

      setTimeout(() => {

        if (
          selectedRole.toLowerCase() ===
          "restaurant owner"
        ) {

          window.location.href =
            "restaurant-dashboard.html";

        } else {

          window.location.href =
            "customer-dashboard.html";

        }

      }, 1000);

    }, 1200);

  });


  /* =========================================
     RESET LOGIN PAGE
  ========================================= */

  window.addEventListener("pageshow", () => {

    loginForm.reset();


    if (emailInput) {

      emailInput.value = "";

    }


    if (passwordInput) {

      passwordInput.value = "";

      passwordInput.type =
        "password";

    }


    hideMessage();


    if (rememberMe) {

      rememberMe.checked = false;

    }


    /* Reset password icon */
    if (passwordToggle) {

      passwordToggle.innerHTML =
        '<i class="fa-regular fa-eye"></i>';

      passwordToggle.setAttribute(
        "aria-label",
        "Show password"
      );

    }


    /* Reset role buttons */
    roleButtons.forEach((button, index) => {

      button.classList.toggle(
        "on",
        index === 0
      );

    });


    /* Reset black role indicator */
    if (roleSlider) {

      roleSlider.style.transform =
        "translateX(0)";

    }


    /* Reset heading */
    if (titleText) {

      titleText.textContent =
        "Welcome back, foodie!";

    }


    /* Reset subtitle */
    if (subtitleText) {

      subtitleText.textContent =
        "Login as a customer to order your favourites.";

    }


    /* Reset role name */
    if (roleName) {

      roleName.textContent =
        "Customer";

    }


    /* Reset restaurant ID */
    if (restaurantId) {

      restaurantId.classList.add("hide");

      const restaurantInput =
        restaurantId.querySelector("input");


      if (restaurantInput) {

        restaurantInput.required = false;

        restaurantInput.value = "";

      }

    }

  });

});