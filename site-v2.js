(function () {
  "use strict";

  const legacy = document.querySelector("#container > .container");
  if (!legacy) return;

  const navItems = [
    ["About Me", "about"],
    ["Research Interests", "research"],
    ["News", "news"],
    ["Selected Publications", "publications"],
    ["Selected Honors", "honors"],
    ["Competition Awards", "competition"],
    ["Fundings", "funding"],
    ["Invited Talks", "talks"],
    ["Professional Services", "services"]
  ];

  document.body.insertAdjacentHTML(
    "afterbegin",
    '<a class="skip-link" href="#about">Skip to content</a>' +
      '<header class="site-header"><div class="nav-inner">' +
      '<nav class="site-nav" aria-label="Primary navigation">' +
      navItems.map(([label, id]) => `<a href="#${id}">${label}</a>`).join("") +
      "</nav></div></header>"
  );

  const oldProfile = legacy.querySelector(":scope > table.imgtable");
  if (oldProfile) oldProfile.remove();

  const shell = document.createElement("div");
  shell.className = "page-shell";

  const profile = document.createElement("aside");
  profile.className = "profile";
  profile.setAttribute("aria-label", "Profile");
  profile.innerHTML =
    '<div class="profile-card">' +
    '<img class="profile-photo" src="./Figures/cx2.jpg" alt="Portrait of Xiang Chen">' +
    "<h1>Xiang Chen</h1>" +
    '<ul class="profile-meta">' +
    "<li>Associate Professor</li>" +
    '<li><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span>Nanjing, China</span></li>' +
    '<li><i class="fa-solid fa-envelope" aria-hidden="true"></i><a href="mailto:chenxiang@njust.edu.cn">chenxiang@njust.edu.cn</a></li>' +
    "</ul>" +
    '<ul class="profile-links">' +
    '<li><i class="fa-solid fa-graduation-cap" aria-hidden="true"></i><a href="https://scholar.google.com/citations?user=vjqtXegAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar</a></li>' +
    '<li><i class="fa-brands fa-github" aria-hidden="true"></i><a href="https://github.com/cschenxiang" target="_blank" rel="noopener">GitHub</a></li>' +
    '<li><i class="fa-brands fa-orcid" aria-hidden="true"></i><a href="https://orcid.org/0000-0002-8966-8159" target="_blank" rel="noopener">ORCID</a></li>' +
    '<li><i class="fa-solid fa-database" aria-hidden="true"></i><a href="https://dblp.org/pid/64/3062-15.html" target="_blank" rel="noopener">DBLP</a></li>' +
    "</ul></div>";

  const main = document.createElement("main");
  main.className = "main-content";
  main.id = "main-content";

  while (legacy.firstChild) main.appendChild(legacy.firstChild);
  legacy.replaceWith(shell);
  shell.append(profile, main);

  const headings = Array.from(main.querySelectorAll("h2"));
  headings.forEach((heading) => {
    heading.querySelectorAll("i").forEach((icon) => icon.remove());
    if (heading.firstChild && heading.firstChild.nodeType === Node.TEXT_NODE) {
      heading.firstChild.textContent = heading.firstChild.textContent.replace(
        /^[\s\u00a0]+/,
        ""
      );
    }
  });
  const findHeading = (pattern) => headings.find((element) => pattern.test(element.textContent));
  const biography = findHeading(/Biography/i);
  const news = findHeading(/^\s*News\s*$/i);
  const publications = findHeading(/Selected Publications/i);
  const honors = findHeading(/Selected Honors/i);
  const competition = findHeading(/Competition Awards/i);
  const funding = findHeading(/Fundings/i);
  const talks = findHeading(/Invited Talks/i);
  const services = findHeading(/Professional Services/i);
  const assignSectionId = (heading, id) => {
    if (!heading) return;
    document.querySelectorAll(`[id="${id}"]`).forEach((element) => {
      if (element !== heading) element.removeAttribute("id");
    });
    heading.id = id;
  };

  if (biography) {
    const biographyText = biography.nextElementSibling;
    if (biographyText) {
      biographyText.id = "about";
      biography.remove();
      const research = document.createElement("section");
      research.className = "research-block";
      research.id = "research";
      research.innerHTML =
        "<h2>Research Interests</h2>" +
        "<p>My research focuses on next-generation low-level computer vision, including visual foundation models, visual agents, and embodied low-level vision.</p>";
      biographyText.after(research);
      const recruitment = main.querySelector(".infoblock");
      if (recruitment) research.after(recruitment);
    }
  }

  if (news) {
    assignSectionId(news, "news");
    const list = news.nextElementSibling;
    if (list && list.tagName === "UL") list.classList.add("news-list");
  }

  if (publications) {
    assignSectionId(publications, "publications");
    const note = publications.querySelector("font:last-child");
    if (note) note.classList.add("section-note");
  }

  assignSectionId(honors, "honors");
  assignSectionId(competition, "competition");
  assignSectionId(funding, "funding");
  assignSectionId(talks, "talks");
  assignSectionId(services, "services");

  main.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.rel = "noopener noreferrer";
  });

  const footer = main.querySelector("#footer");
  if (footer) footer.remove();

  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const updateNavigation = () => {
    let activeId = sections[0] ? sections[0].id : "";
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= 85) activeId = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });
  };

  window.addEventListener("scroll", updateNavigation, { passive: true });
  updateNavigation();
})();




