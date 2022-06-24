const weatherForm = document.querySelector(".weatherForm");
const search = document.querySelector(".weatherForm__search");
const errorMessage = document.querySelector("#message-1");
const dataMessage = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  dataMessage.textContent = "";
  errorMessage.textContent = "";

  dataMessage.textContent = "Loading...";
  fetch(
    "http://localhost:3000/weather?address=" + encodeURIComponent(location)
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        dataMessage.textContent = "";
        errorMessage.textContent = data.error;
      } else {
        errorMessage.textContent = "";
        dataMessage.textContent = data.location + " --- " + data.forecast;
      }
      search.value = "";
    });
  });
});
