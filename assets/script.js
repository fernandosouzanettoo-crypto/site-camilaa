// Número do WhatsApp: código do país + DDD + número, só dígitos (ex.: 5585999999999)
const WHATSAPP = "5585991034586";
const MENSAGEM = "Olá, Dra. Camila! Gostaria de agendar uma consulta.";

const linkWhatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAGEM)}`;
document.querySelectorAll(".js-whatsapp").forEach((link) => {
  link.href = linkWhatsapp;
  link.target = "_blank";
  link.rel = "noopener";
});

document.getElementById("ano").textContent = new Date().getFullYear();

// Menu do celular
const botaoMenu = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");
const fecharMenu = () => {
  menu.classList.remove("aberto");
  botaoMenu.setAttribute("aria-expanded", "false");
};
botaoMenu.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", String(aberto));
});
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", fecharMenu));

// Animação suave ao rolar
const alvos = document.querySelectorAll(
  ".intro__texto, .faixa .container > *, .boas-vindas__inner > *"
);
alvos.forEach((el) => el.classList.add("revelar"));
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.12 }
);
alvos.forEach((el) => observador.observe(el));
