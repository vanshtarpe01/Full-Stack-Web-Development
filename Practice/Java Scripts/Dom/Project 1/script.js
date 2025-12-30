let isOn = false;

function toggleLight() {
    const bulb = document.querySelector("#bulb");
    const btnLightONOFF = document.querySelector("#btn-light-on-off");
    if (!isOn) {
        bulb.style.backgroundColor = "yellow"; //Light ON
        isOn = true;
        btnLightONOFF.innerText = "Turn Off Light...";
        btnLightONOFF.style.background = "red";
    } else {
        bulb.style.backgroundColor = "gray"; //Light OFF
        isOn = false;
        btnLightONOFF.innerText = "Turn On Light...";
        btnLightONOFF.style.background = "green";
    }
}