const mainContainer = document.getElementById("main-container");
const imagesContainer = document.getElementById("images");
const loader = document.getElementById("loader");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const containers = document.getElementsByClassName("img-container");
const closeBtn = document.getElementById("closeButton");
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");

let loading = false;

getPhotos();

function show(element) {
  element.style.display = "block";
}
function hide(element) {
  element.style.display = "none";
}
function createImgTag(image) {
  const img = document.createElement("img");
  img.src = image.urls.small;
  img.alt = createAlt(image);
  img.id = image.id;
  img.addEventListener("click", openModal);
  return img;
}

function enable(element) {
  element.disabled = false;
}
function disable(element) {
  element.disabled = true;
}

function getPhotos() {
  /**  Ovo je developer unsplash sa ogranicenjem od 50 upita po satu, ovaj ispod u kodu nema ogranicenja * /
    fetch("https://api.unsplash.com/photos/random?count=10", {
    method: 'GET',
        headers: {
        'Authorization': 'Client-ID wg3fcFxezYfrl1MPuWDmZfgKT16sM5a4SOhpBi2Zw0U'
    }*/
  if (loading) return;
  loading = true;

  show(loader);
  fetch("https://apis.scrimba.com/unsplash/photos/random?count=12")
    .then(function (response) {
      return response.json();
    })
    .then(function (images) {
      images.forEach(function (image) {
        imagesContainer.appendChild(createImgTag(image));
      });
    })
    .then(function () {
      hide(loader);
      loading = false;
    });
}

function createAlt(imageObj) {
  
  return imageObj.alt_description ? imageObj.alt_description : "Unsplash image";
}

function openModal() {
  let id = this.id;

  show(loader);

  fetch(`https://apis.scrimba.com/unsplash/photos/${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (image) {
      modalContent.innerHTML = `<div class="img-area">
        <img src="${image.urls.full}" alt="${createAlt(image)}">
    </div>
    <div class="img-description"><strong>${createAlt(image)}</strong></div>
    <div class="img-info">
        <div class="photographer">
            <p>Photographer: <strong>${image.user.username}</strong></p>
            <img src="${image.user.profile_image.small}" alt="${
        image.user.username
      }"></div>
        
        <div class="likes"><i class="fa-solid fa-heart"></i> ${
          image.likes
        }</div>
        <div class="downloads"><i class="fa-solid fa-download"></i> ${
          image.downloads
        }</div>
        <a href="${image.user.links.portfolio}">Portfolio</a>
        <a href="https://www.instagram.com/${createLink(
          image.user.social.instagram_username
        )}><i class="fa-brands fa-instagram"></i></a>
        <a href="https://www.twitter.com/${createLink(
          image.user.social.twitter_username
        )}><i class="fa-brands fa-twitter"></i></a>
        <a href="${image.links.download}" class="downLink">Click to download</a>
    </div>`;
      hide(loader);
      show(modal);
    });
}

closeBtn.onclick = function () {
  hide(modal);
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

function createLink(property) {
  lnk = property;
  if (lnk) {
    return lnk + '"';
  } else {
    return lnk + '"' + 'class="disabled"';
  }
}

gridBtn.addEventListener("click", function () {
  enable(listBtn);
  disable(gridBtn);
  imagesContainer.className = imagesContainer.className.replace(
    "list-view",
    "grid-view"
  );
});

listBtn.addEventListener("click", function () {
  enable(gridBtn);
  disable(listBtn);
  imagesContainer.className = imagesContainer.className.replace(
    "grid-view",
    "list-view"
  );
  
});

window.addEventListener("scroll", function () {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    getPhotos();
  }
});
