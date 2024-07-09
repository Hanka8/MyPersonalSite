const menuItems = document.querySelectorAll(".navbar__item");
const hamburgerBtn = document.querySelector("#hamburgerBtn");
const menuContainer = document.querySelector(".menu-container");
const navbar = document.querySelector(".navbar");
const about = document.querySelector(".about");
const projects = document.querySelector("#projects");
const landing = document.querySelector(".landing");
const scrollFilling = document.querySelector(".scroll-filling");
const copyBtns = document.querySelectorAll(".copy");
const topAnchor = document.querySelector("#topAnchor");
const navbar__item = document.querySelectorAll(".navbar__item");

const scrollPositions = {
  about: document.querySelector("#about").offsetTop,
  projects: document.querySelector("#projects").offsetTop,
  contact: document.querySelector("#contact").offsetTop,
};

// for historical browsers, maybe not necessary
const scrollContainer = () => {
  return document.documentElement || document.body;
};

// ***
function setSectionHeight(section) {
  section.style.height = window.innerHeight * 1.2;
}

function setAboutOutline() {
  let navbarHeight = navbar.offsetHeight;
  about.style.borderTop = `solid ${navbarHeight}px transparent`;
  about.style.borderBottom = `solid ${navbarHeight}px transparent`;
}
// *** 

function landingScrollChange() {
  if (window.scrollY > 20) {
    let rgb1 =
      255 - window.scrollY / 20 < 234 ? 227 : 255 - window.scrollY / 20; //color change
    let rgb2 =
      254 - window.scrollY / 20 < 233 ? 226 : 254 - window.scrollY / 20; //color change
    let rgb3 =
      235 - window.scrollY / 20 < 214 ? 207 : 235 - window.scrollY / 20; //color change
    document.querySelector(
      ".scroll-filling"
    ).style.backgroundColor = `rgb(${rgb1}, ${rgb2}, ${rgb3})`;
    let percent = window.scrollY > 810 ? 100 : (window.scrollY / 810) * 100;
    document.querySelector(".landing__col1").style.opacity = `${
      100 - percent
    }%`; //opacity change
    document.querySelector(".landing__col2").style.opacity = `${
      100 - percent
    }%`; //opacity change
  } else {
    //reset
    document.querySelector(".landing__img").style.filter = "none";
    document.querySelector(".scroll-filling").style.backgroundColor =
      "rgb(255, 254, 235)";
  }
}

function underlineMenuItemOnClick(item) {
  if (window.innerWidth > 800) {
    item.addEventListener("click", (e) => {
      menuItems.forEach((item) => item.classList.remove("active"));
      e.target.classList.add("active");
    });
  } else {
    item.addEventListener("click", () => {
      hamburgerBtn.classList.remove("close");
      menuContainer.classList.remove("show");
    });
  }
}

function underlineMenuItemOnScroll() {
  const scrollTop = scrollContainer().scrollTop;
  const windowHeight = window.innerHeight;

  navbar__item.forEach((li) => {
    li.classList.remove("active");
  });
  if (scrollTop < scrollPositions.about - windowHeight / 2) {
    // You're at the top of the page
  } else if (scrollTop < scrollPositions.projects) {
    navbar__item[0].classList.add("active"); // About
  } else if (scrollTop < scrollPositions.contact - 300) {
    navbar__item[1].classList.add("active"); // Projects
  } else {
    navbar__item[2].classList.add("active"); // Contact
  }
}

function animateHamburgerButton() {
  hamburgerBtn.classList.toggle("close");
  menuContainer.classList.toggle("show");
  if (document.querySelector("#hamburgerBtn").classList.contains("close")) {
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

// underline menu items on scroll
menuItems.forEach((item) => {
  underlineMenuItemOnClick(item);
});

// animate hamburger button on click
hamburgerBtn.addEventListener("click", animateHamburgerButton);

// scroll to top on click
topAnchor.addEventListener("click", scrollToTop);

// sticky navbar on scroll, animations on scroll, underline menu items on scroll
document.addEventListener("scroll", () => {
  if (window.innerWidth > 920 && window.innerHeight > 520) {
    // dont run on mobile
    landingScrollChange();
  }
  setAboutOutline();
  if (window.screen.width > 800) {
    // dont run on mobile
    underlineMenuItemOnScroll();
  }
});

// set section height on load, resize and orientation change
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 1340) {
    setSectionHeight(about);
  }
});

document.addEventListener("resize", () => {
  if (window.innerWidth > 1340) {
    setSectionHeight(about);
  }
});

window.addEventListener("orientationchange", () => {
  if (window.innerWidth > 1340) {
    setSectionHeight(about);
  }
});