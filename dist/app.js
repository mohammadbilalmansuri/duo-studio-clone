const lenis = new Lenis();
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
lenis.on("scroll", ScrollTrigger.update);

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ------------ Cursor ------------

const cursor = document.querySelector("#cursor");
gsap.set(cursor, { xPercent: -50, yPercent: -50 });

window.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    duration: 0.3,
    x: e.clientX,
    y: e.clientY,
    opacity: 1,
    ease: "back.out(2)",
  });
});

const allMedia = document.querySelectorAll("video, img");

allMedia.forEach((media) => {
  media.addEventListener("mouseenter", () => {
    cursor.innerHTML = "Studio";
    cursor.classList.replace("size-4", "px-2");
  });

  media.addEventListener("mouseleave", () => {
    cursor.innerHTML = "";
    cursor.classList.replace("px-2", "size-4");
  });
});

// ------------- Background Color Change ---------------

function setupScrollTrigger(trigger, start, end, onEnter, onLeaveBack) {
  ScrollTrigger.create({
    trigger,
    start,
    end,
    scroller: "body",
    scrub: true,
    toggleActions: "play none none reverse", // toggleActions: "action1 action2 action3 action4"
    // action1: Animation starts (enters viewport)
    // action2: Animation ends (leaves viewport)
    // action3: Animation re-enters (enters from bottom)
    // action4: Animation reverses (scrolls back past start)
    onEnter,
    onLeaveBack,
  });
}

setupScrollTrigger(
  "#section2",
  "top 75%",
  "top 75%",
  () => {
    document.body.classList.replace("bg-black", "bg-white");
    document.body.classList.replace("text-white", "text-black");
  },
  () => {
    document.body.classList.replace("bg-white", "bg-black");
    document.body.classList.replace("text-black", "text-white");
  }
);

setupScrollTrigger(
  "#section4",
  "top bottom",
  "top bottom",
  () => {
    document.body.classList.replace("bg-white", "bg-black");
    document.body.classList.replace("text-black", "text-white");
    const button = document.querySelector("#section3 button");
    button.classList.remove(
      "bg-transparent",
      "border-black",
      "hover:bg-pink",
      "hover:border-pink"
    );
    button.classList.add(
      "bg-pink",
      "text-black",
      "border-pink",
      "hover:bg-white",
      "hover:border-white"
    );
  },
  () => {
    document.body.classList.replace("bg-black", "bg-white");
    document.body.classList.replace("text-white", "text-black");
    const button = document.querySelector("#section3 button");
    button.classList.remove(
      "bg-pink",
      "text-black",
      "border-pink",
      "hover:bg-white",
      "hover:border-white"
    );
    button.classList.add(
      "bg-transparent",
      "border-black",
      "hover:bg-pink",
      "hover:border-pink"
    );
  }
);

// -------------------- Section 1 ------------------------

gsap.from("#section1 h1 span:nth-child(1), #section1 h1 span:nth-child(2)", {
  rotate: -7,
  opacity: 0,
  duration: 1,
});

gsap.from("#section1 video", {
  y: 100,
  duration: 1,
});

gsap.to("#section1 h1", {
  width: "100%",
  scrollTrigger: {
    trigger: "#section1",
    scroller: "body",
    start: "top top",
    end: "top -25%",
    scrub: 1,
  },
});

gsap.to("#section1 video", {
  scale: 1,
  scrollTrigger: {
    trigger: "#section1",
    scroller: "body",
    start: "top -20%",
    end: "top -60%",
    scrub: 1,
  },
});

// -------------------- Section 2 & 3 ---------------------

gsap.from("#section2 h3, #section2 h2, #section2 p, #section2 button", {
  y: 100,
  opacity: 0,
  duration: 0.75,
  stagger: 0.2,
  scrollTrigger: {
    trigger: "#section2",
    scroller: "body",
    start: "top 60%",
    end: "top 60%",
  },
});

