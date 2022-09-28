// ********** Select Items **********
const menuToggle = document.querySelector(".menu-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");
const linkItems = document.querySelectorAll(".link-item");
const closeMenu = document.querySelector(".close-menu");
const date = document.getElementById("date");
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");
const articleHeaders = document.querySelectorAll(".left-header");
const openBtn = document.querySelector("#open-btn");
const modalOverlay = document.querySelector(".modal-overlay");
const modalContainer = document.querySelector(".modal-container");
const closeModalBtn = document.querySelector(".close-modal");
const bookmark = document.querySelector(".bookmark");
const btnText = document.querySelector(".bookmark .btn-grey");
const tooltipText = document.querySelector(".tooltip-text > p");
const radioBtns = document.querySelectorAll(".radio-btn-container > input");
const selectBtns = document.querySelectorAll(".select-btn");
const forms = document.querySelectorAll(".pledge-selection");
const totalAmount = document.querySelector(".total-amount > h2");
const totalBackers = document.querySelector(".total-backers > h2");
const totalDaysContainer = document.querySelector(".total-days");
const totalDays = document.querySelector(".total-days > h2");
const progressBar = document.querySelector(".progress-bar > div");
const successModal = document.querySelector (".success-modal");
const successBtn = document.querySelector(".success-btn");
//Progress Bar
let progressWidth = 0;



//Save Data on Refresh
window.addEventListener('DOMContentLoaded', function () {
  let amountValue = sessionStorage.getItem("amountValue");
  let backers = sessionStorage.getItem("backers");
  let bookmarkState = sessionStorage.getItem("bookmark");
  let progressBarWidth = JSON.parse(sessionStorage.getItem("progressBarWidth"));
  let numsArr = JSON.parse(sessionStorage.getItem("numsArr"));
  let hideCard = sessionStorage.getItem("hideCard");
  let hideSection = sessionStorage.getItem("hideSection");
  
  if (sessionStorage.getItem("amountValue")) {
    totalAmount.innerHTML = amountValue;
  }
  if (sessionStorage.getItem("backers")) {
    totalBackers.innerHTML = backers;
  }
  if (sessionStorage.getItem("bookmark")) {
    bookmark.classList.add("bookmarked");
    btnText.textContent = "bookmarked!";
    tooltipText.innerHTML = "Bookmarked!";
  }
  if (JSON.parse(sessionStorage.getItem("progressBarWidth"))) {
    progressBar.style.width = progressBarWidth + '%';
  }
  if (JSON.parse(sessionStorage.getItem("numsArr"))) {
    document.querySelectorAll(".pledges-left > h2").forEach(function (item, index) {
      item.innerHTML = numsArr[index];
      if (item.innerHTML === "0") {
        item.parentElement.parentElement.parentElement.classList.add(hideCard);
      }
    });
    document.querySelectorAll(".article-pledge > h3").forEach(function (item, index) {
      item.innerHTML = numsArr[index];
      if (item.innerHTML === "0") {
        item.parentElement.parentElement.classList.add(hideSection);
      }
    });
  }
});

// ********** Hamburger Menu **********
menuToggle.addEventListener("click", function () {
  menuToggle.style.opacity = 0;
  linksContainer.classList.add("show-menu");
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
  //show back to top button
  if (scrollHeight > 500) {
    topLink.classList.add('show-link');
  } else {
    topLink.classList.remove('show-link');
  }
});

//scroll to top
topLink.addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo(0, 0);
});

//other links
linkItems.forEach(function (linkItem) {
  linkItem.addEventListener('click', function (e) {
    e.preventDefault();
  });
});

// ********** JS Hover Effects **********
articleHeaders.forEach(function (articleHeader) {
  //Select Elements
  const labelBtn = articleHeader.querySelector(".radio-btn-container");
  const pledgeTitle = articleHeader.querySelector(".flex-section > h4");
  //Event Listeners
  labelBtn.addEventListener('mouseenter', addHoverEffect);
  labelBtn.addEventListener('mouseleave', removeHoverEffect);
  pledgeTitle.addEventListener('mouseenter', addHoverEffect);
  pledgeTitle.addEventListener('mouseleave', removeHoverEffect);
  //Hover Effects
  function addHoverEffect () {
    labelBtn.classList.add("pledge-btn-hover");
    pledgeTitle.classList.add("pledge-header-title");
  }
  function removeHoverEffect () {
    labelBtn.classList.remove("pledge-btn-hover");
    pledgeTitle.classList.remove("pledge-header-title");
  }
});

// ********** Modal Overlay **********
openBtn.addEventListener('click', function (e) {
  e.preventDefault();
  openModal();
  modalContainer.scrollTop = 0;
});
closeModalBtn.addEventListener('click', closeModal);

//Open Modal
function openModal () {
  modalOverlay.classList.add("show-modal-overlay");
  document.body.style.overflow = "hidden";
}

//Close Modal
function closeModal () {
  modalOverlay.classList.remove("show-modal-overlay");
  document.body.style.overflow = "auto";
}

// ********** Bookmark **********
bookmark.addEventListener('click', function () {
  if (!bookmark.classList.contains('bookmarked')) {
    bookmark.classList.add("bookmarked");
    btnText.textContent = "bookmarked!";
    tooltipText.innerHTML = "Bookmarked!";
    sessionStorage.setItem("bookmark", "bookmarked");
  }
  else {
    bookmark.classList.remove("bookmarked");
    btnText.textContent = "bookmark";
    tooltipText.innerHTML = "Bookmark";
    sessionStorage.removeItem("bookmark");
  }
});

