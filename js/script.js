// Profile info will appear in this class
const overview = document.querySelector(".overview");
const username = "eacarr";
const repoList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

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

// Event Listener to retrieve repo

repoList.addEventListener("click", (e) => {
  if (e.target.matches("h3")) {
    let repoName = e.target.innerText;
    // console.log(repoName);
    specificRepo(repoName);
  }
});

// Get specific repo

const specificRepo = async (repoName) => {
  const getSpecificRepo = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await getSpecificRepo.json();
  console.log(repoInfo);

  // Get Language
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  //   console.log(fetchLanguages);
  console.log(languageData);

  // Array of languages
  const languages = [];
  for (let language in languageData) {
    languages.push(language);
  }
  // console.log(languages);
  displayspecificRepo(repoInfo, languages);
};

const displayspecificRepo = (repoInfo, languages) => {
  repoData.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages}</p>
  <a class="visit" href="${repoInfo.html_url}" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoData.append(div);
  repoData.classList.remove("hide");
  repos.classList.add("hide");
};
