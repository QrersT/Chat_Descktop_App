let btnClose = document.getElementById("right-panel__close-btn");
let rightPanel = document.getElementById("right-panelJs");
let chat = document.getElementById("chat");

btnClose.onclick = function () {
  rightPanel.classList.toggle("active");
  btnClose.classList.toggle("active");
  chat.classList.toggle("active-right");
};

let nav = document.getElementById("nav");
let firstChannel = document.getElementById("left-panel__group1");

firstChannel.onclick = function () {
  nav.classList.toggle("active");
  firstChannel.classList.toggle("active");
  chat.classList.toggle("active-left");
};

function notification() {
  let notification = document.querySelector(".notification");
  let notificationList = document.querySelector(".notification__wrapper");
  let cross = document.querySelector(".notification__cross");
  /* let crossActive = document.querySelector(".notification__cross.active"); */

  notification.onclick = function () {
    notificationList.classList.toggle("active");
    cross.classList.toggle("active");
  };
  cross.onclick = function () {
    notificationList.classList.toggle("active");
    /* crossActive.classList.toggle("active"); */
  };
  document.onclick = function (e) {
    if (
      e.target.closest(".notification__list") === null &&
      e.target.closest(".notification") === null
    ) {
      notificationList.classList.remove("active");
      /* crossActive.classList.remove("active"); */
    }
  };
}

notification();

function addFavourite() {
  let starBtn = document.querySelector(".star__btn");

  starBtn.addEventListener("click", function () {
    starBtn.classList.toggle("active");
  });
}

addFavourite();

function smilepanel() {
  let iconSmile = document.querySelector(".icon-smile");
}
