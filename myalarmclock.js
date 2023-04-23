const ct = document.querySelector("#current-time");
const sH = document.querySelector("#hours");
const sM = document.querySelector("#minutes");
const sS = document.querySelector("#seconds");
const setAmPm = document.querySelector("#am-pm");
const sAB = document.querySelector("#submitBtn");
const alarmContainer = document.querySelector("#alarms-container");




//Function to get current time

function getct() {
  let time = new Date();
  time = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  ct.innerHTML = time;

  return time;
}


// Creating Drop down Menu

  
dropDownMenu(1, 12, sH);
 
dropDownMenu(0, 59, sM);

dropDownMenu(0, 59, sS);

setInterval(getct, 1000);
fetchAlarm();

// Event Listener added to Set Alarm Button
sAB.addEventListener("click", getInput);

//Function to populate Drop down list
function dropDownMenu(start, end, element) {
  for (let i = start; i <= end; i++) {
    const dropDown = document.createElement("option");
    dropDown.value = i < 10 ? "0" + i : i;
    dropDown.innerHTML = i < 10 ? "0" + i : i;
    element.appendChild(dropDown);
  }
}



//Funtion to get input for alarm
function getInput(e) {
  e.preventDefault();
  const hourValue = sH.value;
  const minuteValue = sM.value;
  const secondValue = sS.value;
  const amPmValue = setAmPm.value;

  const alarmTime = convertToTime(
    hourValue,
    minuteValue,
    secondValue,
    amPmValue
  );
  setAlarm(alarmTime);
}

// Converting time to 24 hour format
function convertToTime(hour, minute, second, amPm) {
  return `${parseInt(hour)}:${minute}:${second} ${amPm}`;
}

//Setting alarm and adding music
function setAlarm(time, fetching = false) {
  const alarm = setInterval(() => {
    if (time === getct()) {
      
        
        
        const sound = document.getElementById("alarmSound");
        sound.play();
        // alert("Alarm Ringing! Tap to stop");
        window.alert("Alarm Running! Tap to stop ");
			sound.pause();
			sound.ct = 0;
        
    }
    console.log("running");
  }, 500);

  addAlaramToDom(time, alarm);
  if (!fetching) {
    saveAlarm(time);
  }
}

// Function to display the alarm and delete button
function addAlaramToDom(time, intervalId) {
  const alarm = document.createElement("div");
  alarm.classList.add("alarm", "mb", "d-flex");
  alarm.innerHTML = `
              <div class="time">${time}</div>
              <button class="btn delete-alarm" data-id=${intervalId}>Delete</button> `;
  const deleteButton = alarm.querySelector(".delete-alarm");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e, time, intervalId));

  alarmContainer.prepend(alarm);
}

// Is alarms already saved
function checkAlarams() {
  let alarms = [];
  const isPresent = localStorage.getItem("alarms");
  if (isPresent) alarms = JSON.parse(isPresent);

  return alarms;
}

// save alarm 
function saveAlarm(time) {
  const alarms = checkAlarams();

  alarms.push(time);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}

// Getting alarms
function fetchAlarm() {
  const alarms = checkAlarams();

  alarms.forEach((time) => {
    setAlarm(time, true);
  });
}

//deleting alarms

function deleteAlarm(event, time, intervalId) {
  const self = event.target;

  clearInterval(intervalId);

  const alarm = self.parentElement;
  console.log(time);

  deleteAlarmFromLocal(time);
  alarm.remove();
}

function deleteAlarmFromLocal(time) {
  const alarms = checkAlarams();

  const index = alarms.indexOf(time);
  alarms.splice(index, 1);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}