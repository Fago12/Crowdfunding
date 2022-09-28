const menuToggle = document.querySelector(".menu-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");
const closeMenu = document.querySelector(".close-menu");
const date = document.getElementById("date");
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");
const labelBtns = document.querySelectorAll(".radio-btn-container");
const pledgeHeaders = document.querySelectorAll(".article-header-text");


// ********** Hamburger Menu **********
menuToggle.addEventListener("click", function () {
  menuToggle.style.opacity = 0;
  linksContainer.classList.add("show-menu");
  //linkItems.style.opacity = 1;
  links.classList.add("scale-in-tr");
  document.body.style.overflow = "hidden";
});
closeMenu.addEventListener("click", function () {
  linksContainer.classList.remove("show-menu");
  menuToggle.style.opacity = 1;
  links.classList.remove("scale-in-tr");
  document.body.style.overflow = "auto";
});

// ********** Date **********
date.innerHTML = new Date().getFullYear();

// ********** Fixed Navbar **********
window.addEventListener('scroll', function() {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add('fixed-nav');
  } else {
    navbar.classList.remove('fixed-nav');
  }
  //back to top button
  if (scrollHeight > 500) {
    topLink.classList.add('show-link');
  } else {
    topLink.classList.remove('show-link');
  }
});

/*
labelAfter.addEventListener('mouseenter', addHoverEffect);
labelAfter.addEventListener('mouseleave', removeHoverEffect);
pledgeHeader.addEventListener('mouseenter', addHoverEffect);
pledgeHeader.addEventListener('mouseleave', removeHoverEffect);
*/

labelBtns.forEach(function (labelBtn) {
  labelBtn.addEventListener('mouseenter',);
  labelBtn.addEventListener('mouseleave',);
  function addHoverEffect () {
    labelBtn.classList.add("pledge-btn-hover");
    pledgeHeader.classList.add("pledge-header-hover");
  }
});

/*


function removeHoverEffect () {
  labelBtn.classList.remove("pledge-btn-hover");
  pledgeHeader.classList.remove("pledge-header-hover");
}
*/