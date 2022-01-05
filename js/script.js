// Profile info will appear in this class
const overview = document.querySelector(".overview");
const username = "eacarr";
const repoList = document.querySelector(".repo-list");

// Fetch API JSON Data

const gitHubProfile = async (username) => {
  const user = await fetch(`https://api.github.com/users/${username}`);
  const userData = await user.json();
  // console.log(user);
  // console.log(userData);

  // Call the display function & view on project
  displayUserInfo(userData);
};
gitHubProfile(username);

// Fetch & display user info

const displayUserInfo = (userData) => {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `<figure>
  <img alt="user avatar" src=${userData.avatar_url} />
</figure>
<div>
  <p><strong>Name:</strong> ${userData.name}</p>
  <p><strong>Bio:</strong> ${userData.bio}</p>
  <p><strong>Location:</strong> ${userData.location}</p>
  <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
</div> `;
  overview.append(div);
  userRepos();
};

// Fetch Repos

const userRepos = async () => {
  const getRepos = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&per_page=100`
  );
  const reposData = await getRepos.json();
  // console.log(getRepos);
  // console.log(reposData);
  displayRepoInfo(reposData);
};

// Display info about repos

const displayRepoInfo = (repos) => {
  repos.forEach((repo) => {
    let li = document.createElement("li");
    li.classList.add("reop");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  });
};
