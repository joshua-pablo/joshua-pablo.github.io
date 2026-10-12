const GITHUB_USERNAME = "YOUR_GITHUB_USERNAME";

const projectsGrid = document.getElementById("projectsGrid");
const githubRepos = document.getElementById("githubRepos");

async function loadProjects() {
  try {
    const response = await fetch("data/projects.json");
    if (!response.ok) throw new Error("Projects file could not be loaded.");
    const projects = await response.json();
    if (!Array.isArray(projects) || projects.length === 0) throw new Error("No projects were found.");
    projectsGrid.innerHTML = projects.map((project, index) => `
      <article class="project-card">
        <div class="project-visual">
          <span class="project-number">${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}</span>
          <span class="project-symbol" aria-hidden="true">${escapeHTML(project.symbol || "</>")}</span>
        </div>
        <div class="project-body">
          <h3>${escapeHTML(project.title)}</h3>
          <p>${escapeHTML(project.description)}</p>
          <p class="project-role">Role: ${escapeHTML(project.role)}</p>
          <div class="tag-list">${(project.technologies || []).map(tech => `<span>${escapeHTML(tech)}</span>`).join("")}</div>
          <div class="project-links">
            ${project.link ? `<a href="${safeURL(project.link)}" target="_blank" rel="noreferrer">View project ↗</a>` : `<span>Project link coming soon</span>`}
          </div>
        </div>
      </article>`).join("");
  } catch (error) {
    projectsGrid.innerHTML = `<p class="error-message">Projects could not be loaded. Please check that <code>data/projects.json</code> exists and contains valid JSON.</p>`;
    console.error(error);
  }
}

async function loadGitHubRepos() {
  if (!GITHUB_USERNAME || GITHUB_USERNAME === "YOUR_GITHUB_USERNAME") {
    githubRepos.innerHTML = `<p class="error-message">Add your GitHub username in <code>js/script.js</code> to show your latest public repositories.</p>`;
    return;
  }
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?sort=updated&per_page=5&type=owner`);
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
    const repos = await response.json();
    if (!repos.length) {
      githubRepos.innerHTML = `<p class="error-message">No public repositories found yet. Add projects to your GitHub account and they will appear here.</p>`;
      return;
    }
    githubRepos.innerHTML = repos.map(repo => `
      <div class="repo-item">
        <a href="${safeURL(repo.html_url)}" target="_blank" rel="noreferrer">${escapeHTML(repo.name)} ↗</a>
        <span class="repo-meta"><span class="repo-language">${escapeHTML(repo.language || "Other")}</span></span>
      </div>`).join("");
  } catch (error) {
    githubRepos.innerHTML = `<p class="error-message">GitHub repositories are unavailable right now. Please check the username or try again later.</p>`;
    console.error(error);
  }
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}
function safeURL(value) {
  try {
    const url = new URL(value, window.location.href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
  } catch {
    return "#";
  }
}

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
contactForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    formStatus.textContent = "Please complete all fields with a valid email address.";
    formStatus.classList.remove("success");
    return;
  }
  formStatus.textContent = `Thanks, ${contactForm.elements.name.value.trim()}! This demo form does not send messages. Add a form service if you want to receive submissions.`;
  formStatus.classList.add("success");
  contactForm.reset();
});

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-theme");
  themeToggle.textContent = isLight ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 450);
  const sections = [...document.querySelectorAll("main section[id]")];
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) current = section.id;
  });
  navLinks.querySelectorAll("a").forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const typingText = document.getElementById("typingText");
const phrases = ["creative code.", "useful projects.", "game experiences."];
let phraseIndex = 0;
let charIndex = phrases[0].length;
let deleting = false;
function typeTagline() {
  const phrase = phrases[phraseIndex];
  if (deleting) {
    charIndex--;
    typingText.textContent = phrase.slice(0, charIndex);
    if (charIndex <= 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(typeTagline, 45);
  } else {
    const nextPhrase = phrases[phraseIndex];
    charIndex++;
    typingText.textContent = nextPhrase.slice(0, charIndex);
    if (charIndex >= nextPhrase.length) {
      deleting = true;
      setTimeout(typeTagline, 1500);
    } else {
      setTimeout(typeTagline, 75);
    }
  }
}
setTimeout(typeTagline, 1800);

document.getElementById("year").textContent = new Date().getFullYear();
loadProjects();
loadGitHubRepos();
