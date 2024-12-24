import "./template.css";
const imageContext = require.context(
  "./images",
  false,
  /\.(jpg|jpeg|png|gif)$/
);

// dropdown

const dropdownBtn = document.getElementById("dropdown");
dropdownBtn.addEventListener("click", () => {
  const menuDisplayDiv = document.getElementById("menu");
  menuDisplayDiv.style.display =
    menuDisplayDiv.style.display == "none" ? "flex" : "none";
});

// carousel

const imgFiles = imageContext.keys();

const imgContainer = document.getElementById("carousel-slide-container");
const slideNavigationContainer = document.getElementById("slide-navigation");

let visibleKey = 0;
let i = 0;

for (let imgFile of imgFiles) {
  const img = document.createElement("img");
  img.id = i;
  img.src = imageContext(imgFile);
  img.style.display = "none";
  imgContainer.appendChild(img);
  i = i + 1;
}

function renderImg(index, visibility) {
  console.log(index);
  const visibleImg = document.getElementById(index);
  visibleImg.style.display = visibility;
}

const carouselLeftBtn = document.getElementById("carousel-left");
const carouselRightBtn = document.getElementById("carousel-right");

carouselLeftBtn.addEventListener("click", () => {
  renderImg(visibleKey, "none");
  visibleKey = visibleKey - 1;
  if (visibleKey < 0) {
    visibleKey = imgFiles.length - 1;
  }
  renderImg(visibleKey, "flex");
});

carouselRightBtn.addEventListener("click", () => {
  renderImg(visibleKey, "none");
  visibleKey = visibleKey + 1;
  if (visibleKey == imgFiles.length) {
    visibleKey = 0;
  }
  renderImg(visibleKey, "flex");
});

for (let i = 0; i < imgFiles.length; i++) {
  const slideNavigationBtn = document.createElement("button");
  slideNavigationBtn.textContent = ".";
  slideNavigationBtn.addEventListener("click", () => {
    renderImg(visibleKey, "none");
    visibleKey = i;
    renderImg(visibleKey, "flex");
  });

  slideNavigationContainer.appendChild(slideNavigationBtn);
}

renderImg(visibleKey, "flex");
