console.log('WeatherX - SNDP @AMVSEsoft \nPowered By - OpenWeatherMap.org \nDesign Idea - https://www.youtube.com/channel/UCtJPEZ7m_hEDgnITpzdL_qw');

var climate,climateObj,month,day;
let counter = 0;
let cty = '';
let ctry = '';

const successRegion = document.querySelectorAll('#successLabel')[0];

const date = new Date();
const monthStrs = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const regionForm = document.querySelectorAll('#regionForm')[0];
const regionInput = regionForm.querySelectorAll('#regionInput')[0];

const refreshIcon = document.querySelectorAll('#refreshIcon')[0];

const shutDownIcon = document.querySelectorAll('#shutDownIcon')[0];

const temperatureValue = document.querySelectorAll('#climatic-temp')[0];

const cloudValue = document.querySelectorAll('#climate')[0];

const descriptionValue = document.querySelectorAll('#sky')[0];
const reigionValue = document.querySelectorAll('#region')[0];

const monthValue = document.querySelectorAll('#month')[0];
const dayValue = document.querySelectorAll('#day')[0];

const windValue = document.querySelectorAll('#wind-val')[0];
const humidityValue = document.querySelectorAll('#humidity-val')[0];
const tempValue = document.querySelectorAll('#temp-val')[0];

regionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    counter = 0;
    
    if(regionInput.value.length != 0) {
        const userInput = regionInput.value.trim();
        const userInputArr = userInput.split(',');
        
        cty = userInputArr[0];
        ctry = userInputArr[1];

        getClimate(cty,ctry);
    }
});

refreshIcon.addEventListener('click', (e) => {
    e.preventDefault();

    cty = 'Polgolla';
    ctry = 'LK';

    regionInput.value = '';

    getClimate(cty,ctry);
});

const getClimate = (city,country) => {
    if(city === '' || country === '') {
        cty = '';
        ctry = '';       
    }

    const climateURL = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=9e60c6aa71d77f6bd004e7e74d5aefe4`;
    
    $.get(climateURL, (climateObj) => {
        climate = climateObj;
    })
    .done(function() {
        loadClimate(climate);
    })
    .fail(function() {
        successRegion.innerHTML = 'Region Not Found  ';
        setTimeout(() => successRegion.innerHTML = '', 4000);
        setTimeout(() => regionInput.value = '', 4000);
    });
}

const loadClimate = (climate) => {
    climateObj = climate;
    console.log(climateObj);

    // clouds
    cloudValue.innerHTML = `<img src="http://openweathermap.org/img/wn/${climateObj.weather[0].icon}@2x.png" alt="${climateObj.weather[0].description}">`;

    // temperature
    const temperature = climateObj.main.temp;
    tempCelcius = Math.ceil(temperature - 273.15);
    temperatureValue.innerHTML = `${tempCelcius}°`;

    // description
    const description = climateObj.weather[0].description;
    const desStrArr = description.split(' ');
    var des = '';
    desStrArr.forEach(word => {
        des += word.charAt(0).toUpperCase() + word.substring(1,word.length);
        des += ' ';
    });
    descriptionValue.innerHTML = des;

    // region
    const rCity = climateObj.name;
    const rCountry = climateObj.sys.country;
    const region = `${rCity} - ${rCountry}`;
    reigionValue.innerHTML = region;

    // date
    monthNum = date.getUTCMonth();
    day = date.getUTCDate();
    for(var i=0;i<monthStrs.length;i++) {
        if(i == monthNum) 
            month = monthStrs[i];
    }
    monthValue.innerHTML = month;
    dayValue.innerHTML = day;

    // wind speed
    const windSpeed = climateObj.wind.speed;
    windValue.innerHTML = `${windSpeed} MPH`;

    // humidity
    const humidity = climateObj.main.humidity;
    humidityValue.innerHTML = `${humidity}%`;

    // pressure
    const tempPress = climateObj.main.pressure;
    tempValue.innerHTML = `${tempPress} hPa`;
};

getClimate('Polgolla','LK');

shutDownIcon.addEventListener('click', (e) => {
    counter++;
	e.target.style.display = 'none';
    animateSkies();
	e.target.style.display = 'inline-block';
});

const animateSkies = () => {
    if(counter%2 === 0) {
        anime({
            targets: cloudValue,
            translateX: 5,
            duration: 5000
        })
    }
    if(counter%2 === 1) {
        anime({
            targets: cloudValue,
            translateX: 0,
            duration: 5000
        })
    }
};