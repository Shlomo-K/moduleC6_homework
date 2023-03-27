const echoService = 'wss://echo-ws-service.herokuapp.com';
const urlLocation = 'https://www.openstreetmap.org/';

let websocket;

const btn = document.getElementById('btn-text');
const btnGeolocation = document.getElementById('btn-geo');
const chat = document.getElementsByClassName('chat-text');

btn.addEventListener('click', () => {
    const myInput = document.getElementById('input').value;
    createMsg(myInput);

    openСonnection();
    setTimeout(() => {websocket.send(myInput)}, 1000);
});

btnGeolocation.addEventListener('click', () => {
    let myLocation = document.createElement('a');
    chat[0].appendChild(myLocation);
    if (!navigator.geolocation) {
        createMsg('Геолокация не поддерживается вашим браузером');
    } else {
        createMsg('Определение местоположения…');
        navigator.geolocation.getCurrentPosition(success, error);
    }
});

function createServerMsg(message) {
    let serverMsg = document.createElement('div');
    serverMsg.classList.add('server-msg', 'border');
    serverMsg.innerHTML = `${message}`;
    chat[0].appendChild(serverMsg);
}

function createMsg(message) {
    let myMsg = document.createElement('div');
    myMsg.classList.add('msg', 'border');
    myMsg.innerHTML = `${message}`;
    chat[0].appendChild(myMsg);
}

function openСonnection() {
    websocket = new WebSocket(echoService);
    websocket.onopen = function(evt) {
        console.log('CONNECTED');
    };
    websocket.onclose = function(evt) {
        console.log('DICSONNECTED');
    };
    websocket.onmessage = function(evt) {
        createServerMsg(evt.data);
    };
    websocket.onerror = function(evt) {
        console.log('ERROR' + evt.data);
    };
};

const error = () => {
    createMsg('Невозможно получить ваше местоположение');
};

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let myLocation = document.createElement('a');
    myLocation.classList.add('msg', 'border');
    myLocation.href = urlLocation + `#map=18/${latitude}/${longitude}`;
    chat[0].appendChild(myLocation);
    myLocation.textContent = `Гео-локация`;
};

