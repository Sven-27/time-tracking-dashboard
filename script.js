const timeframe = document.querySelector('.timeframe');
const daily = document.getElementById('daily');
const weekly = document.getElementById('weekly');
const monthly = document.getElementById('monthly');
const stats = document.querySelector('.stats-wrapper');
const url = "./data.json";

function showStats(statsData) {
  stats.innerHTML = statsData.map((item, i) => {
    // console.log(`icon${i + 1}`)
    return `
    <div class="stats-container" >
      <div class="img-container" style="background-color: ${item.color}">
        <img class="icon${i + 1}" src="${item.icon}" alt="icon of topic">
      </div>
      <div class="stats-content content${i + 1}">
        <div class="stats-title">
          <p class="text-preset-5-medium">${item.title}</p>
          <img src="./images/icon-ellipsis.svg" alt="ellipsis icon">
        </div>
        <div id="stats-daily" class="stats daily">
          <p class="current text-preset-3">${item.timeframes.daily.current}hrs</p>
          <p class="previous text-preset-6">
            Yesterday - ${item.timeframes.daily.previous}hrs
          </p>
        </div>
        <div id="stats-weekly" class="stats weekly">
          <p class="current text-preset-3">${item.timeframes.weekly.current}hrs</p>
          <p class="previous text-preset-6">
            Last Week - ${item.timeframes.weekly.previous}hrs
          </p>
        </div>
        <div id="stats-monthly" class="stats monthly">
          <p class="current text-preset-3">${item.timeframes.monthly.current}hrs</p>
          <p class="previous text-preset-6">
            Last Month - ${item.timeframes.monthly.previous}hrs
          </p>
        </div>
      </div>       
    </div>`
  }).join('');
}

fetch(url, { 
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }})
    .then(response => {
        if (response.ok) {
            return response.json(); 
        } else {
            throw new Error('Network response was not ok'); 
        }
    })
    .then(data => {
    // Set initial stats to daily
      showStats(data);
    }
  )
    .catch(error => console.error('There was a problem with the fetch operation:', error));
