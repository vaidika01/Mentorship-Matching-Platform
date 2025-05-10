document.getElementById("auth-page").innerHTML = `
    <div class="auth-box">
        <header>
            <h1>MentorMatch</h1>
            <p>Your journey to mentorship starts here!</p>
        </header>
        <div id="auth-content">
            <h2>Login</h2>
            <form id="auth-form" class="form-container">
                <label for="login-email">Email</label>
                <input type="email" id="login-email" required>
                <label for="login-password">Password</label>
                <input type="password" id="login-password" required>
                <button type="submit">Login</button>
            </form>
            <button id="go-to-register">Don't have an account? Register</button>
        </div>
    </div>
`;

document.getElementById("auth-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const user = mockDatabase.users.find(
    (u) => u.email === email && u.password === password
  );
  if (user) {
    mockDatabase.currentUser = user;
    alert("Login successful");
    renderPage("profile-page");
  } else {
    alert("Invalid credentials");
  }
});

document.getElementById("go-to-register").addEventListener("click", () => {
  renderPage("register-page");
});
