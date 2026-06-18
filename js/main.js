(function () {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = navMenu?.querySelectorAll("a") ?? [];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ——— Navbar ——— */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    navToggle?.classList.remove("is-open");
    navMenu?.classList.remove("is-open");
    header?.classList.remove("is-menu-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Abrir menú");
    document.body.style.overflow = "";
  }

  navToggle?.addEventListener("click", () => {
    const open = navMenu?.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", open);
    header?.classList.toggle("is-menu-open", !!open);
    navToggle.setAttribute("aria-expanded", String(!!open));
    navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.style.overflow = open ? "hidden" : "";
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  /* ——— Scroll reveal ——— */
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ——— 3D Tilt Cards (FreeFrontend-style) ——— */
  function initTiltCards() {
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll(".tilt-card");
    const maxTilt = 8;

    cards.forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.setProperty("--tilt-x", `${rotateX}deg`);
        card.style.setProperty("--tilt-y", `${rotateY}deg`);
        card.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`);
        card.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`);
        card.classList.add("is-tilting");
      });

      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        card.classList.remove("is-tilting");
      });
    });
  }

  initTiltCards();

  /* ——— Magnetic buttons ——— */
  function initMagneticButtons() {
    if (prefersReducedMotion) return;

    document.querySelectorAll(".magnetic-btn").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener("pointerleave", () => {
        btn.style.transform = "";
      });
    });
  }

  initMagneticButtons();

  /* ——— Contadores animados ——— */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = `${prefix}${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  }

  /* ——— Partículas flotantes en "Sobre nosotros" ——— */
  const particlesContainer = document.getElementById("about-particles");
  if (particlesContainer && !prefersReducedMotion) {
    const PARTICLE_COUNT = 16;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement("span");
      p.style.left = `${Math.random() * 100}%`;
      p.style.setProperty("--size", `${4 + Math.random() * 7}px`);
      p.style.setProperty("--duration", `${9 + Math.random() * 10}s`);
      p.style.setProperty("--delay", `${-Math.random() * 19}s`);
      p.style.setProperty("--drift", `${Math.round(-40 + Math.random() * 80)}px`);
      particlesContainer.appendChild(p);
    }
  }

  /* ——— Estrellas en la sección de contacto ——— */
  const starsContainer = document.getElementById("contact-stars");
  if (starsContainer && !prefersReducedMotion) {
    const STAR_COUNT = 45;
    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement("span");
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty("--star-size", `${(1 + Math.random() * 1.8).toFixed(1)}px`);
      star.style.setProperty("--twinkle-duration", `${(2 + Math.random() * 4).toFixed(1)}s`);
      star.style.setProperty("--twinkle-delay", `${(-Math.random() * 6).toFixed(1)}s`);
      starsContainer.appendChild(star);
    }
  }

  /* ——— Categorías de viaje ——— */
  const TAGS_HINT = "Lo más común · consultanos por más destinos";

  const CATEGORIES = [
    {
      id: "playa",
      name: "Playa",
      desc: "Sol, arena blanca y mar turquesa. Diseñamos escapadas a resorts y costas paradisíacas del mundo.",
      image: "assets/carrusel/Playa.jpg",
      tags: ["Maldivas", "Caribe", "Riviera Maya", "Polinesia"],
      cta: "Consultar viajes de playa",
    },
    {
      id: "exoticos",
      name: "Exóticos",
      desc: "Destinos fuera de lo común con culturas fascinantes, paisajes únicos y experiencias que transforman.",
      image: "assets/carrusel/Exotico.jpg",
      tags: ["Safari", "Islas remotas", "Selva", "Auroras"],
      cta: "Consultar viajes exóticos",
    },
    {
      id: "asia",
      name: "Asia",
      desc: "Templos milenarios, gastronomía de clase mundial y metrópolis futuristas en un solo continente.",
      image: "assets/carrusel/Asia.jpg",
      tags: ["Japón", "China", "Tailandia", "Bali"],
      cta: "Consultar viajes a Asia",
    },
    {
      id: "europa",
      name: "Europa",
      desc: "Arte, historia y elegancia. Recorridos a medida por las ciudades y paisajes más icónicos del viejo continente.",
      image: "assets/carrusel/Europa.jpg",
      tags: ["Ciudades históricas", "Gastronomía", "Arte y cultura", "Paisajes"],
      cta: "Consultar viajes a Europa",
    },
    {
      id: "medio-oriente",
      name: "Medio Oriente",
      desc: "Lujo desértico, arquitectura imponente y hospitalidad legendaria en los destinos más exclusivos.",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      tags: ["Dubái", "Marruecos", "Omán", "Jordania"],
      cta: "Consultar viajes al Medio Oriente",
    },
    {
      id: "eeuu",
      name: "EEUU",
      desc: "De costa a costa: parques nacionales, ciudades vibrantes y road trips inolvidables.",
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
      tags: ["Nueva York", "California", "Hawái", "Florida"],
      cta: "Consultar viajes a EEUU",
    },
    {
      id: "eventos",
      name: "Eventos y Deportes",
      desc: "Viví la emoción en vivo: finales, torneos, festivales y eventos globales con logística premium.",
      image: "assets/carrusel/Eventos y Deportes.jpg",
      tags: ["Fútbol", "Fórmula 1", "Tenis", "Conciertos"],
      cta: "Consultar eventos y deportes",
    },
    {
      id: "grupales",
      name: "Grupales",
      desc: "Viajes en grupo con itinerarios cuidados, guías expertos y la mejor compañía para compartir aventuras.",
      image: "assets/carrusel/Grupales.jpg",
      tags: ["Amigos", "Empresas", "Clubes", "Familia extendida"],
      cta: "Consultar viajes grupales",
    },
    {
      id: "nacionales",
      name: "Nacionales",
      desc: "Descubrí la belleza de Argentina: Patagonia, Cuyo, Litoral y destinos locales con encanto propio.",
      image: "assets/carrusel/Nacionales.jpg",
      tags: ["Bariloche", "Iguazú", "Mendoza", "Salta"],
      cta: "Consultar viajes nacionales",
    },
    {
      id: "latam",
      name: "Destinos Latam",
      desc: "América Latina en su máxima expresión: playas, montañas, cultura viva y gastronomía inigualable.",
      image: "assets/carrusel/LATAM.png",
      tags: ["Perú", "Colombia", "Chile", "Brasil"],
      cta: "Consultar destinos Latam",
    },
  ];

  const accordion = document.getElementById("categories-accordion");

  const WHATSAPP_NUMBER = "5493513677000";

  function buildWhatsAppLink(cat) {
    const message =
      `¡Hola Luxentia! 👋 Me interesa la categoría *${cat.name}*. ` +
      `Me gustaría recibir asesoramiento personalizado para mi próximo viaje. ¿Me ayudan?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function renderAccordion() {
    if (!accordion) return;

    CATEGORIES.forEach((cat, index) => {
      const item = document.createElement("article");
      item.className = `cat-item${index === 0 ? " is-active" : ""}`;
      item.style.backgroundImage = `url("${cat.image}")`;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cat-item__btn";
      btn.setAttribute("aria-expanded", index === 0 ? "true" : "false");
      btn.setAttribute("aria-label", `Ver categoría ${cat.name}`);
      btn.addEventListener("click", () => {
        activateItem(index);
        startAutoAdvance();
      });
      item.appendChild(btn);

      const num = document.createElement("span");
      num.className = "cat-item__num";
      num.textContent = String(index + 1).padStart(2, "0");
      item.appendChild(num);

      const name = document.createElement("span");
      name.className = "cat-item__name";
      name.textContent = cat.name;
      item.appendChild(name);

      const body = document.createElement("div");
      body.className = "cat-item__body";

      const label = document.createElement("span");
      label.className = "cat-item__label";
      label.textContent = "Categoría";
      body.appendChild(label);

      const title = document.createElement("h3");
      title.className = "cat-item__title";
      title.textContent = cat.name;
      body.appendChild(title);

      const desc = document.createElement("p");
      desc.className = "cat-item__desc";
      desc.textContent = cat.desc;
      body.appendChild(desc);

      const tags = document.createElement("div");
      tags.className = "cat-item__tags";
      cat.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.className = "cat-item__tag";
        span.textContent = tag;
        tags.appendChild(span);
      });
      const hint = document.createElement("span");
      hint.className = "cat-item__tags-hint";
      hint.textContent = TAGS_HINT;
      tags.appendChild(hint);
      body.appendChild(tags);

      const cta = document.createElement("a");
      cta.className = "cat-item__cta";
      cta.href = buildWhatsAppLink(cat);
      cta.target = "_blank";
      cta.rel = "noopener noreferrer";
      cta.append(cat.cta, " ");
      const arrow = document.createElement("span");
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "→";
      cta.appendChild(arrow);
      body.appendChild(cta);

      item.appendChild(body);
      accordion.appendChild(item);
    });
  }

  let activeCatIndex = 0;
  let autoAdvanceTimer = null;

  function activateItem(index) {
    if (!accordion) return;
    activeCatIndex = index;
    accordion.querySelectorAll(".cat-item").forEach((item, i) => {
      item.classList.toggle("is-active", i === index);
      item
        .querySelector(".cat-item__btn")
        ?.setAttribute("aria-expanded", i === index ? "true" : "false");
    });
  }

  /* Avance automático cada 3 segundos */
  function startAutoAdvance() {
    stopAutoAdvance();
    if (prefersReducedMotion) return;
    autoAdvanceTimer = setInterval(() => {
      activateItem((activeCatIndex + 1) % CATEGORIES.length);
    }, 3000);
  }

  function stopAutoAdvance() {
    if (autoAdvanceTimer) {
      clearInterval(autoAdvanceTimer);
      autoAdvanceTimer = null;
    }
  }

  renderAccordion();

  if (accordion) {
    /* Pausa cuando el mouse está encima, retoma al salir */
    accordion.addEventListener("pointerenter", stopAutoAdvance);
    accordion.addEventListener("pointerleave", startAutoAdvance);

    /* Solo avanza cuando la sección está a la vista */
    if ("IntersectionObserver" in window) {
      const accordionObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startAutoAdvance();
          } else {
            stopAutoAdvance();
          }
        },
        { threshold: 0.25 }
      );
      accordionObserver.observe(accordion);
    } else {
      startAutoAdvance();
    }
  }

  /* ——— Formulario de contacto ——— */
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const nombre = formData.get("nombre")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const mensaje = formData.get("mensaje")?.toString().trim();

    if (!nombre || !email || !mensaje) {
      formStatus.textContent = "Completá los campos obligatorios.";
      formStatus.className = "contact__form-status is-error";
      return;
    }

    const subject = encodeURIComponent(`Consulta Luxentia Travel — ${nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${formData.get("telefono") || "—"}\nTipo de viaje: ${formData.get("tipo") || "—"}\n\n${mensaje}`
    );

    window.location.href = `mailto:luxentiatravell@gmail.com?subject=${subject}&body=${body}`;

    formStatus.textContent = "¡Gracias! Se abrirá tu cliente de correo para enviar la consulta.";
    formStatus.className = "contact__form-status is-success";
    contactForm.reset();
  });

  /* ——— Año en footer ——— */
  const footerYear = document.getElementById("footer-year");
  if (footerYear) footerYear.textContent = String(new Date().getFullYear());
})();
