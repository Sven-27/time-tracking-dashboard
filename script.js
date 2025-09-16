const timeframe = document.querySelector('.timeframe');
const daily = document.getElementById('daily');
const weekly = document.getElementById('weekly');
const monthly = document.getElementById('monthly');
const statsDaily = document.getElementById('stats-daily');
const statsWeekly = document.getElementById('stats-weekly');
const statsMonthly = document.getElementById('stats-monthly');
const statsWrapper = document.querySelector('.stats-wrapper');
const stats = document.querySelectorAll('.stats');
const url = "./data.json";

timeframe.addEventListener('click', (e) => {
  const target = e.target;
  if (target.id === 'daily') {
    daily.classList.add('active');
    weekly.classList.remove('active');
    monthly.classList.remove('active');
    stats.forEach(stat => {
      if (stat.classList.contains('stats-daily')) {
        stat.classList.remove('hide');
        stat.classList.add('show');
      } else {
        stat.classList.remove('show');
        stat.classList.add('hide');
      }
    });
  } else if (target.id === 'weekly') {
    daily.classList.remove('active');
    weekly.classList.add('active');
    monthly.classList.remove('active');
    stats.forEach(stat => {
      if (stat.classList.contains('stats-weekly')) {
        stat.classList.remove('hide');
        stat.classList.add('show');
      }
      else {
        stat.classList.remove('show');
        stat.classList.add('hide');
      }
    });
  } else if (target.id === 'monthly') {
    daily.classList.remove('active');
    weekly.classList.remove('active');
    monthly.classList.add('active');
    stats.forEach(stat => {
      if (stat.classList.contains('stats-monthly')) {
        stat.classList.remove('hide');
        stat.classList.add('show');
      } else {
        stat.classList.remove('show');
        stat.classList.add('hide');
      }
    });
  }
});

function showStats(statsData) {
  statsWrapper.innerHTML = statsData.map((item, i) => {
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
        <div id="stats-daily" class="stats stats-daily show">
          <p class="current text-preset-1">${item.timeframes.daily.current}hrs</p>
          <p class="previous text-preset-6">
            Yesterday - ${item.timeframes.daily.previous}hrs
          </p>
        </div>
        <div id="stats-weekly" class="stats stats-weekly hide">
          <p class="current text-preset-1">${item.timeframes.weekly.current}hrs</p>
          <p class="previous text-preset-6">
            Last Week - ${item.timeframes.weekly.previous}hrs
          </p>
        </div>
        <div id="stats-monthly" class="stats stats-monthly hide">
          <p class="current text-preset-1">${item.timeframes.monthly.current}hrs</p>
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
