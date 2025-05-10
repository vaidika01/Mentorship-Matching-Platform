document.getElementById("register-page").innerHTML = `
    <div class="register-box">
        <header>
            <h1>MentorMatch</h1>
            <p>Your journey to mentorship starts here!</p>
        </header>
        <h2>Register</h2>
        <form id="register-form" class="form-container">
            <label for="register-email">Email</label>
            <input type="email" id="register-email" required>
            <label for="register-password">Password</label>
            <input type="password" id="register-password" required>
            <button type="submit">Register</button>
        </form>
        <button id="go-to-login">Already have an account? Login</button>
    </div>
`;

document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  if (mockDatabase.users.find((u) => u.email === email)) {
    alert("Email already in use.");
  } else {
    const newUser = {
      email,
      password,
    };
    mockDatabase.users.push(newUser);
    alert("Registration successful!");
    renderPage("auth-page");
  }
});

document.getElementById("go-to-login").addEventListener("click", () => {
  renderPage("auth-page");
});
