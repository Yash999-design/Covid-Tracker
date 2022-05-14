const form = document.getElementById("form");
const dateList = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let countryName = document.getElementById("countries").value;
  let firstDate = new Date(document.getElementById("first-date").value);
  let lastDate = new Date(document.getElementById("last-date").value);

  if (firstDate > lastDate) {
    alert("Wrong Input");
  }

  let firstDay = ("0" + firstDate.getDate()).slice(-2);
  let firstMonth = ("0" + (firstDate.getMonth() + 1)).slice(-2);
  let firstYear = firstDate.getFullYear();
  let lastDay = ("0" + lastDate.getDate()).slice(-2);
  let lastMonth = ("0" + (lastDate.getMonth() + 1)).slice(-2);
  let lastYear = lastDate.getFullYear();
  let customizedDate1 =
    firstYear + "-" + firstMonth + "-" + firstDay + "T00:00:00Z";
  let customizedDate2 =
    lastYear + "-" + lastMonth + "-" + lastDay + "T00:00:00Z";

  getapi(
    `https://api.covid19api.com/country/${countryName}?from=${customizedDate1}&to=${customizedDate2}`
  );
  for (
    firstDate;
    firstDate <= lastDate;
    firstDate.setDate(firstDate.getDate() + 1)
  ) {
    let currentDate = new Date(firstDate).toLocaleString().split(",")[0];
    dateList.push(currentDate);
  }
});

async function getapi(url) {
  // Storing response
  fetch(url)
    .then((response) => response.json())
    .then((user) => {
      console.log(user);
      showData(user);
    });
}

// getapi(ourUrl);

function showData(givenValue) {
  const confirmedCase = [];
  const activeCase = [];
  const totalDeaths = [];

  givenValue.map((value) => {
    activeCase.push(value.Active);
    confirmedCase.push(value.Confirmed);
    totalDeaths.push(value.Deaths);
  });

  new Chart("myChart", {
    type: "line",
    data: {
      labels: dateList,
      datasets: [
        {
          // data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
          data: confirmedCase,
          borderColor: "blue",
          fill: false,
          label: "Confirmed Cases",
        },
        {
          // data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
          data: activeCase,
          borderColor: "green",
          fill: false,
          label: "Active Cases",
        },
        {
          // data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
          data: totalDeaths,
          borderColor: "red",
          fill: false,
          label: "Total Deaths",
        },
      ],
    },
    options: {
      legend: { display: true },
    },
  });
}

showData();
