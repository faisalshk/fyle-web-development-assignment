const formContainer = document.querySelector(".form-container");
const openForm = document.querySelector(".openForm");
const closeBtn = document.getElementById("closeForm");
const overlay = document.querySelector(".overlay");

const lists = document.querySelectorAll(".list");
const projectList = document.querySelector(".project-list");
const projectImg = document.querySelector(".project-img img");

const loader = document.querySelector(".loader");

const contactBtn = document.querySelector(".contact-btn");

const carousel = document.querySelector(".carousel");
const dots = document.querySelectorAll(".dots img");
const cardsPerGroup = 2;
const cardWidth = carousel.querySelector(".card").offsetWidth;

// Function to update the current dot based on scroll position
function updateDots() {
  const scrollPosition = carousel.scrollLeft;
  const groupIndex = Math.floor(scrollPosition / (cardWidth * cardsPerGroup));

  dots.forEach((dot) => dot.classList.remove("current-dot"));
  if (dots[groupIndex]) {
    dots[groupIndex].classList.add("current-dot");
  }
}

// Function to handle dot click and scroll to the corresponding group
function handleDotClick(event) {
  const dotIndex = parseInt(event.target.getAttribute("data-index"), 10);
  const scrollToPosition = dotIndex * cardWidth * cardsPerGroup;
  carousel.scrollTo({ left: scrollToPosition, behavior: "smooth" });
}

// Add scroll event listener to the carousel
carousel.addEventListener("scroll", updateDots);

// Add click event listeners to dots
dots.forEach((dot) => dot.addEventListener("click", handleDotClick));

// Initialize dots on load
updateDots();

// form submission
const form = document.getElementById("form");
form.addEventListener("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  fetch("https://getform.io/f/nbdozoga", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      contactBtn.classList.add("hidden");
      loader.classList.remove("hidden");
      if (response.ok) {
        loader.classList.add("hidden");
        contactBtn.classList.remove("hidden");
        e.target.reset();
        formContainer.classList.add("hidden");
        overlay.classList.add("hidden");
      } else {
        // Handle errors if needed
        console.error("Form submission failed:", response.statusText);
      }
    })
    .catch((error) => console.log(error));
}

const open = function () {
  formContainer.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const close = () => {
  formContainer.classList.add("hidden");
  overlay.classList.add("hidden");
};

openForm.addEventListener("click", open);

closeBtn.addEventListener("click", close);

overlay.addEventListener("click", close);

//change project Image
projectList.addEventListener("click", function (e) {
  const listClicked = e.target.closest(".list");
  console.log(listClicked);

  if (!listClicked) return;

  lists.forEach((list) => {
    list.classList.remove("current");
  });

  listClicked.classList.add("current");

  // setTimeout(() => {}, 100);

  if (listClicked.dataset.img == "1") {
    projectImg.src = "./assets/japan2.jpg";
  }

  if (listClicked.dataset.img == "2") {
    projectImg.src = "./assets/image.png";
  }

  if (listClicked.dataset.img == "3") {
    projectImg.src = "./assets/japan.jpg";
  }
});
