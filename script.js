const apiBase = "https://api.sunrisesunset.io/json";
const fetchBtn = document.getElementById("fetchBtn");
const select = document.getElementById("locationSelect");
const errorMessage = document.getElementById("errorMessage");

fetchBtn.addEventListener("click", () => {
  const value = select.value;
  if (!value) return;

  const [lat, lng] = value.split(",");
  errorMessage.textContent = "";

  const today = new Date().toISOString().split("T")[0];
  const tomorrowDate = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  fetchData(lat, lng, today, "todayData");
  fetchData(lat, lng, tomorrowDate, "tomorrowData");
});

function fetchData(lat, lng, date, elementId) {
  const url = `${apiBase}?lat=${lat}&lng=${lng}&date=${date}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.status !== "OK") {
        throw new Error("API error: " + data.status);
      }
      renderData(data.results, elementId);
    })
    .catch(err => {
      errorMessage.textContent = "Error fetching data. Please try again.";
      console.error(err);
    });
}

function renderData(data, elementId) {
  const el = document.getElementById(elementId);
  el.innerHTML = `
    <div><strong>Sunrise:</strong> ${data.sunrise}</div>
    <div><strong>Sunset:</strong> ${data.sunset}</div>
    <div><strong>Dawn:</strong> ${data.dawn}</div>
    <div><strong>Dusk:</strong> ${data.dusk}</div>
    <div><strong>Day Length:</strong> ${data.day_length}</div>
    <div><strong>Solar Noon:</strong> ${data.solar_noon}</div>
    <div><strong>Time Zone:</strong> ${data.timezone}</div>
  `;
}
