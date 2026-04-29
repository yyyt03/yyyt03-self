const html = document.documentElement;
const body = document.body;
const title = document.querySelector("title");
const description = document.querySelector('meta[name="description"]');
const textNodes = document.querySelectorAll("[data-i18n]");
const altNodes = document.querySelectorAll("[data-i18n-alt]");
const langButtons = document.querySelectorAll("[data-lang-button]");

const metadata = {
  zh: {
    lang: "zh-CN",
    title: "yyyt03",
    description: "yyyt03 的个人页面",
  },
  en: {
    lang: "en",
    title: "yyyt03",
    description: "Personal homepage of yyyt03",
  },
};

function setLanguage(lang) {
  const next = metadata[lang] ? lang : "zh";

  html.lang = metadata[next].lang;
  body.dataset.language = next;
  title.textContent = metadata[next].title;
  description.setAttribute("content", metadata[next].description);

  textNodes.forEach((node) => {
    const value = node.dataset[next];
    if (value) {
      node.textContent = value;
    }
  });

  altNodes.forEach((node) => {
    const value = node.dataset[`${next}Alt`];
    if (value) {
      node.setAttribute("alt", value);
    }
  });

  langButtons.forEach((button) => {
    const active = button.dataset.langButton === next;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  window.localStorage.setItem("preferred-language", next);
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.langButton);
  });
});

const savedLanguage = window.localStorage.getItem("preferred-language");
setLanguage(savedLanguage || "zh");
