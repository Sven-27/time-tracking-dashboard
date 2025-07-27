const timeframe = document.querySelector('.timeframe');
const daily = document.getElementById('daily');
const weekly = document.getElementById('weekly');
const monthly = document.getElementById('monthly');
const stats = document.querySelector('.stats-wrapper');
const url = "./data.json";

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
      console.log("test")
    }
  )
    .catch(error => console.error('There was a problem with the fetch operation:', error));
