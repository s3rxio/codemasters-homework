import "./styles/index.scss";

const button = document.querySelector(".counter-button");

button.addEventListener("click", () => {
  const count = button.getAttribute("data-count");
  const nextCount = Number(count) + 1;

  button.setAttribute("data-count", nextCount.toString());
});
