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
      battery.level * 100 + "%";
    batteryIcon();
  }

  function batteryIcon() {
    $("#battery").css("width", battery.level * 100 + "%");
    if (battery.level > 0.5) {
      $("#battery").css("background-color", "#55c867");
    } else if (battery.level >= 0.25) {
      $("#battery").css("background-color", "#e7e522");
    } else {
      $("#battery").css("background-color", "#e73922");
    }
  }
  battery.addEventListener("dischargingtimechange", function () {
    updateDischargingInfo();
  });
  function updateDischargingInfo() {
    if (
      battery.dischargingTime / 60 > 60 &&
      battery.dischargingTime != Infinity
    ) {
      document.querySelector("#dischargingTime").textContent =
        "Battery Discharging Time: " +
        Math.floor(battery.dischargingTime / 3600) +
        " hr " +
        (
          battery.dischargingTime / 60 -
          Math.floor(battery.dischargingTime / 3600) * 60
        ).toFixed() +
        " min";
    } else if (battery.dischargingTime == Infinity) {
      document.querySelector("#dischargingTime").textContent =
        "Battery Discharging Time: " + battery.dischargingTime;
    } else {
      document.querySelector("#dischargingTime").textContent =
        "Battery Discharging Time: " +
        (battery.dischargingTime / 60).toFixed() +
        " min";
    }
  }
});
