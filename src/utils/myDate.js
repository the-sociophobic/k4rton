import {capitalize} from './utils.js';

export default class myDate {
  constructor(string, lang) {
    switch(typeof string) {
      case "undefined":
        this.dateJS = new Date();
        break;
      case "string":
        if (string.length == 0) {
          this.dateJS = new Date();
          break;
        }
        if (!string.includes('.') && !string.includes('/') && !string.includes('-')) {
          this.dateJS = new Date(parseInt(string));
          break;
        }

        let newString;

        if (string[2] == '.' || string[2] == '/' || string[2] == '-')
          newString = string.substring(3, 5) + '/' + string.substring(0, 2) + '/' + string.substring(6, 10);
        else if (string[2] == ':' && (string[8] == '.' || string[8] == '/' || string[8] == '-'))
          newString = string.substring(0, 6) + string.substring(9, 11) + '/' + string.substring(6, 8) + '/' + string.substring(12, 16);
        else
          newString = string;
        this.dateJS = new Date(Date.parse(newString));
        break;
      case "number":
        this.dateJS = new Date(string);
        break;
      case "object":
        this.dateJS = new Date(string.dateJS);
        break;
      default:
        // alert('unexpected typeof date: ' + typeof string);
        this.dateJS = new Date();
        break;
    }

    switch (lang) {
      case "RU":
        this.lang = lang;
        break;
      default:
        this.lang = "ENG";
        break;
    }
  }
  setDate(date) {
    this.dateJS = new myDate(date);
  }
  getTime() {
    return this.dateJS.getTime();
  }

  comp(date) {
    var newDate = new myDate(date);
    return newDate.getTime() - this.dateJS.getTime();
  }
  less(date) {
    var newDate = new myDate(date);
    return this.dateJS.getTime() < newDate.getTime();
  }
  eq(date) {
    var newDate = new Date(date);
    return this.dateJS.getDate() < newDate.getDate() && this.dateJS.getMonth() < newDate.getMonth() && this.dateJS.getFullYear() < newDate.getFullYear();
  }
  sameDay(date) {
    var newDate = new myDate(date);
    return this.day() == newDate.day() && this.month() == newDate.month() && this.year() == newDate.year();
  }

  addDay(offset) {
    this.dateJS.setDate(this.dateJS.getDate() + offset);
  }
  addMonth(offset) {
    this.dateJS.setMonth(this.dateJS.getMonth() + offset);
  }
  addYear(offset) {
    this.dateJS.setFullYear(this.dateJS.getFullYear() + offset);
  }
  addMinute(offset) {
    this.dateJS.setMinutes(this.dateJS.getMinutes() + offset);
  }
  addHour(offset) {
    this.dateJS.setHours(this.dateJS.getHours() + offset);
  }

  toString() {
    return this.dateJS.getDate() + " " + this.monthString() + " " + this.dateJS.getFullYear();
  }
  toStringShort() {
    return this.dateJS.getDate() + " " + this.monthStringShort() + " " + this.dateJS.getFullYear();
  }
  toStringDot() {
    var dd = (this.dateJS.getDate() < 10 ? "0" : "") + this.dateJS.getDate();
    var mm = ((this.dateJS.getMonth() + 1 < 10) ? "0" : "") + (this.dateJS.getMonth() + 1);
    return dd + "." + mm + "." + this.dateJS.getFullYear();
  }
  toStringSlash() {
    var dd = (this.dateJS.getDate() < 10 ? "0" : "") + this.dateJS.getDate();
    var mm = ((this.dateJS.getMonth() + 1 < 10) ? "0" : "") + (this.dateJS.getMonth() + 1);
    return dd + "." + mm + "." + this.dateJS.getFullYear();
  }
  toStringDash() {
    var dd = (this.dateJS.getDate() < 10 ? "0" : "") + this.dateJS.getDate();
    var mm = ((this.dateJS.getMonth() + 1 < 10) ? "0" : "") + (this.dateJS.getMonth() + 1);
    return dd + "." + mm + "." + this.dateJS.getFullYear();
  }

  date() {
    switch (this.lang) {
      case "RU":
        return this.day() + " " + this.monthString();
      default:
        return this.monthString() + " " + this.day();
      }
  }
  dateTime() {
    return this.time() + " " + capitalize(this.date());
  }
  day() {
    return this.dateJS.getDate();
  }
  month() {
    return this.dateJS.getMonth() + 1;
  }
  monthString() {
    var namesENG = ["january", "february", "march", "aprill", "may", "june", "july", "august", "september", "october", "november", "december"];
    var namesRU = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    switch(this.lang) {
      case "RU":
        return namesRU[this.month() - 1];
      default:
        return namesENG[this.month() - 1];
    }
  }
  monthStringShort() {
    var namesENG = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    var namesRU = ["янв", "фев", "март", "апр", "мая", "июн", "июл", "авг", "сент", "окт", "нояб", "дек"];

    switch(this.lang) {
      case "RU":
        return namesRU[this.month() - 1];
      default:
        return namesENG[this.month() - 1];
      }
  }

