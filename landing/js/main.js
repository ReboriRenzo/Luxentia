(function () {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = navMenu?.querySelectorAll("a") ?? [];

  /* Navbar sólida al hacer scroll */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menú móvil */
  function closeMenu() {
    navToggle?.classList.remove("is-open");
    navMenu?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  navToggle?.addEventListener("click", () => {
    const open = navMenu?.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(!!open));
    document.body.style.overflow = open ? "hidden" : "";
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  /* Parallax suave en la imagen del hero */
  const heroImage = document.querySelector(".hero__image");
  const hero = document.querySelector(".hero");

  if (heroImage && hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener(
      "scroll",
      () => {
        const rect = hero.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
          heroImage.style.transform = `scale(${1.06 - progress * 0.04}) translateY(${progress * 30}px)`;
        }
      },
      { passive: true }
    );
  }

  /* Animación al entrar en "Sobre nosotros" */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
})();
