document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     MOBILES MENÜ (Burger)
     ========================= */
  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("open");
    });
  }

  /* =========================
     SLIDER: Eindrücke Ausstellung
     ========================= */

  var slider = document.getElementById("expo-slider");
  var slides = slider ? slider.querySelectorAll(".slide") : [];
  var dots = slider ? slider.querySelectorAll(".dot") : [];
  var currentSlide = 0;

  function goToSlide(index) {
    if (!slides.length) return;

    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }

    slides.forEach(function (slide) {
      slide.classList.remove("active");
    });
    dots.forEach(function (dot) {
      dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    if (dots[index]) {
      dots[index].classList.add("active");
    }

    currentSlide = index;
  }

  if (slider && slides.length) {
    var prevBtn = slider.querySelector(".slider-btn.prev");
    var nextBtn = slider.querySelector(".slider-btn.next");

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        goToSlide(currentSlide - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        goToSlide(currentSlide + 1);
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        var index = parseInt(dot.getAttribute("data-slide"), 10);
        goToSlide(index);
      });
    });
  }

  /* =========================
     LIGHTBOX / GROSSE GALERIE
     ========================= */

  var modal = document.getElementById("gallery-modal");
  var openBtn = document.getElementById("open-gallery");
  var mainImg = document.getElementById("lightbox-main-image");
  var thumbs = modal ? modal.querySelectorAll(".lightbox-grid img") : [];
  var closeBtn = modal ? modal.querySelector(".lightbox-close") : null;
  var prevModalBtn = modal ? modal.querySelector(".lightbox-btn.prev") : null;
  var nextModalBtn = modal ? modal.querySelector(".lightbox-btn.next") : null;
  var currentModalIndex = 0;

    function showPrevImage() {
    if (!thumbs.length) return;
    currentModalIndex = (currentModalIndex - 1 + thumbs.length) % thumbs.length;
    updateModalImage();
  }

  function showNextImage() {
    if (!thumbs.length) return;
    currentModalIndex = (currentModalIndex + 1) % thumbs.length;
    updateModalImage();
  }

  if (prevModalBtn) {
    prevModalBtn.addEventListener("click", showPrevImage);
  }

  if (nextModalBtn) {
    nextModalBtn.addEventListener("click", showNextImage);
  }

  // Auch mit Pfeiltasten steuerbar
  document.addEventListener("keydown", function (event) {
    if (modal.classList.contains("open")) {
      if (event.key === "ArrowLeft") {
        showPrevImage();
      } else if (event.key === "ArrowRight") {
        showNextImage();
      } else if (event.key === "Escape") {
        closeModal();
      }
    }
  });

  function updateModalImage() {
    if (!thumbs.length || !mainImg) return;

    var thumb = thumbs[currentModalIndex];
    if (!thumb) return;

    mainImg.src = thumb.src;
    mainImg.alt = thumb.alt || "Großansicht";

    thumbs.forEach(function (t) {
      t.classList.remove("active");
    });
    thumb.classList.add("active");
  }

  function openModal(startIndex) {
    if (!modal) return;

    if (typeof startIndex === "number") {
      currentModalIndex = startIndex;
    } else {
      currentModalIndex = 0;
    }

    updateModalImage();
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  // Button "Alle Bilder ansehen"
  if (openBtn && modal) {
    openBtn.addEventListener("click", function () {
      openModal(currentSlide); // startet mit dem Slide, der gerade sichtbar ist
    });
  }

  // Klick auf die Slides öffnet die Lightbox ebenfalls
  if (slider && modal && slides.length) {
    slides.forEach(function (slide, index) {
      slide.addEventListener("click", function () {
        openModal(index);
      });
    });
  }

  // Klick auf Thumbnails im Grid
  if (thumbs.length) {
    thumbs.forEach(function (thumb, index) {
      thumb.addEventListener("click", function () {
        currentModalIndex = index;
        updateModalImage();
      });
    });
  }

  // Schließen-Button oben rechts
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Klick auf den dunklen Hintergrund schließt ebenfalls
  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  // Escape-Taste schließt die Lightbox
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
    /* =========================
     Einfache Slider (Outdoor & Komplettlösungen)
     ========================= */

  function initSimpleSlider(containerId) {
    var s = document.getElementById(containerId);
    if (!s) return;

    var slides = s.querySelectorAll(".slide");
    var dots = s.querySelectorAll(".dot");
    var current = 0;

    function go(index) {
      if (!slides.length) return;

      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }

      slides.forEach(function (slide) {
        slide.classList.remove("active");
      });
      dots.forEach(function (dot) {
        dot.classList.remove("active");
      });

      slides[index].classList.add("active");
      if (dots[index]) {
        dots[index].classList.add("active");
      }

      current = index;
    }

    var prevBtn = s.querySelector(".slider-btn.prev");
    var nextBtn = s.querySelector(".slider-btn.next");

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        go(current - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        go(current + 1);
      });
    }

    dots.forEach(function (dot, index) {
      dot.addEventListener("click", function () {
        go(index);
      });
    });
  }

  // Outdoor-Slider und Komplettlösungen-Slider aktivieren
  initSimpleSlider("outdoor-slider");
  initSimpleSlider("complete-slider");

    /* =========================
     TEAM-MODAL (PERSONAL-FOTOS)
     ========================= */
  var teamCloseBtn = teamModal ? teamModal.querySelector(".team-close") : null;

  function openTeamModal() {
    if (!teamModal) return;
    teamModal.classList.add("open");
    teamModal.setAttribute("aria-hidden", "false");
  }

  function closeTeamModal() {
    if (!teamModal) return;
    teamModal.classList.remove("open");
    teamModal.setAttribute("aria-hidden", "true");
  }

  if (openTeamBtn && teamModal) {
    openTeamBtn.addEventListener("click", function () {
      openTeamModal();
    });
  }

  if (teamCloseBtn) {
    teamCloseBtn.addEventListener("click", function () {
      closeTeamModal();
    });
  }

  // Klick auf den dunklen Hintergrund schließt ebenfalls
  if (teamModal) {
    teamModal.addEventListener("click", function (event) {
      if (event.target === teamModal) {
        closeTeamModal();
      }
    });
  }

  // ESC schließt, wenn offen
  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      teamModal &&
      teamModal.classList.contains("open")
    ) {
      closeTeamModal();
    }
  });

});
