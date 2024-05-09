// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
(function () {
  const validateUsername = (username) => {
    if (
      !username ||
      typeof username != "string" ||
      username.trim().length == 0
    ) {
      throw `Please provide a valid username`;
    }
    username = username.trim();
    if (username.length < 5 || username.length > 10) {
      throw `username must be between 5-10 characters`;
    }
    let numbers = "1234567890";
    for (let i of username) {
      if (numbers.includes(i)) {
        throw `username cannot contain any numbers`;
      }
    }
  };
  const validatePassword = (password) => {
    if (
      !password ||
      typeof password != "string" ||
      password.trim().length == 0
    ) {
      throw `please provide a valid password`;
    }
    password = password.trim();
    if (password.length < 8 || password.includes(" ")) {
      throw `password must be at least 8 characters long and can't contain spaces`;
    }
    let numbers = "1234567890";
    let containsNumbers = false;
    let containsCapitals = false;
    let containsSpecials = false;
    let capitals = "ABCDEFGHIJKLMONPQRSTUVWXYZ";
    let specials = "`~!@#$%^&*()_-+={}[]|\\:;'\",<.>/?";
    for (let i of password) {
      if (numbers.includes(i)) {
        containsNumbers = true;
      }
      if (capitals.includes(i)) {
        containsCapitals = true;
      }
      if (specials.includes(i)) {
        containsSpecials = true;
      }
    }
    if (!containsCapitals || !containsNumbers || !containsSpecials) {
      throw `password must contain at least one upper-case letter, one number, and one special character`;
    }
  };
  const checkPasswordsMatch = (password1, password2) => {
    validatePassword(password1);
    validatePassword(password2);
    password1 = password1.trim();
    password2 = password2.trim();
    if (password1 != password2) {
      throw `passwords don't match!`;
    }
  };
  const validateFavoriteQuote = (favoriteQuote) => {
    if (
      !favoriteQuote ||
      typeof favoriteQuote != "string" ||
      favoriteQuote.trim().length == 0
    ) {
      throw `please provide a valid favoriteQuote`;
    }
    favoriteQuote = favoriteQuote.trim();
    for (let i of favoriteQuote) {
      if (numbers.includes(i)) {
        throw `favorite quote cannot include any numbers`;
      }
    }
    if (favoriteQuote.length < 20 || favoriteQuote.length > 255) {
      throw `favorite quote should be between 20 and 255 characters long`;
    }
  };
  const validateThemePreference = (themePreference) => {
    if (
      !themePreference ||
      typeof themePreference != "string" ||
      themePreference.trim().length == 0
    ) {
      throw `please provide a valid theme preference`;
    }
    themePreference = themePreference.trim();
    themePreference = themePreference.toLowerCase();
    if (themePreference != "dark" && themePreference != "light") {
      throw `theme preference must be dark or light`;
    }
  };
  const validateRole = (role) => {
    if (!role || typeof role != "string" || role.trim().length == 0) {
      throw `please provide a valid theme preference`;
    }
    role = role.trim();
    role = role.toLowerCase();
    if (role != "admin" && role != "user") {
      throw `role must be admin or user`;
    }
  };
  const loginForm = document.getElementById("signin-form");
  const registerForm = document.getElementById("signup-form");
  const errorMsg = document.getElementById("errorMessage");
  errorMsg.hidden = true;
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      try {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        validateUsername(username);
        validatePassword(password);
        loginForm.submit();
      } catch (e) {
        errorMsg.hidden = false;
        errorMsg.textContent = e;
      }
    });
  }
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      try {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassowrd").value;
        let favoriteQuote = document.getElementById("favoriteQuote").value;
        let themePreference = document.getElementById("themePreference").value;
        let role = document.getElementById("role").value;
        validateUsername(username);
        checkPasswordsMatch(password, confirmPassword);
        validateFavoriteQuote(favoriteQuote);
        validateThemePreference(themePreference);
        validateRole(role);
        registerForm.submit();
      } catch (e) {
        errorMsg.hidden = false;
        errorMsg.textContent = e;
      }
    });
  }
})();
