navigator.getBattery().then(function (battery) {
  function updateAllBatteryInfo() {
    updateChargeInfo();
    updateLevelInfo();
    updateDischargingInfo();
  }
  updateAllBatteryInfo();

  battery.addEventListener("chargingchange", function () {
    updateChargeInfo();
  });
  function updateChargeInfo() {
    document.querySelector("#chargeStatus").textContent = battery.charging
      ? "Charging"
      : "NOT Charging";
    colorChange();
  }
  function colorChange() {
    if (battery.charging == true) {
      chargeStatus.style.color = "green";
    } else {
      chargeStatus.style.color = "red";
    }
  }

  battery.addEventListener("levelchange", function () {
    updateLevelInfo();
  });
  function updateLevelInfo() {
    document.querySelector("#batteryLevel").textContent =
      "Battery level: " + battery.level * 100 + "%";
    batteryIcon();
  }

  function batteryIcon() {
    var image = document.getElementById("battery");
    if (battery.level == 1) {
      image.src = "battery_100.png";
    } else if (battery.level <= 0.75) {
      image.src = "battery_75.png";
    } else if (battery.level <= 0.5) {
      image.src = "battery_50.png";
    } else if (battery.level <= 0.25) {
      image.src = "battery_25.png";
    } else if (battery.level == 0) {
      image.src = "battery_0.png";
    }
  }
  battery.addEventListener("dischargingtimechange", function () {
    updateDischargingInfo();
  });
  function updateDischargingInfo() {
    document.querySelector("#dischargingTime").textContent =
      "Battery Discharging Time: " + battery.dischargingTime + " Seconds";
  }
});
