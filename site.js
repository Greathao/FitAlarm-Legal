document.documentElement.classList.add("js");

const SITE_CONFIG = {
  SUPPORT_EMAIL: "YOUR_SUPPORT_EMAIL",
  GITHUB_ISSUES_URL: "https://github.com/Greathao/FitAlarm-Legal/issues"
};

const storedLanguage = localStorage.getItem("fitalarm-language");
const preferredLanguage = navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
let activeLanguage = storedLanguage || preferredLanguage;

const NAV_LABELS = {
  zh: {
    "privacy.html": "隐私",
    "terms.html": "条款",
    "support.html": "支持"
  },
  en: {
    "privacy.html": "Privacy",
    "terms.html": "Terms",
    "support.html": "Support"
  }
};

function setLanguage(language) {
  activeLanguage = language;
  localStorage.setItem("fitalarm-language", language);
  document.documentElement.lang = language === "zh" ? "zh-Hans" : "en";

  document.querySelectorAll("[data-language]").forEach((element) => {
    element.classList.toggle("is-active", element.dataset.language === language);
  });

  document.querySelectorAll("[data-language-button]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.languageButton === language));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    const page = link.getAttribute("href");
    link.textContent = NAV_LABELS[language][page] || link.textContent;
  });
}

document.querySelectorAll("[data-language-button]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.languageButton));
});

document.querySelectorAll("[data-support-email]").forEach((link) => {
  if (SITE_CONFIG.SUPPORT_EMAIL.includes("YOUR_")) {
    link.hidden = true;
    return;
  }
  link.href = `mailto:${SITE_CONFIG.SUPPORT_EMAIL}`;
  link.textContent = SITE_CONFIG.SUPPORT_EMAIL;
});

document.querySelectorAll("[data-github-issues]").forEach((link) => {
  if (SITE_CONFIG.GITHUB_ISSUES_URL.includes("YOUR_")) {
    link.hidden = true;
    return;
  }
  link.href = SITE_CONFIG.GITHUB_ISSUES_URL;
});

setLanguage(activeLanguage);
