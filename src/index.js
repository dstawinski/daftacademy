import '@babel/polyfill';

const hoursDiv = document.getElementById("hours")
const minutesDiv = document.getElementById("minutes")
const secondsDiv = document.getElementById("seconds")

const date = new Date()

function* hours(initialHours) {
  let counter = initialHours;
  while (true) {
    if (counter < 10) {
      yield `0${counter}`
    }
    else {
      yield counter.toString();
    }
    counter++;
    if (counter > 23) counter = 0;
  }
}
const currHours = date.getHours();
const genHours = hours(currHours + 1);
const increaseHours = () => hoursDiv.innerText = genHours.next().value;
hoursDiv.innerText = currHours;

function* minutes(initialMinutes) {
  let counter = initialMinutes;
  while (true) {
    if (counter < 10) {
      yield `0${counter}`
    }
    else {
      yield counter.toString();
    }
    counter++;
    if (counter > 59) {
      increaseHours();
      counter = 0;
    }
  }
}
const currMinutes = date.getMinutes();
const genMinutes = minutes(currMinutes + 1);
const increaseMinutes = () => minutesDiv.innerText = genMinutes.next().value;
minutesDiv.innerText = currMinutes;


function* seconds(initialSeconds) {
  let counter = initialSeconds;
  while (true) {
    if (counter < 10) {
      yield `0${counter}`
    }
    else {
      yield counter.toString();
    }
    counter++;
    if (counter > 59) {
      increaseMinutes();
      counter = 0;
    }
  }
}
const currSeconds = date.getSeconds();
const genSeconds = seconds(currSeconds + 1);
const increaseSeconds = () => secondsDiv.innerText = genSeconds.next().value;
secondsDiv.innerHTML = currSeconds;

setInterval(() => increaseSeconds(), 1000)