const timeframe = document.querySelector('.timeframe');
const daily = document.getElementById('daily');
const weekly = document.getElementById('weekly');
const monthly = document.getElementById('monthly');
const stats = document.querySelector('.stats-wrapper');
const url = "./data.json";

function showStats(statsData) {
  stats.innerHTML = statsData.map(item => `
    <div class="stats-container">
      <div class="stats-header" style="background-color: ${item.color}">
        <img src="${item.icon}" alt="icon of topic">
      </div>
      <div class="stats-content">
        <div class="stats-title">
          <p>${item.title}</p>
          <img src="./images/icon-ellipsis.svg" alt="ellipsis icon">
        </div>
        <div id="stats-daily class="stats-daily">
          <p class="current">${item.timeframes.daily.current}hrs</p>
          <p class="previous">
            Yesterday - ${item.timeframes.daily.previous}hrs
          </p>
        </div>
        <div id="stats-weekly class="stats-weekly">
          <p class="current">${item.timeframes.weekly.current}hrs</p>
          <p class="previous">
            Last Week - ${item.timeframes.weekly.previous}hrs
          </p>
        </div>
        <div id="stats-monthly class="stats-monthly">
          <p class="current">${item.timeframes.monthly.current}hrs</p>
          <p class="previous">
            Last Month - ${item.timeframes.monthly.previous}hrs
          </p>
        </div>
      </div>       
    </div>
  `
  )
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
      console.log(data)
      showStats(data);
    }
  )
    .catch(error => console.error('There was a problem with the fetch operation:', error));
