// Profile info will appear in this class
const overview = document.querySelector(".overview");
// Other Globlal variables

const username = "eacarr";
const repoList = document.querySelector(".repo-list");
const reposContainer = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewRepoBtn = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");
// Fetch API JSON Data

const gitHubProfile = async () => {
  const user = await fetch(`https://api.github.com/users/${username}`);
  const userData = await user.json();
  // Call the display function & view on project
  displayUserInfo(userData);
};
gitHubProfile();

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
  userRepos(username);
};

// Fetch Repos

const userRepos = async (username) => {
  const getRepos = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const reposData = await getRepos.json();
  // console.log(getRepos);
  // console.log(reposData);
  displayRepoInfo(reposData);
};

// Display info about repos

const displayRepoInfo = (reposData) => {
  filterInput.classList.remove("hide");
  reposData.forEach((repo) => {
    let li = document.createElement("li");
    li.classList.add("repo");
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
  repoData.classList.remove("hide");
  reposContainer.classList.add("hide");
  // show back to repo button
  viewRepoBtn.classList.remove("hide");

  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages}</p>
  <a class="visit" href="${repoInfo.html_url}" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoData.append(div);
};

// Event listener for back to repo button

viewRepoBtn.addEventListener("click", () => {
  repoData.classList.add("hide");
  reposContainer.classList.remove("hide");
  viewRepoBtn.classList.add("hide");
});

// Event listener for filterinput

filterInput.addEventListener("input", (e) => {
  const inputValue = e.target.value;
  // console.log(inputValue);
  const repos = document.querySelectorAll(".repo");
  const inputValueLower = inputValue.toLowerCase();
  repos.forEach((repo) => {
    const repoValueText = repo.innerText.toLowerCase();
    if (repoValueText.includes(inputValueLower)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  });
});
