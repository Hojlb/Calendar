'use strict';

const btnPrevious = document.querySelector('#btnPrevious');
const btnNext = document.querySelector('#btnNext');
const btnToday = document.querySelector('#btnToday');
const monthField = document.querySelector('.display-month h1');
const weeksField = document.querySelector('.days-week');
const daysField = document.querySelector('.days-month');

const month = ['Январь','Февраль','Март', 'Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const daysWeek = ['Понедельник', 'Вторник', 'Среда','Четверг','Пятница','Суббота','Воскресенье'];

let currentMonth = {
  year: undefined,
  month: undefined,
  weekFirstDayMonth: undefined, // a day of the week
  lastDayMonth: undefined,
  lastDayPreviousMonth: undefined
}

class Calendar {
  constructor(data) {
    this.date = data;
  }

  renderCalendar() {
    weeksField.innerHTML = "";
    daysField.innerHTML = "";

    this.getCurrentMonth ();
    let days = this.getCalendarDays ();
    //console.log(days);
    this.renderWeeks (days.splice(0, 7));
    let numberDays = days.length

    for (let i = 0; i < numberDays; i++) {
      let item = document.createElement('div');
      item.className = `item`;
      item.innerHTML = `${days[i]}`;
      daysField.appendChild(item);
    }

  };

  getCurrentMonth () {
    monthField.innerText = `${month[this.date.month]} ${this.date.year}`;
  }

  getCalendarDays () {
    let arr = [];


    let calendarDay = this.date.lastDayPreviousMonth - this.date.weekFirstDayMonth;

    for (let i=0; i < this.date.weekFirstDayMonth; i++) {
      calendarDay++;
      arr.push(calendarDay);
      // if( calendarDay === this.date.lastDayPreviousMonth ){
      // calendarDay = 1;
      // }
    };
    calendarDay = 1;

    for (let i=0; i < 42 - this.date.weekFirstDayMonth; i++) {// 6 weeks in month * 7 days in week = 42
      if( calendarDay > this.date.lastDayMonth ) {
        calendarDay = 1;
      }

      arr.push( calendarDay );
      calendarDay++;
    }
    return arr;
  }

  renderWeeks (arr) {

    for (let i = 0; i < 7; i++) {
      let item = document.createElement('div');
      item.className = `week-item`;
      item.innerHTML = `${daysWeek[i]}, ${arr[i]}`;
      weeksField.appendChild(item);
    }
  }

}; // end class Calendar

createCalendar();

function createCalendar() {
  if( !currentMonth.year ){
    let today = new Date();
    setCalendarDate(today);
  }

  let calendar = new Calendar( currentMonth );
  calendar.renderCalendar();
};

function switcherMonth() {
  let month = currentMonth.month;
  let year = currentMonth.year;

  if( month === 11 && +this.value > 0 ) {
    year += +this.value;
    month = 0;
  } else if( month < 0 && +this.value < 0) {
    year += +this.value;
    month = 11;
  } else if( +this.value === 0 ){
    month = new Date().getMonth();
    year = new Date().getFullYear();
  } else {
    month += +this.value;
  }

  setCalendarDate( new Date(year, month, 1) );
  console.log(currentMonth);
  createCalendar();
};

function setCalendarDate( date ) {
  currentMonth.year = date.getFullYear();
  currentMonth.month = date.getMonth();
  currentMonth.weekFirstDayMonth = new Date(currentMonth.year, currentMonth.month, 1).getDay() - 1;

  if ( currentMonth.weekFirstDayMonth == -1 ) {
    currentMonth.weekFirstDayMonth = 6;
  }

  currentMonth.lastDayMonth = new Date(currentMonth.year, currentMonth.month + 1, 0).getDate();
  currentMonth.lastDayPreviousMonth = new Date(currentMonth.year, currentMonth.month, 0).getDate();
};

btnPrevious.addEventListener('click', switcherMonth);
btnNext.addEventListener('click', switcherMonth);
btnToday.addEventListener('click', switcherMonth);
