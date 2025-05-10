document.getElementById("profile-page").innerHTML = `
    <div class="profile-box">
        <header>
            <h1>MentorMatch</h1>
            <p>Your personalized mentorship journey begins here!</p>
        </header>
        <h2>Set Up Your Profile</h2>
        <p>Define your role, skills, and interests to start connecting with mentors or mentees.</p>
        <form id="profile-form" class="form-container">
            <label for="role">Select Your Role</label>
            <select id="role" required>
                <option value="mentor">Mentor</option>
                <option value="mentee">Mentee</option>
            </select>
            <label for="skills">Your Skills</label>
            <input type="text" id="skills" placeholder="e.g., Leadership, JavaScript" required>
            <label for="interests">Your Interests</label>
            <input type="text" id="interests" placeholder="e.g., AI, Startups" required>
            <label for="bio">About You</label>
            <textarea id="bio" placeholder="Write a short bio about yourself..." required></textarea>
            <button type="submit">Save Profile</button>
        </form>
        <h3>Your Pending Mentorship Requests</h3>
        <p>These are requests you need to respond to:</p>
        <div id="pending-requests"></div>
        <h3>Your Ongoing Mentorships</h3>
        <p>Below are your active mentorship connections:</p>
        <div id="connections"></div>
        <div class="action-buttons">
            <button id="logout-btn">Logout</button>
            <button id="go-to-discovery">Explore Mentorship Opportunities</button>
        </div>
    </div>
`;

document.getElementById("profile-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const role = document.getElementById("role").value;
  const skills = document.getElementById("skills").value;
  const interests = document.getElementById("interests").value;
  const bio = document.getElementById("bio").value;

  const profile = {
    email: mockDatabase.currentUser.email,
    role,
    skills,
    interests,
    bio,
  };

  mockDatabase.profiles = mockDatabase.profiles.filter(
    (p) => p.email !== profile.email
  );
  mockDatabase.profiles.push(profile);

  mockDatabase.requests = mockDatabase.requests.filter(
    (req) =>
      req.senderEmail !== profile.email && req.receiverEmail !== profile.email
  );

  mockDatabase.connections = mockDatabase.connections.filter(
    (conn) => conn.mentor !== profile.email && conn.mentee !== profile.email
  );

  alert("Profile saved successfully!");
  renderPage("discovery-page");
});

document.getElementById("logout-btn").addEventListener("click", () => {
  mockDatabase.currentUser = null;
  document.getElementById("login-email").value = "";
  document.getElementById("login-password").value = "";
  renderPage("auth-page");
});

document.getElementById("go-to-discovery").addEventListener("click", () => {
  renderPage("discovery-page");
});
