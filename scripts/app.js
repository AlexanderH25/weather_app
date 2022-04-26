//DOM MANIPULATION
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
//From Forecast constructor 
const forecast = new Forecast();

const updateUI = (data) => {
    const cityDets = data.cityDets;
    const weather = data.weather;

    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${Math.round(weather.Temperature.Metric.Value)}</span>
        <span>&deg;C</span>
    </div>
    `
    // update icons
    const iconSrc = `icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'icons/day.svg' : 'icons/night.svg';
    time.setAttribute('src', timeSrc)


    // remove the d-none class if present
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();
    //get city value from the input
    const city = cityForm.city.value.trim(); 
    cityForm.reset();

    //Update UI
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
        // storing the recent value from the user input in the localStorage
        localStorage.setItem('city', city);      
    });

    
    if(localStorage.getItem('city')) {
        forecast.updateCity(localStorage.getItem('city'))
            .then(data => updateUI(data))
            .catch(err => console.log(err));
    }

    