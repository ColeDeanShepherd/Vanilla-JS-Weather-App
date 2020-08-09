// This file contains various utility functions used by the web app.

function temperatureToString(temperature) {
  return `${temperature}°F`;
}

function percentageToString(percentage) {
  return `${percentage}%`;
}

/**
 * Converts a UNIX timestamp in seconds (the # of seconds since 00:00:00 UTC on 1 January 1970) to a Date.
 * @param {*} unixTimestampSeconds 
 */
function unixTimestampSecondsToDate(unixTimestampSeconds) {
  const unixTimestampMs = 1000 * unixTimestampSeconds;
  return new Date(unixTimestampMs);
}

const dateDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * Converts a number returned from Date.getDay() (0 - 6) representing the day of the week to a string.
 * @param {number} dateDay 
 */
function dateDayToName(dateDay) {
  const name = dateDayNames[dateDay];
  return name;
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/**
 * Converts a number returned from Date.getMonth() (0 - 11) representing the month to a string.
 * @param {number} dateMonth 
 */
function dateMonthToName(dateMonth) {
  const name = monthNames[dateMonth];
  return name;
}

/**
 * Converts a minute (0 - 59) to a two-character string with leading 0's (ex: "04", "10", etc.)
 * @param {number} minute 
 */
function getZeroPaddedMinuteString(minute) {
  const isMinuteOneCharacter = minute < 10;

  // Add a leading 0 if the minute is one character long, otherwise just return the minute as a string.
  if (isMinuteOneCharacter) {
    return `0${minute}`;
  } else {
    return minute.toString();
  }
}

/**
 * Gets a 12-hour time string (ex: "12:30 AM", "1:00 PM") from a Date.
 * @param {Date} date 
 */
function get12HourTimeStringFromDate(date) {
  const hour = date.getHours();
  const minuteString = getZeroPaddedMinuteString(date.getMinutes());

  // There are cleverer ways to do this, but I'm using if statements for simplicity.
  if (hour === 0) {
    // If hour === 0, it's 12 AM.
    return `12:${minuteString} AM`;
  } else if (hour < 12) {
    // If hour is in-between 1 and 11, we can just append "AM" to the time.
    return `${hour}:${minuteString} AM`;
  } else if (hour === 12) {
    // If hour === 12, it's 12 PM.
    return `12:${minuteString} PM`;
  } else {
    // If hour is > 12, we must subtract 12 from the hour and append "PM" to the time
    // (ex: if hour === 15, then subtract 12 to get 3, and append "PM" to get 3 PM)
    return `${hour - 12}:${minuteString} PM`;
  }
}