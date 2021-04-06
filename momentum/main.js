let time = document.querySelector('time');
let background = document.querySelector('body');
let greeting = document.querySelector('.greeting');
let name = document.querySelector('.name');
let focusToDay = document.querySelector('.focus');
let imageBtn = document.querySelector('.imageBtn');
let dayWeak = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота','Воскресенье'];
let monthName = ['Январь', 'Февраль', 'Март', 'Апрель',"Май", 'Июнь', 'Июль', "Август", "Сентябрь","Октябрь","Ноябрь","Декабрь"];
let imgArr = [
    ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg'],
    ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg'],
    ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg'],
    ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg']
];
let newArr = shuffle(imgArr);

function showTime(){
    let today = new Date(),
        dayName = today.getUTCDay(),
        day = today.getDate(),
        month = today.getMonth(),
        hours = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds();
    time.innerHTML = `<span>${hours}:${twoNamber(minutes)}:${twoNamber(seconds)}</span><br><span>сегодня ${dayWeak[dayName - 1]} ${day} ${monthName[month]}</span>`;
   setTimeout(showTime,1000);
    if (minutes === 0 &&  seconds === 0){
        console.log('zero')
        backImg();
    }
}

function twoNamber(n){
    return (n < 10) ? '0' + n: n;
}

function shuffle(array) {
    for(let a = 0; a< array.length; a++){
    for (let i = array[a].length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[a][i], array[a][j]] = [array[a][j], array[a][i]];
    }
}  
return array
}
function backImg(){
    let url = './assets/images/';
    let dateTime = new Date();
    if (dateTime.getHours() >= 0 && dateTime.getHours() < 6){
        //night
        greeting.innerHTML = 'Доброй ночи';
        viewBackImage(`${url}`, `night/`, `${arrAll[dateTime.getHours()]}`);
        
    } else if (dateTime.getHours() >= 6 && dateTime.getHours() < 12){
        //morning
        greeting.innerHTML = 'Доброе утро';
        viewBackImage(`${url}morning/${imgArr[1][dateTime.getHours()]}`);
        
    } else if (dateTime.getHours() >= 12 && dateTime.getHours() < 18){
        //day
        greeting.innerHTML = 'Добрый день';
        viewBackImage(`${url}`, `day/`, `${arrAll[dateTime.getHours()]}`);

    } else if (dateTime.getHours() >= 18) {
        //evening
        greeting.innerHTML = 'Добрый вечер';
        viewBackImage(`${url}`, `evening/`, `${arrAll[dateTime.getHours()]}`);
        
    } 
    
}
function viewBackImage(a, b,c){
    let timeHour = new Date();
    let srcA = `${a}${b}${c}`;
    const img = document.createElement('img');
    img.src = srcA;
    img.onload = () => {
        background.style.backgroundImage = `url(${srcA})`;
    }; 
}

let arrAll = [].concat(newArr[0], newArr[1], newArr[2], newArr[3]);
let iA = -1;

imageBtn.addEventListener('click' , function(e){  
    let timeHour = new Date();
    let t = timeHour.getHours();
    let index = (iA + t) % arrAll.length;
    let vremiadna = '';
    if (index >= 12 && index<18){
       vremiadna = 'day/';
   }
    else if (index >= 6 && index < 12) {
       vremiadna = 'morning/';
    }
    else if (index >= 0 && index < 6) {
        vremiadna = 'night/';
    }
    else if (index >=18) {
       vremiadna = 'evening/';
    }
    console.log(index);
    const imageSrc2 = `./assets/images/`;
    viewBackImage(imageSrc2, vremiadna, arrAll[index] );
    iA++;
    imageBtn.disabled = true;
    setTimeout(function () { imageBtn.disabled = false }, 1000);
});

// setName
let fff = '';
name.addEventListener('click', function(e){
    fff = name.innerText;
    name.innerText = '';
})
let ddd = '';
focusToDay.addEventListener('click', function (e) {
    ddd = focusToDay.innerText;
    focusToDay.innerText = '';
})
function setName(e){
    if(e.type == 'keypress'){
        if(e.which == 13 || e.keyCode == 13){  
            if (e.target.textContent.length === 0){
                localStorage.setItem('name', fff);
                getName();
                name.blur();
            }else{
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    }
    }else {
        localStorage.setItem('name', e.target.innerText);
    }
}
// get name

function getName(){
    if (localStorage.getItem('name') === null || localStorage.getItem('name') === ''){
        console.log('null name');
        name.innerText = '[enter name]';
        name.blur();
    }
    else{
        name.innerText = localStorage.getItem('name');
    }
}
// setFocus
function setFocus(e) {
    if (e.type == 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focusToDay.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}
// get Focus

function setFocus(e) {
    if (e.type == 'keypress') {
        if (e.which == 13 || e.keyCode == 13) { 
        if (e.target.textContent.length === 0) {
            localStorage.setItem('focus', ddd);
            getMyFocus();
            focusToDay.blur();
        } else {
            localStorage.setItem('focus', e.target.innerText);
            focusToDay.blur();
        }
        }
    } else{
        console.log('ne keypress');
        localStorage.setItem('focus', e.target.innerText);
    }
}
function getMyFocus(){
    if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === '') {
        focusToDay.innerText = '[enter focus]';
        focusToDay.blur();
    }
    else {
        focusToDay.innerText = localStorage.getItem('focus');
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focusToDay.addEventListener('keypress', setFocus);
focusToDay.addEventListener('blur', setFocus);

// цитаты
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');
const linkQuot = 'https://type.fit/api/quotes';
async function getQuote() {
    let num = 0;
    const url = linkQuot;
    const res = await fetch(url);
    const data = await res.json();
    num = Math.floor(Math.random() * data.length);
    blockquote.textContent = data[num].text;
    figcaption.textContent = data[num].author;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

// погода
const wind = document.querySelector('.wind');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

console.log(city.innerText);

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=58bcb0e4a1e8a30f75d5a16b3dcc7813&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.cod == 400){
        city.innerText = 'введите город';
        temperature.textContent = '';
        wind.textContent = '';
        weatherDescription.textContent = "";
    }
    if (data.cod == 404) {
        city.innerText = 'нет такого города';
        temperature.textContent = '';
        wind.textContent = '';
         weatherDescription.textContent = "";
    }
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    wind.textContent = `ветер - ${data.wind.speed} m/s`
    weatherDescription.textContent = data.weather[0].description;
}
function setCity(event) {
    if (event.code === 'Enter') {
        getWeather();
        localStorage.setItem('city', city.innerText)
        city.blur();
    }
}
function showCity(){
    if(localStorage.getItem('city') == null){
        city.innerText = 'введите город';
    }
    else {
        city.innerText = localStorage.getItem('city');
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

showCity();
getMyFocus();
getName();
backImg();
showTime();
