
function temperatureToString(temperature) {
  return `${temperature}°F`;
}

function percentageToString(percentage) {
  return `${percentage}%`;
}

function unixTimestampSToDate(unixTimestampS) {
  return new Date(1000 * unixTimestampS);
}

const dateDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function dateDayToName(dateDay) {
  const name = dateDayNames[dateDay];
  return name;
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function dateMonthToName(dateMonth) {
  const name = monthNames[dateMonth];
  return name;
}

function getZeroPaddedMinuteString(minutes) {
  if (minutes < 10) {
    return `0${minutes}`;
  } else {
    return minutes.toString();
  }
}

function dateTo12HourTimeString(date) {
  const hour = date.getHours();
  const minuteString = getZeroPaddedMinuteString(date.getMinutes());

  if (hour === 0) {
    return `12:${minuteString} AM`;
  } else if (hour < 12) {
    return `${hour}:${minuteString} AM`;
  } else {
    return `${hour - 12}:${minuteString} PM`;
  }
}