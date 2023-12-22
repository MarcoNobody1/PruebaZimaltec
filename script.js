// Funciones reutilizables
function toggleMenu() {
  menuBurguer.classList.toggle("header__menuiconburguer--closed");
  menuCross.classList.toggle("header__menuiconcross--closed");
  nav.classList.toggle("header__nav--hidden");
}

function showMessage(title, text, icon) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
  });
}

// Eventos del DOM
document.addEventListener("DOMContentLoaded", function () {
  const menuBurguer = document.getElementById("menuBurguer");
  const menuCross = document.getElementById("menuCross");
  const nav = document.getElementById("nav");
  const header = document.querySelector(".header");

  // Eventos del menú desplegable
  menuBurguer.addEventListener("click", toggleMenu);
  menuCross.addEventListener("click", toggleMenu);

  // Evento de búsqueda en el header
  document.getElementById("search").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    const sections = document.querySelectorAll(".searcher");

    sections.forEach((section) => {
      const sectionText = section.textContent.toLowerCase();
      if (sectionText.includes(searchText)) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    });
  });

  // Evento de añadir productos al carrito
  let addToCartButtons = document.querySelectorAll(".products__recommended-products-card-button");
  let cartCounter = document.getElementById("cartCounter");
  let productCount = 0;

  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      productCount++;
      cartCounter.textContent = productCount + " products";
      showMessage("Product added", "", "success");
    });
  });

  // Evento de mostrar noticia completa en modal
  let buttonsReadAll = document.querySelectorAll(".news__latest-news-card-button");

  buttonsReadAll.forEach(function (button) {
    button.addEventListener("click", function (event) {
      showMessage("BREAKING NEWS!", "This is the news written in its entirety, projected in a modal", "info");
    });
  });

  // Evento de validar formulario de suscripción
  const form = document.getElementById("subscriptionForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    let subscribeCheckbox = document.getElementById("subscribeCheckbox");
    let subscribeInput = document.getElementById("subscribeinput");

    // Verifica el formato del email usando una expresión regular (regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(subscribeInput.value);

    if (!subscribeCheckbox.checked) {
      showMessage("Oops...", "Please agree to the terms and conditions before subscribing.", "error");
    } else if (!isEmailValid) {
      showMessage("Invalid Email", "Please enter a valid email address.", "error");
    } else {
      showMessage("Subscription Successful!", "Thank you for subscribing!", "success");
    }
  });
});
