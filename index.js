document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".navbar__item");
  const hamburgerBtn = document.querySelector("#hamburgerBtn");
  const menuContainer = document.querySelector(".menu-container");
  const scrollFilling = document.querySelector(".scroll-filling");
  const topAnchor = document.querySelector("#topAnchor");

  const scrollPositions = {
    about: document.querySelector("#about").offsetTop,
    projects: document.querySelector("#projects").offsetTop,
    contact: document.querySelector("#contact").offsetTop,
  };

  // for historical browsers
  const scrollContainer = () => document.documentElement || document.body;

  // function to perform 2 side effects:
  //    - changes the background color from rgb(255, 254, 235) to rgb(227, 226, 207)
  //    - changes the opacity of the columns from 0% to 100% as the user scrolls down
  function landingScrollChange() {
    if (window.scrollY > 20) {
      let rgb1 =
        255 - window.scrollY / 20 < 234 ? 227 : 255 - window.scrollY / 20;
      let rgb2 =
        254 - window.scrollY / 20 < 233 ? 226 : 254 - window.scrollY / 20;
      let rgb3 =
        235 - window.scrollY / 20 < 214 ? 207 : 235 - window.scrollY / 20;
      scrollFilling.style.backgroundColor = `rgb(${rgb1}, ${rgb2}, ${rgb3})`;
      let percent = window.scrollY > 810 ? 100 : (window.scrollY / 810) * 100;
      document.querySelector(".landing__col1").style.opacity = `${
        100 - percent
      }%`;
      document.querySelector(".landing__col2").style.opacity = `${
        100 - percent
      }%`;
    } else {
      scrollFilling.style.backgroundColor = "rgb(255, 254, 235)";
    }
  }

  // function to perform 1 side effect:
  //    - underlines the menu item that corresponds to the section the user is currently viewing
  function underlineMenuItemOnScroll() {
    const scrollTop = scrollContainer().scrollTop;
    const windowHeight = window.innerHeight;
    menuItems.forEach((li) => li.classList.remove("active"));
    if (scrollTop < scrollPositions.about - windowHeight / 2) {
      // You're at the top of the page
      return;
    } else if (scrollTop < scrollPositions.projects - 200) {
      menuItems[0].classList.add("active"); // About
    } else if (scrollTop < scrollPositions.contact - 600) {
      menuItems[1].classList.add("active"); // Projects
    } else {
      menuItems[2].classList.add("active"); // Contact
    }
    console.log(scrollTop, scrollPositions.contact);
  }

  // function to perform 3 side effects:
  //    - toggles the hamburger button animation
  //    - toggles the menu container visibility
  function animateHamburgerButton() {
    hamburgerBtn.classList.toggle("close");
    menuContainer.classList.toggle("show");
    if (hamburgerBtn.classList.contains("close")) {
      hamburgerBtn.style.transform = "rotate(0deg)";
      hamburgerBtn.style.transition = "transform 0s";
    } else {
      hamburgerBtn.style.transform = "rotate(180deg)";
      hamburgerBtn.style.transition = "transform 200ms ease-in-out";
    }
  }

  function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  // ADDING EVENT LISTENERS
  hamburgerBtn.addEventListener("click", animateHamburgerButton);
  topAnchor.addEventListener("click", scrollToTop);

  // dont run the scroll functions if the window is too small
  if (window.innerWidth > 920 && window.innerHeight > 520) {
    document.addEventListener("scroll", landingScrollChange);
  }

  // underline menu item on scroll on desktop
  if (window.innerWidth > 800) {
    document.addEventListener("scroll", underlineMenuItemOnScroll);
  }

  // simulate clicking close button when a menu item is clicked on mobile
  if (window.innerWidth < 800) {
    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        hamburgerBtn.click();
      });
    });
  }
});
