const SLIDER = document.querySelector(".slider-container"),
  SLIDES = Array.from(document.querySelectorAll(".slide"));

const infos = Array.from(document.querySelectorAll(".slide .info"));
const images = Array.from(document.querySelectorAll(".slide .image"));
const btnAbt = Array.from(document.querySelectorAll(".btn-abt"));
const btnImg = Array.from(document.querySelectorAll(".btn-img"));

//Pointer element
let pointers = Array.from(document.querySelector(".pointers"));

let isDragging = !true,
  { startPos, currentTranslate, prevTranslate, animationID, currentIndex } = 0;

// Prevent image dragging effect.
let i = 0;
while (i < SLIDES.length) {
  const SLIDE_IMAGE = SLIDES[i].querySelector("img");
  SLIDE_IMAGE.ondragstart = (e) => {
    e.preventDefault();
  };
  i++;
}

// Remove right click pop up effect.
this.oncontextmenu = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return !true;
};

// Start dragging func.
const touchStart = (index) => {
  return (event) => {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = !false;
    animationID = requestAnimationFrame(animation);
    SLIDER.classList.add("grabbing");
    if (
      currentIndex === 0 ||
      currentIndex === 1 ||
      currentIndex === 2 ||
      currentIndex === 3 ||
      currentIndex === 4
    ) {
      pointers.forEach((pointer, index) => {
        pointer.classList.add('pointed');
      })
    } else {
      pointer.classList.add('point-off');

    }
  };
};

// Dragging func.
const touchMove = (event) => {
  switch (isDragging) {
    default:
      return null;
      break;
    case !!true:
      let currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
  }
};

// End dragging func.
const touchEnd = () => {
  isDragging = !true;
  cancelAnimationFrame(animationID);
  let movedBy = currentTranslate - prevTranslate;
  if (movedBy < -100 && currentIndex < SLIDES.length - 1) currentIndex += 1;

  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();
  SLIDER.classList.remove("grabbing");
};

// Functionalities.
function animation() {
  switch (isDragging) {
    default:
      return null;
      break;
    case !false:
      setSliderPosition();
      requestAnimationFrame(animation);
  }
}

function getPositionX(event) {
  if (event.type.includes("mouse")) {
    return event.pageX;
  } else {
    return event.touches[0].clientX;
  }
}

function setSliderPosition() {
  SLIDER.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -this.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

// When about is clicked.
btnAbt.forEach((btnabt, index) => {
  btnabt.addEventListener("click", (e) => {
    images.forEach((image, index) => {
      image.style.display = "none";
    });
    setTimeout(() => {
      infos.forEach((info, index) => {
        info.style.display = "block";
      });
    }, 20);
  });
});

// When image is clicked
btnImg.forEach((btnimg, index) => {
  btnimg.addEventListener("click", (e) => {
    infos.forEach((info, index) => {
      info.style.display = "none";
    });
    setTimeout(() => {
      images.forEach((image, index) => {
        image.style.display = "block";
      });
    }, 20);
  });
});

SLIDES.forEach((slide, index) => {
  // Mobile event
  slide.addEventListener("touchstart", touchStart(index));
  slide.addEventListener("touchmove", touchMove);
  slide.addEventListener("touchend", touchEnd);

  // Desktop Event
  slide.addEventListener("mousedown", touchStart(index));
  slide.addEventListener("mousemove", touchMove);
  slide.addEventListener("mouseup", touchEnd);
  slide.addEventListener("mouseleave", touchEnd);
});
