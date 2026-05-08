/* ============================================================
   NS Panicker Chartered Accountants — Premium Website Scripts
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
     NAVBAR SCROLL EFFECT
     ============================================================ */
  const navbar = document.getElementById("navbar");

  const handleNavbar = () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  handleNavbar();
  window.addEventListener("scroll", handleNavbar);

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");

    const expanded =
      hamburger.getAttribute("aria-expanded") === "true";

    hamburger.setAttribute("aria-expanded", !expanded);
  });

  navItems.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* ============================================================
     ACTIVE NAV LINK ON SCROLL
     ============================================================ */
  const sections = document.querySelectorAll("section[id]");

  const activateNav = () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", activateNav);

  /* ============================================================
     SCROLL REVEAL ANIMATIONS
     ============================================================ */
  const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  /* ============================================================
     COUNTER ANIMATION
     ============================================================ */
  const counters = document.querySelectorAll(".stat-number");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          const counter = entry.target;
          const target = +counter.dataset.target;

          let current = 0;
          const increment = target / 120;

          const updateCounter = () => {
            current += increment;

            if (current < target) {
              counter.innerText = Math.floor(current).toLocaleString();
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target.toLocaleString();
            }
          };

          updateCounter();

          counterObserver.unobserve(counter);
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  /* ============================================================
     TESTIMONIAL SLIDER
     ============================================================ */
  const track = document.getElementById("testimonialsTrack");
  const slides = document.querySelectorAll(".testi-card");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("sliderDots");

  let currentSlide = 0;
  let autoSlide;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");

    if (index === 0) {
      dot.classList.add("active");
    }

    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

    dot.addEventListener("click", () => {
      goToSlide(index);
    });

    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  const updateSlider = () => {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
  };

  const goToSlide = (index) => {
    currentSlide = index;
    updateSlider();
    resetAutoSlide();
  };

  const nextSlide = () => {
    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    updateSlider();
  };

  const prevSlide = () => {
    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    updateSlider();
  };

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  // Auto slide
  const startAutoSlide = () => {
    autoSlide = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlide);
    startAutoSlide();
  };

  startAutoSlide();

  /* ============================================================
     TOUCH SWIPE SUPPORT
     ============================================================ */
  let startX = 0;
  let endX = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", () => {

    const diff = startX - endX;

    if (diff > 50) {
      nextSlide();
    }

    if (diff < -50) {
      prevSlide();
    }
  });

  /* ============================================================
     BACK TO TOP BUTTON
     ============================================================ */
  const backToTop = document.getElementById("backToTop");

  const toggleBackToTop = () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", toggleBackToTop);

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  /* ============================================================
     CONTACT FORM
     ============================================================ */
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !phone || !email) {
      alert("Please fill in all required fields.");
      return;
    }

    // Fake loading effect
    const submitBtn = contactForm.querySelector("button");

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span>Sending...</span>
    `;

    setTimeout(() => {
      contactForm.style.display = "none";
      formSuccess.style.display = "block";
    }, 1200);
  });

  /* ============================================================
     PARALLAX HERO BLOBS
     ============================================================ */
  const blobs = document.querySelectorAll(".hero-blob");

  window.addEventListener("mousemove", (e) => {

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    blobs.forEach((blob, index) => {

      const speed = (index + 1) * 18;

      const moveX = (x - 0.5) * speed;
      const moveY = (y - 0.5) * speed;

      blob.style.transform = `
        translate(${moveX}px, ${moveY}px)
      `;
    });
  });

  /* ============================================================
     CURRENT YEAR
     ============================================================ */
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

});