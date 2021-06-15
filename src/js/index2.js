import { elements } from './views/base2';


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const noOfdays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


const date  = new Date().getDate();
const year = new Date().getFullYear();
const month = new Date().getMonth(); 
const day = new Date().getDay();
let yearChange = year;
// const noOfdays = new Date().getUTCDay();

/*console.log(noOfdays[month]);
console.log(year);
console.log(months[month]);
console.log(days[day]);*/

const init = () => {
    elements.todayDate.textContent = date; 
    elements.thisYear.textContent = year; 
    elements.todayMonth.textContent = months[month]; 
    elements.todayDay.textContent = days[day]; 
    elements.month.textContent = months[month] + ' - ';
    elements.year.textContent = year;
};

init();



elements.rightBtn.addEventListener('click', () => {

    const month = elements.month.textContent.split(' ');
    // console.log(month[0]);
    let index = months.indexOf(month[0]);
    if(index === 11) {
        elements.year.textContent = yearChange + 1;
        yearChange += 1;
    }
    // console.log(index);
    const next = index + 1;
    elements.month.textContent = months[next] + ' - ';

});

elements.leftBtn.addEventListener('click', () => {

    const month = elements.month.textContent.split(' ');
    // console.log(month[0]);
    let index = months.indexOf(month[0]);
    if(index === 0) {
        elements.year.textContent = yearChange - 1;
        yearChange -= 1;
    }
    // console.log(index);
    const prev = index - 1;
    elements.month.textContent = months[prev] + ' - ';

});