gsap.from("#section3 h2, #section3 .work, #section3 .cta", {
  y: 100,
  opacity: 0,
  duration: 0.75,
  stagger: 0.5,
  scrollTrigger: {
    trigger: "#section3",
    scroller: "body",
    start: "top 60%",
    end: "top 60%",
  },
});

// ------------ section 4 --------------

gsap.from("#section4 h4, #section4 h2", {
  y: 100,
  opacity: 0,
  duration: 0.75,
  stagger: 0.3,
  scrollTrigger: {
    trigger: "#section4",
    scroller: "body",
    start: "top center",
    end: "top center",
  },
});

const titles = document.querySelectorAll(".titles h2");
const leftImages = document.querySelectorAll(".left-images img");
const rightImages = document.querySelectorAll(".right-images img");

titles.forEach((title) => {
  const imgIndex = parseInt(title.id.split("-")[1] - 1);

  title.addEventListener("mouseenter", () => {
    leftImages[imgIndex].classList.remove(
      "opacity-0",
      "pointer-events-none",
      "-rotate-6"
    );
    rightImages[imgIndex].classList.remove(
      "opacity-0",
      "pointer-events-none",
      "rotate-6"
    );
  });

  title.addEventListener("mouseleave", () => {
    leftImages[imgIndex].classList.add(
      "opacity-0",
      "pointer-events-none",
      "-rotate-6"
    );
    rightImages[imgIndex].classList.add(
      "opacity-0",
      "pointer-events-none",
      "rotate-6"
    );
  });
});

// --------------- section 5 ---------------
gsap.from("#section5 h2, #section5 button, .clients", {
  y: 100,
  opacity: 0,
  duration: 0.75,
  stagger: 0.3,
  scrollTrigger: {
    trigger: "#section5",
    scroller: "body",
    start: "top center",
    end: "top center",
  },
});

const clients = document.querySelectorAll(".client");

clients.forEach((client) => {
  client.addEventListener("mouseenter", () => {
    cursor.classList.remove("size-4", "rounded-full", "mix-blend-difference");
    cursor.classList.add("w-96", "h-64", "object-cover", "object-center");
    cursor.style.backgroundImage = `url(${client.getAttribute("data-image")})`;
  });

  client.addEventListener("mouseleave", () => {
    cursor.style.backgroundImage = "none";
    cursor.classList.remove("w-96", "h-64", "object-cover", "object-center");
    cursor.classList.add("size-4", "rounded-full", "mix-blend-difference");
  });
});

// ----------- Magnetic effect ------------

const magnetize = (
  element,
  maxDistance = 100,
  duration = 0.75,
  easing = "power2.out"
) => {
  element.addEventListener("mousemove", (e) => {
    const bounds = element.getBoundingClientRect(); // Get the current bounding rectangle of the element
    const centerY = bounds.top + bounds.height / 2; // Calculate the center Y coordinate of the element
    const centerX = bounds.left + bounds.width / 2; // Calculate the center X coordinate of the element

    const deltaX = e.clientX - centerX; // Calculate the cursor's X distance from the center of the element
    const deltaY = e.clientY - centerY; // Calculate the cursor's Y distance from the center of the element
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY); // Calculate the distance from the cursor to the center of the element

    let scale = 1;

    // If the cursor is within the maxDistance, calculate the scale effect
    if (distance < maxDistance) {
      scale = 1 + 0.2 * (1 - distance / maxDistance);
    }

    gsap.to(element, {
      x: 0.5 * deltaX,
      y: 0.5 * deltaY,
      scale: scale,
      ease: easing,
      duration: duration,
    });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      scale: 1,
      ease: "elastic.out(1, 0.3)",
      duration: duration,
    });
  });
};

if (window.innerWidth > 1080) {
  document.querySelectorAll(".magnetic").forEach((button) => {
    magnetize(button);
  });
}

ScrollTrigger.refresh();
