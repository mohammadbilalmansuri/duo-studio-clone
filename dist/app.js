document.addEventListener("DOMContentLoaded", () => {
  // Prevent the browser from restoring the scroll position
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  // Scroll to the top before unloading the page
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  };

  // GSAP with scrolltrigger & lenis
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Cursor animation
  let cursor;
  const initializeCursor = () => {
    if (window.innerWidth > 1280) {
      cursor = document.querySelector("#cursor");
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

      document.querySelectorAll("video, img").forEach((element) => {
        element.addEventListener("mouseenter", () => {
          cursor.innerHTML = "Studio";
          cursor.classList.replace("size-4", "px-2");
        });
        element.addEventListener("mouseleave", () => {
          cursor.innerHTML = "";
          cursor.classList.replace("px-2", "size-4");
        });
      });
    }
  };

  // Background color change on scroll
  const changeBackgroundColor = (toWhite) => {
    document.body.classList.toggle("bg-white", toWhite);
    document.body.classList.toggle("bg-black", !toWhite);
    document.body.classList.toggle("text-black", toWhite);
    document.body.classList.toggle("text-white", !toWhite);
  };

  const calculateTriggerPoint = () => {
    if (window.innerWidth > 1920) return "top 60%";
    if (window.innerWidth > 1024) return "top 75%";
    if (window.innerWidth > 768) return "top 50%";
    return "top 40%";
  };

  const initializeScrollTriggers = () => {
    ScrollTrigger.create({
      trigger: "#section2",
      start: calculateTriggerPoint(),
      end: calculateTriggerPoint(),
      scroller: "body",
      scrub: true,
      toggleActions: "play none none reverse",
      onEnter: () => changeBackgroundColor(true),
      onLeaveBack: () => changeBackgroundColor(false),
    });

    ScrollTrigger.create({
      trigger: "#section4",
      start: "top 75%",
      end: "top 75%",
      scroller: "body",
      scrub: true,
      toggleActions: "play none none reverse",
      onEnter: () => changeBackgroundColor(false),
      onLeaveBack: () => changeBackgroundColor(true),
    });
  };

  // Sections animations
  const animateSections = () => {
    // Section 1
    gsap.from("#section1 h1", {
      opacity: 0,
      y: -50,
      duration: 1,
    });

    gsap.from("#section1 video", {
      opacity: 0,
      y: 50,
      duration: 1,
    });

    gsap.to("#section1 h1", {
      scale: 0.5,
      opacity: 50,
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
        start: "top top",
        end: "top -40%",
        scrub: 1,
      },
    });

    // Section 2
    gsap.from("#section2 h2, #section2 h3, #section2 p, #section2 button", {
      y: 100,
      opacity: 0,
      duration: 0.75,
      stagger: 0.25,
      scrollTrigger: {
        trigger: "#section2",
        scroller: "body",
        start: "top 75%",
        end: "top 75%",
      },
    });

    // Section 3
    gsap.from("#section3 h2, #section3 .work, #section3 .cta", {
      y: 100,
      opacity: 0,
      duration: 0.75,
      stagger: 0.75,
      scrollTrigger: {
        trigger: "#section3",
        scroller: "body",
        start: "top 75%",
        end: "top 75%",
      },
    });

    // Section 4
    gsap.from("#section4 h4, #section4 h2", {
      y: 100,
      opacity: 0,
      duration: 0.75,
      stagger: 0.3,
      scrollTrigger: {
        trigger: "#section4",
        scroller: "body",
        start: "top 75%",
        end: "top 75%",
      },
    });

    // Section 5
    gsap.from("#section5 h2, #section5 button, .clients", {
      y: 100,
      opacity: 0,
      duration: 0.75,
      stagger: 0.3,
      scrollTrigger: {
        trigger: "#section5",
        scroller: "body",
        start: "top 75%",
        end: "top 75%",
      },
    });
  };

  // Magnet effect
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

  const initializeInteractiveElements = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth > 680) {
      const titles = document.querySelectorAll(".titles h2");
      const leftImages = document.querySelectorAll(".left-images img");
      const rightImages = document.querySelectorAll(".right-images img");

      titles.forEach((title, index) => {
        title.addEventListener("mouseenter", () => {
          leftImages[index].classList.remove(
            "opacity-0",
            "pointer-events-none",
            "-rotate-6"
          );
          rightImages[index].classList.remove(
            "opacity-0",
            "pointer-events-none",
            "rotate-6"
          );
        });

        title.addEventListener("mouseleave", () => {
          leftImages[index].classList.add(
            "opacity-0",
            "pointer-events-none",
            "-rotate-6"
          );
          rightImages[index].classList.add(
            "opacity-0",
            "pointer-events-none",
            "rotate-6"
          );
        });
      });

      if (windowWidth > 1080) {
        document
          .querySelectorAll(".magnetic")
          .forEach((button) => magnetize(button));

        if (windowWidth > 1280) {
          const clients = document.querySelectorAll(".client");

          clients.forEach((client) => {
            client.addEventListener("mouseenter", () => {
              cursor.classList.remove(
                "size-4",
                "rounded-full",
                "mix-blend-difference"
              );
              cursor.classList.add(
                "w-96",
                "h-64",
                "rounded-xl",
                "object-cover",
                "object-center"
              );
              cursor.style.backgroundImage = `url(${client.getAttribute(
                "data-image"
              )})`;
            });

            client.addEventListener("mouseleave", () => {
              cursor.style.backgroundImage = "none";
              cursor.classList.remove(
                "w-96",
                "h-64",
                "rounded-xl",
                "object-cover",
                "object-center"
              );
              cursor.classList.add(
                "size-4",
                "rounded-full",
                "mix-blend-difference"
              );
            });
          });
        }
      }
    }
  };

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const onResize = () => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    initializeCursor();
    initializeScrollTriggers();
    initializeInteractiveElements();
  };

  initializeCursor();
  initializeScrollTriggers();
  animateSections();
  initializeInteractiveElements();
  ScrollTrigger.refresh();

  window.addEventListener("resize", debounce(onResize, 100));
});
