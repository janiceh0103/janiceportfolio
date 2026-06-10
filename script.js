const header = document.querySelector(".site-header");
const menuToggle = document.querySelector("#menu-toggle");

const albumModal = document.querySelector("#album-modal");
const modalTitle = document.querySelector("#modal-title");
const slideTrack = document.querySelector("#slide-track");
const slideImgs = document.querySelectorAll(".slide-img");
const modalCaption = document.querySelector("#modal-caption");
const modalDots = document.querySelector("#modal-dots");
const closeBtn = document.querySelector(".modal-close");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

const albums = {
  campus: {
    title: "嘉大黑白光影紀事",
    photos: [
      {
        src: "https://github.com/janiceh0103/janiceportfolio/blob/main/photo/1133839-1.jpeg?raw=true",
        caption: "嘉大黑白光影紀事｜作品 01"
      },
      {
        src: "https://github.com/janiceh0103/janiceportfolio/blob/main/photo/1133839-4.jpeg?raw=true",
        caption: "嘉大黑白光影紀事｜作品 02"
      },
      {
        src: "https://github.com/janiceh0103/janiceportfolio/blob/main/photo/1133839-7.jpeg?raw=true",
        caption: "嘉大黑白光影紀事｜作品 03"
      },
      {
        src: "https://github.com/janiceh0103/janiceportfolio/blob/main/photo/1133839-6.jpeg?raw=true",
        caption: "嘉大黑白光影紀事｜作品 04"
      },
      {
        src: "https://github.com/janiceh0103/janiceportfolio/blob/main/photo/1133839-9.jpeg?raw=true",
        caption: "嘉大黑白光影紀事｜作品 05"
      }
    ]
  },

  flower: {
    title: "花影生長",
    photos: [
      {
        src: "https://github.com/janiceh0103/janiceportfolio/blob/main/photo/IMG_6500.JPG?raw=true",
        caption: "花影生長｜作品 01"
      },
      {
        src: "https://github.com/janiceh0103/janiceportfolio/blob/main/photo/IMG_6477.jpg?raw=true",
        caption: "花影生長｜作品 02"
      },
      {
        src: "https://github.com/janiceh0103/janiceportfolio/blob/main/photo/IMG_6497.JPG?raw=true",
        caption: "花影生長｜作品 03"
      },
      {
        src: "https://github.com/janiceh0103/janiceportfolio/blob/main/photo/IMG_6490.jpg?raw=true",
        caption: "花影生長｜作品 04"
      },
      {
        src: "https://github.com/janiceh0103/janiceportfolio/blob/main/photo/IMG_6501.JPG?raw=true",
        caption: "花影生長｜作品 05"
      }
    ]
  },

  window: {
    title: "鐵窗花綻放",
    photos: [
      {
        src: "https://github.com/janiceh0103/janiceportfolio/blob/main/photo/IMG_8273.JPG?raw=true",
        caption: "鐵窗花綻放｜作品 01"
      },
      {
        src: "https://github.com/janiceh0103/janiceportfolio/blob/main/photo/IMG_8242.jpg?raw=true",
        caption: "鐵窗花綻放｜作品 02"
      },
      {
        src: "https://github.com/janiceh0103/janiceportfolio/blob/main/photo/IMG_8113.JPG?raw=true",
        caption: "鐵窗花綻放｜作品 03"
      },
      {
        src: "https://github.com/janiceh0103/janiceportfolio/blob/main/photo/IMG_8399.jpg?raw=true",
        caption: "鐵窗花綻放｜作品 04"
      },
      {
        src: "https://github.com/janiceh0103/janiceportfolio/blob/main/photo/IMG_8487.JPG?raw=true",
        caption: "鐵窗花綻放｜作品 05"
      }
    ]
  }
};

let currentAlbumKey = "campus";
let currentIndex = 0;
let slideTimer = null;
let isSliding = false;

const SLIDE_INTERVAL = 5000;
const SLIDE_TIME = 650;

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", function () {
  const albumHashes = ["#campus", "#flower", "#window"];

  if (albumHashes.includes(location.hash)) {
    history.replaceState(null, "", location.pathname + location.search);
    window.scrollTo(0, 0);
  }

  setAlbumCovers();
});

function setAlbumCovers() {
  document.querySelectorAll(".open-album").forEach(function (card) {
    const albumKey = card.dataset.album;
    const cover = card.querySelector(".album-cover");

    if (!cover || !albums[albumKey] || !albums[albumKey].photos[0]) return;

    cover.style.backgroundImage = "url('" + albums[albumKey].photos[0].src + "')";
  });
}

function flashCollection(target) {
  target.classList.remove("is-flashing");
  void target.offsetWidth;
  target.classList.add("is-flashing");
}

function scrollToCollection(target) {
  const headerHeight = header ? header.offsetHeight : 0;
  const extraSpace = 36;

  const targetTop =
    target.getBoundingClientRect().top +
    window.pageYOffset -
    headerHeight -
    extraSpace;

  window.scrollTo({
    top: targetTop,
    behavior: "smooth"
  });

  const distance = Math.abs(window.pageYOffset - targetTop);
  const waitTime = Math.min(900, Math.max(420, distance / 2.8));

  setTimeout(function () {
    flashCollection(target);
  }, waitTime);
}

document.querySelectorAll(".orbit-jump").forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    if (menuToggle) {
      menuToggle.checked = false;
    }

    scrollToCollection(target);
  });
});

document.querySelectorAll(".collection-target").forEach(function (card) {
  card.addEventListener("animationend", function () {
    this.classList.remove("is-flashing");
  });
});

