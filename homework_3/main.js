const burgerButton = document.querySelector(".header__burger__button");
const navigation = document.querySelector(".header__navigation");

burgerButton.addEventListener("click", () => {
  navigation.classList.toggle("header__navigation_open");
});
