document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const nextButton = document.querySelector(".control.next");
  const prevButton = document.querySelector(".control.previous");
  const dots = document.querySelectorAll(".slider-dots .dot");
  const productCards = document.querySelectorAll(".product-card");

  // Tomamos el ancho de UNA tarjeta (asumiendo que todas miden lo mismo).
  // Esto hace que al avanzar, se mueva justo el ancho de una tarjeta.
  const cardWidth = productCards[0].offsetWidth;

  let currentIndex = 0;
  let autoSlideInterval;

  const updateSlider = () => {
    const offset = currentIndex * cardWidth; 
    sliderWrapper.scrollTo({
      left: offset,
      behavior: "smooth",
    });

    // Actualiza la clase "active" en los dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  };

  const goToNextSlide = () => {
    // Al usar la aritmética modular nos aseguramos de que después
    // del último índice se regrese al inicio (bucle infinito).
    currentIndex = (currentIndex + 1) % productCards.length;
    updateSlider();
  };

  const goToPreviousSlide = () => {
    // Igual que arriba, pero en sentido contrario.
    currentIndex = (currentIndex - 1 + productCards.length) % productCards.length;
    updateSlider();
  };

  const startAutoSlide = () => {
    // Cambia de tarjeta cada 3 segundos (3000ms).
    autoSlideInterval = setInterval(goToNextSlide, 3000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  // Eventos para botones de navegación (Next/Prev)
  nextButton.addEventListener("click", () => {
    stopAutoSlide();   // Pausa el auto-slide
    goToNextSlide();
    startAutoSlide();  // Reanuda el auto-slide
  });

  prevButton.addEventListener("click", () => {
    stopAutoSlide();
    goToPreviousSlide();
    startAutoSlide();
  });

  // Eventos para los dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoSlide();
      currentIndex = index;
      updateSlider();
      startAutoSlide();
    });
  });

  // Pausar y reiniciar auto-slide al pasar el mouse
  sliderWrapper.addEventListener("mouseover", stopAutoSlide);
  sliderWrapper.addEventListener("mouseout", startAutoSlide);

  // Inicializa el auto-slide y posiciona el slider en la primera tarjeta
  startAutoSlide();
  updateSlider();
});

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      // Si se ha hecho scroll más de 80px
      nav.classList.add('scrolled');
    } else {
      // Si estamos en la parte superior
      nav.classList.remove('scrolled');
    }
  });
});
