const app = new DataController(new DataService(), new DataView());

const FAB = document.querySelector(".btn__action");

FAB.addEventListener("click", (e) => {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.classList.toggle("active");
  });
});