// ********** Pledges Section **********
radioBtns.forEach(function(radioBtn) {
  radioBtn.addEventListener('click', function (e) {
    const pledgeArticle = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
    radioBtns.forEach(function (item) {
      const itemArticle = item.parentElement.parentElement.parentElement.parentElement;
      if (itemArticle !== pledgeArticle) {
        itemArticle.classList.remove("show-pledge-selection");
      }
    });
  pledgeArticle.classList.add("show-pledge-selection");
  });
});

// ********** Select Reward **********
selectBtns.forEach(function (selectBtn) {
  selectBtn.addEventListener('click', function (e) {
    e.preventDefault();
    openModal();
    const id = e.currentTarget.getAttribute("id").slice(3);
    const element = document.getElementById(id);
    setTimeout(function() {
      element.scrollIntoView();
    }, 250);
  });
});

// ********** Forms Validation **********
forms.forEach(function (form) {
  const amount = form.querySelector("#amount");
  const attrVal = parseInt(amount.getAttribute("value"));
  const pledgeBtn = form.querySelector(".pledge-btn");
  const errorMessage = form.querySelector("#error-message");
  let tempAmount = 0;
  let tempBackers = 0;
  amount.addEventListener('keyup', function () {
    const value = parseInt(amount.value);
    if (value < attrVal || isNaN(value)) {
      errorMessage.innerHTML = `Please enter a value no less than $${attrVal}`;
      pledgeBtn.disabled = true;
      pledgeBtn.classList.add("disabled-btn");
    }
    else {
      errorMessage.innerHTML = '';
      pledgeBtn.disabled = false;
      pledgeBtn.classList.remove("disabled-btn");
    }
  });
  amount.addEventListener('blur', function () {
    const value = parseInt(amount.value);
    if (pledgeBtn.classList.contains("disabled-btn") || isNaN(value) || value < attrVal) {
      amount.value = attrVal;
      errorMessage.innerHTML = '';
      pledgeBtn.disabled = false;
      pledgeBtn.classList.remove("disabled-btn");
    }
  });
  //submit pledge
  pledgeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    validatePledgeBtn();
    totalAmount.innerHTML = '$' + tempAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    totalBackers.innerHTML = tempBackers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    progressBar.style.width = progressWidth + '%';
    const btnParent = e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    btnParent.querySelector(".radio-btn-container > input").checked = false;
    btnParent.classList.remove("show-pledge-selection");
    const pledgesLeft = btnParent.querySelector(".single-pledge-section h3");
    const pledgeIDs = document.querySelectorAll(".single-pledge-card h2");
    pledgeIDs.forEach(function (pledgeID) {
      if (pledgesLeft && pledgeID.innerHTML === pledgesLeft.innerHTML) {
        pledgesLeft.innerHTML = parseInt(pledgesLeft.innerHTML) - 1;
        pledgeID.innerHTML = parseInt(pledgeID.innerHTML) - 1;
      }
      if (pledgesLeft && pledgesLeft.innerHTML === "0" && pledgeID.innerHTML === "0") {
        const pledgeIDParent = pledgeID.parentElement.parentElement.parentElement;
        pledgeIDParent.classList.add("hide-pledge-card");
        btnParent.classList.add("hide-pledge-section");
      }
    });
  });
  function validatePledgeBtn () {
    const value = parseInt(amount.value);
    tempAmount = parseInt(totalAmount.innerHTML.slice(1).split(",").join("")) + value;
    tempBackers = parseInt(totalBackers.innerHTML.split(",").join("")) + 1;
    progressWidth = ((tempAmount / 100000) * 100);
    closeModal();
    showSuccessModal();
  }
});
//success modal
successBtn.addEventListener('click', removeSuccessModal);

function showSuccessModal () {
  successModal.classList.add("show-success-modal");
  document.body.style.overflow = "hidden";
}

function removeSuccessModal () {
  successModal.classList.remove("show-success-modal");
  document.body.style.overflow = "auto";
  //Session Storage
  sessionStorage.setItem("amountValue", totalAmount.innerHTML);
  sessionStorage.setItem("backers", totalBackers.innerHTML);
  sessionStorage.setItem("progressBarWidth", JSON.stringify(progressWidth));
  sessionStorage.setItem("hideCard", "hide-pledge-card");
  sessionStorage.setItem("hideSection", "hide-pledge-section");
  let nums = [...document.querySelectorAll(".pledges-left > h2")];
  const numsArr = [nums[0].innerHTML, nums[1].innerHTML, nums[2].innerHTML];
  sessionStorage.setItem("numsArr", JSON.stringify(numsArr));
  //End of Session Storage
}

// ********** Days Left Setup **********
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
//let futureDate = new Date(2022, 10, 19, 11, 30, 0);
const futureDate = new Date(tempYear, tempMonth, tempDay + 57, 21, 19, 0);
const futureTime = futureDate.getTime();

function getRemainingDays () {
  const today = new Date().getTime();
  const difference = futureTime - today;
  
  const oneDay = 24 * 60 * 60 * 1000;
  let days = Math.floor(difference / oneDay);
  totalDays.innerHTML = days;
  if (difference < 1) {
    clearInterval(countdown);
    totalDaysContainer.innerHTML = `<h2>CLOSED</h2>`;
    selectBtns.forEach(function (btn) {
      btn.disabled = true;
    });
    openBtn.disabled = true;
  }
}
//Countdown
let countdown = setInterval(getRemainingDays, 1000);
getRemainingDays();
