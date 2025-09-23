const statsWrapper = document.querySelector('.stats-wrapper');
const url = "./data.json";
const tabButtons = document.querySelectorAll(".tablink");
const tabContents = document.querySelectorAll(".tabcontent");

// Add event listeners to tab buttons
tabButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const statName = e.target.getAttribute("data-tab");
    openStat(e, statName);
  });
});

function openStat(evt, statName) {
   // Declare all variables
  let i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    if(tabcontent[i].getAttribute("data-content") === statName){
      tabcontent[i].style.display= "block";
    }
     else{
      tabcontent[i].style.display = "none";
    }
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  evt.currentTarget.className += " active";
}


function showStats(statsData) {
  statsWrapper.innerHTML = statsData.map((item, i) => {
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
        <div role="tabpanel" data-content="stats-daily" class="tabcontent stats stats-daily active">
          <p class="current text-preset-1">${item.timeframes.daily.current}hrs</p>
          <p class="previous text-preset-6">
            Yesterday - ${item.timeframes.daily.previous}hrs
          </p>
        </div>
        <div aria-hidden role="tabpanel" data-content="stats-weekly" class="tabcontent stats stats-weekly">
          <p class="current text-preset-1">${item.timeframes.weekly.current}hrs</p>
          <p class="previous text-preset-6">
            Last Week - ${item.timeframes.weekly.previous}hrs
          </p>
        </div>
        <div aria-hidden role="tabpanel" data-content="stats-monthly" class="tabcontent stats stats-monthly">
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