  year() {
    return this.dateJS.getFullYear();
  }
  time() {
    switch(this.lang) {
      case "RU":
        return (this.dateJS.getHours() < 10 ? "0" : "") + this.dateJS.getHours() + ":" + (this.dateJS.getMinutes() < 10 ? "0" : "") + this.dateJS.getMinutes();
      default:
        return (this.dateJS.getHours() < 10 ? "0" : "") + (this.dateJS.getHours() > 12 ? this.dateJS.getHours() - 12 : this.dateJS.getHours()) + ":" + (this.dateJS.getMinutes() < 10 ? "0" : "") + this.dateJS.getMinutes() + (this.dateJS.getHours() > 12 ? " pm" : " am");
      }
  }
  niceTime() {
    if (this.isToday())
      return this.time();
    if (this.isYesterday())
      switch (this.lang) {
        case "RU":
          return "вчера"
        default:
          return "yesterday";
      }

    var today = new myDate();
    if (today.year() == this.year())
      return capitalize(this.date());
    // return this.day() + " " + capitalize(this.monthStringShort()) + " " + this.year();
    return this.day() + " " + this.monthString() + " " + this.year();
  }
  hour() {
    return this.dateJS.getHours();
  }
  minute() {
    return this.dateJS.getMinutes();
  }

  isToday() {
    var today = new myDate();
    if (today.day() == this.day() && today.month() == this.month() && today.year() == this.year())
      return true;
    return false;
  }
  isYesterday() {
    var today = new myDate();
    if (today.day() - 1 == this.day() && today.month() == this.month() && today.year() == this.year())
      return true;
    return false;
  }
  isTomorrow() {
    var today = new myDate();
    if (today.day() + 1 == this.day() && today.month() == this.month() && today.year() == this.year())
      return true;
    return false;
  }

  pastSeconds() {
    var today = new myDate();
    return Math.floor((today.getTime() - this.getTime()) / 8.64e7 * 24 * 60 * 60);
  }
  pastMinutes() {
    var today = new myDate();
    return Math.floor((today.getTime() - this.getTime()) / 8.64e7 * 24 * 60);
  }
  pastHours() {
    var today = new myDate();
    return Math.floor((today.getTime() - this.getTime()) / 8.64e7 * 24);
  }
  pastDays() {
    var today = new myDate();
    return Math.floor((today.getTime() - this.getTime()) / 8.64e7);
  }
  pastWeeks() {
    var today = new myDate();
    return Math.floor((today.getTime() - this.getTime()) / 8.64e7 / 7);
  }
  pastMonths() {
    var today = new myDate();
    var months = today.month() - this.month() + (today.year() - this.year()) * 12;
    if (months > 0 && this.day() > today.day())
      return months - 1;
    if (months < 0 && this.day() < today.day())
      return months + 1;
    return months;
  }
  pastYears() {
    return Math.floor(this.pastMonths() / 12);
  }

  countable(number, word) {
    let countableWord;
    if (Array.isArray(word)) {
      if ((number > 10 && number < 20) || number % 10 > 4 || number % 10 == 0)
        countableWord = word[2];
      else if (number % 10 > 1)
        countableWord = word[1];
      else
        countableWord = word[0];
    }
    else if (number == 1)
      countableWord = word;
    else countableWord = word + "s";

    return number + " " + countableWord;
  }
  pastNice() {
    if (this.pastSeconds() < 60)
      return this.countable(this.pastSeconds(), (this.lang == "RU" ? ["секунду", "секунды", "секунд"] : "second"));
    if (this.pastMinutes() < 60)
      return this.countable(this.pastMinutes(), (this.lang == "RU" ? ["минуту", "минуты", "минут"] : "minute"));
    if (this.pastHours() < 24)
      return this.countable(this.pastHours(), (this.lang == "RU" ? ["час", "часа", "часов"] : "hour"));
    if (this.pastDays() < 7)
      return this.countable(this.pastDays(), (this.lang == "RU" ? ["день", "дня", "дней"] : "day"));
    if (this.pastMonths() < 1)
      return this.countable(this.pastWeeks(), (this.lang == "RU" ? ["неделю", "недели", "недель"] : "week"));
    if (this.pastYears() < 1)
      return this.countable(this.pastMonths(), (this.lang == "RU" ? ["месяц", "месяца", "месяцев"] : "month"));
    return this.countable(this.pastYears(), (this.lang == "RU" ? ["год", "года", "лет"] : "year"));
  }

  dayOfWeek() {
    var daysENG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var daysRU = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

    switch (this.lang) {
      case "RU":
        return daysRU[this.dateJS.getDay()];
      default:
        return daysENG[this.dateJS.getDay()];
    }
  }
  dayOfWeekShort() {
    var daysENG = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var daysRU = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

    switch (this.lang) {
      case "RU":
        return daysRU[this.dateJS.getDay()];
      default:
        return daysENG[this.dateJS.getDay()];
    }
  }
}
