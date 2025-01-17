(() => {
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  const mediaQuery = window.matchMedia("(min-width: 1080px)");

  const magnetize = (
    element,
    maxDistance = 100,
    duration = 0.75,
    easing = "power2.out"
  ) => {
    element.addEventListener("mousemove", (e) => {
      const bounds = element.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      let scale = 1;
      if (distance < maxDistance) {
        scale = 1 + 0.2 * (1 - distance / maxDistance);
      }

      gsap.to(element, {
        x: 0.5 * deltaX,
        y: 0.5 * deltaY,
        scale,
        ease: easing,
        duration,
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        scale: 1,
        ease: "elastic.out(1, 0.3)",
        duration,
      });
    });
  };

  const initCursorBasedEvents = () => {
    let cursor = document.querySelector("#cursor");

    const onMouseMove = (e) => {
      gsap.to(cursor, {
        duration: 0.3,
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        ease: "back.out(2)",
      });
    };

    if (mediaQuery.matches) {
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });
      window.addEventListener("mousemove", onMouseMove);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
    }

    document.querySelectorAll(".magnetic").forEach((button) => {
      if (mediaQuery.matches) {
        magnetize(button);
      } else {
        const clonedButton = button.cloneNode(true);
        button.replaceWith(clonedButton);
      }
    });

    const onMouseEnter = () => {
      cursor.innerHTML = "Studio";
      cursor.classList.replace("size-4", "px-2");
    };

    const onMouseLeave = () => {
      cursor.innerHTML = "";
      cursor.classList.replace("px-2", "size-4");
    };

    document.querySelectorAll("video, img").forEach((element) => {
      if (mediaQuery.matches) {
        element.removeEventListener("mouseenter", onMouseEnter);
        element.removeEventListener("mouseleave", onMouseLeave);
      } else {
        element.addEventListener("mouseenter", onMouseEnter);
        element.addEventListener("mouseleave", onMouseLeave);
      }
    });

    const titles = document.querySelectorAll(".titles h2");
    const leftImages = document.querySelectorAll(".left-images img");
    const rightImages = document.querySelectorAll(".right-images img");

    titles.forEach((title, index) => {
      const onMouseEnter = () => {
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
      };

      const onMouseLeave = () => {
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
      };

      if (mediaQuery.matches) {
        title.addEventListener("mouseenter", onMouseEnter);
        title.addEventListener("mouseleave", onMouseLeave);
      } else {
        title.removeEventListener("mouseenter", onMouseEnter);
        title.removeEventListener("mouseleave", onMouseLeave);
      }
    });

    const clients = document.querySelectorAll(".client");
    clients.forEach((client) => {
      const onMouseEnter = () => {
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
      };

      const onMouseLeave = () => {
        cursor.style.backgroundImage = "none";
        cursor.classList.remove(
          "w-96",
          "h-64",
          "rounded-xl",
          "object-cover",
          "object-center"
        );
        cursor.classList.add("size-4", "rounded-full", "mix-blend-difference");
      };

      if (mediaQuery.matches) {
        client.addEventListener("mouseenter", onMouseEnter);
        client.addEventListener("mouseleave", onMouseLeave);
      } else {
        client.removeEventListener("mouseenter", onMouseEnter);
        client.removeEventListener("mouseleave", onMouseLeave);
      }
    });
  };

  const setBackgroundChange = () => {
    ScrollTrigger.create({
      trigger: "#section2",
      start: "top 40%",
      end: "top 40%",
      scroller: "body",
      scrub: true,
      toggleActions: "play none none reverse",
      onEnter: () => document.documentElement.classList.remove("dark"),
      onLeaveBack: () => document.documentElement.classList.add("dark"),
    });

    ScrollTrigger.create({
      trigger: "#section4",
      start: "top 60%",
      end: "top 60%",
      scroller: "body",
      scrub: true,
      toggleActions: "play none none reverse",
      onEnter: () => document.documentElement.classList.add("dark"),
      onLeaveBack: () => document.documentElement.classList.remove("dark"),
    });
  };

  const setSectionsAnimations = () => {
    // Section 1
    gsap.from("#section1 h1", {
      y: -50,
      duration: 1,
    });

    gsap.from("#section1 video", {
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

  mediaQuery.addEventListener("change", () => {
    initCursorBasedEvents();
    ScrollTrigger.refresh();
  });

  initCursorBasedEvents();
  setSectionsAnimations();
  setBackgroundChange();
  ScrollTrigger.refresh();
})();