/* 漢堡選單點擊後自動收合 */
document.querySelectorAll(".menu a").forEach(function (menuLink) {
  menuLink.addEventListener("click", function () {
    if (menuToggle) {
      menuToggle.checked = false;
    }
  });
});

function preloadImage(src) {
  return new Promise(function (resolve) {
    const img = new Image();

    img.onload = function () {
      resolve(img);
    };

    img.onerror = function () {
      resolve(img);
    };

    img.src = src;
  });
}

function setSliderAspect(img) {
  const slider = document.querySelector(".slider");

  if (!slider || !img.naturalWidth || !img.naturalHeight) return;

  const aspectText = img.naturalWidth + " / " + img.naturalHeight;
  const aspectNumber = img.naturalWidth / img.naturalHeight;

  slider.style.setProperty("--slide-aspect", aspectText);
  slider.style.setProperty("--slide-ratio", aspectNumber);

  albumModal.classList.remove("is-portrait", "is-landscape");

  if (aspectNumber < 1) {
    albumModal.classList.add("is-portrait");
  } else {
    albumModal.classList.add("is-landscape");
  }
}

function renderDots() {
  const album = albums[currentAlbumKey];

  modalDots.innerHTML = "";

  album.photos.forEach(function (item, index) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "modal-dot";
    dot.setAttribute("aria-label", "切換到第 " + (index + 1) + " 張");

    if (index === currentIndex) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", function () {
      if (index === currentIndex) return;

      const direction = index > currentIndex ? 1 : -1;
      slideTo(index, direction, true);
    });

    modalDots.appendChild(dot);
  });
}

async function setSingleSlide(index) {
  const album = albums[currentAlbumKey];
  const photo = album.photos[index];

  const loadedImg = await preloadImage(photo.src);
  setSliderAspect(loadedImg);

  slideTrack.classList.add("no-transition");
  slideTrack.style.transform = "translateX(0)";

  slideImgs[0].src = photo.src;
  slideImgs[0].alt = photo.caption;

  slideImgs[1].src = photo.src;
  slideImgs[1].alt = photo.caption;

  modalTitle.textContent = album.title;
  modalCaption.textContent = photo.caption;

  renderDots();

  requestAnimationFrame(function () {
    slideTrack.classList.remove("no-transition");
  });
}

async function slideTo(nextIndex, direction, resetTimer) {
  const album = albums[currentAlbumKey];
  const total = album.photos.length;
  const newIndex = (nextIndex + total) % total;

  if (isSliding || newIndex === currentIndex) return;

  isSliding = true;

  const currentPhoto = album.photos[currentIndex];
  const nextPhoto = album.photos[newIndex];

  const loadedNextImg = await preloadImage(nextPhoto.src);

  slideTrack.classList.add("no-transition");

  if (direction > 0) {
    slideImgs[0].src = currentPhoto.src;
    slideImgs[0].alt = currentPhoto.caption;

    slideImgs[1].src = nextPhoto.src;
    slideImgs[1].alt = nextPhoto.caption;

    slideTrack.style.transform = "translateX(0)";
  } else {
    slideImgs[0].src = nextPhoto.src;
    slideImgs[0].alt = nextPhoto.caption;

    slideImgs[1].src = currentPhoto.src;
    slideImgs[1].alt = currentPhoto.caption;

    slideTrack.style.transform = "translateX(-50%)";
  }

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      slideTrack.classList.remove("no-transition");

      if (direction > 0) {
        slideTrack.style.transform = "translateX(-50%)";
      } else {
        slideTrack.style.transform = "translateX(0)";
      }
    });
  });

  setTimeout(function () {
    currentIndex = newIndex;
    setSliderAspect(loadedNextImg);
    setSingleSlide(currentIndex);
    isSliding = false;

    if (resetTimer) {
      restartAutoSlide();
    }
  }, SLIDE_TIME + 40);
}

function startAutoSlide() {
  stopAutoSlide();

  slideTimer = setInterval(function () {
    slideTo(currentIndex + 1, 1, false);
  }, SLIDE_INTERVAL);
}

function stopAutoSlide() {
  if (slideTimer) {
    clearInterval(slideTimer);
    slideTimer = null;
  }
}

function restartAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

function openAlbum(albumKey) {
  currentAlbumKey = albumKey;
  currentIndex = 0;
  isSliding = false;

  setSingleSlide(currentIndex);

  albumModal.showModal();
  startAutoSlide();
}

function closeAlbum() {
  stopAutoSlide();
  albumModal.close();
}

function showPrevPhoto() {
  slideTo(currentIndex - 1, -1, true);
}

function showNextPhoto() {
  slideTo(currentIndex + 1, 1, true);
}

document.querySelectorAll(".open-album").forEach(function (card) {
  card.addEventListener("click", function () {
    const albumKey = this.dataset.album;
    openAlbum(albumKey);
  });

  card.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      const albumKey = this.dataset.album;
      openAlbum(albumKey);
    }
  });
});

closeBtn.addEventListener("click", closeAlbum);
prevBtn.addEventListener("click", showPrevPhoto);
nextBtn.addEventListener("click", showNextPhoto);

albumModal.addEventListener("click", function (e) {
  if (e.target === albumModal) {
    closeAlbum();
  }
});

document.addEventListener("keydown", function (e) {
  if (!albumModal.open) return;

  if (e.key === "ArrowLeft") {
    showPrevPhoto();
  }

  if (e.key === "ArrowRight") {
    showNextPhoto();
  }

  if (e.key === "Escape") {
    closeAlbum();
  }
});