
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

function dateToTimeString(date) {
  const dayName = dateDayNames[date.getDay()];
  const hourString = dateHoursTo12HourString(date.getHours());
  return `${dayName} ${hourString}`;
}

function dateHoursTo12HourString(hours) {
  if (hours === 0) {
    return "12 AM";
  } else if (hours < 12) {
    return `${hours} AM`;
  } else {
    return `${hours - 12} PM`;
  }
}