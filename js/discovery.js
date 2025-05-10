document.getElementById("discovery-page").innerHTML = `
    <div class="discovery-box">
        <header>
            <h1>MentorMatch</h1>
            <p>Your journey to mentorship starts here!</p>
        </header>
        <h2>Find Mentors/Mentees</h2>
        <div id="filters">
            <label for="filter-role">Role</label>
            <select id="filter-role">
                <option value="all">All</option>
                <option value="mentor">Mentor</option>
                <option value="mentee">Mentee</option>
            </select>
            <label for="filter-skills">Skills</label>
            <input type="text" id="filter-skills">
            <button id="filter-btn">Filter</button>
        </div>
        <div id="users-list"></div>
        <button id="go-to-profile">Back to Profile</button>
    </div>
`;

document.getElementById("filter-btn").addEventListener("click", () => {
  const role = document.getElementById("filter-role").value;
  const skills = document.getElementById("filter-skills").value;

  const filteredProfiles = mockDatabase.profiles.filter((profile) => {
    const matchesRole = role === "all" || profile.role === role;
    const matchesSkills = skills === "" || profile.skills.includes(skills);
    return matchesRole && matchesSkills;
  });

  const usersList = document.getElementById("users-list");
  usersList.innerHTML = filteredProfiles
    .map(
      (profile) =>
        `<div>
          ${profile.email} - ${profile.role} - ${profile.skills}
          <button class="send-request" data-email="${profile.email}">Send Request</button>
        </div>`
    )
    .join("");

  filteredProfiles.forEach((profile) => {
    document
      .querySelector(`.send-request[data-email="${profile.email}"]`)
      .addEventListener("click", () => {
        sendRequest(profile.email);
      });
  });
});

function sendRequest(targetUserEmail) {
  if (!mockDatabase.currentUser) {
    alert("You must be logged in to send a request.");
    return;
  }

  const request = {
    senderEmail: mockDatabase.currentUser.email,
    receiverEmail: targetUserEmail,
    status: "pending",
  };

  mockDatabase.requests.push(request);
  alert("Request sent successfully!");
}

document.getElementById("go-to-profile").addEventListener("click", () => {
  renderPage("profile-page");
});
