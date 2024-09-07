const calendarTitle = document.getElementById("calendar-title")
const calendarBody = document.getElementById("calendar-body")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
const dayViewBtn = document.getElementById("day-view")
const weekViewBtn = document.getElementById("week-view")
const monthViewBtn = document.getElementById("month-view")

let currentDate = new Date();
let currentView = "month"

function initCalendar() {
    renderCalendar();
    addEventListeners();
}

function renderCalendar() {
    calendarBody.innerHTML = "";

    if (currentView === 'day') {
        renderDayView();
    }
    else if (currentView === 'week') {
        renderWeekView();
    }
    else if (currentView === 'month') {
        renderMonthView();
    }
}

let selectedDate = null;

function renderMonthView() {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    const daysInMonth = lastDay.getDate();
    const firstWeekDay = (firstDay.getDay() + 6) % 7;

    const now = new Date();
    const isCurrentMonth = now.getFullYear() === currentDate.getFullYear() && now.getMonth() === currentDate.getMonth();

    calendarTitle.innerHTML = isCurrentMonth
    ? `<span class="current-month">${firstDay.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}</span>` 
    : `${firstDay.toLocaleDateString('default', { month: 'long'})} ${currentDate.getFullYear()}`

    const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    dayLabels.forEach((label,index) => {
        const labelCell = document.createElement('div')
        labelCell.classList.add('day-label')

        if (index === 6 || index === 5) {
            labelCell.classList.add('weekend-label')
        }
        
        labelCell.textContent = label;
        calendarBody.appendChild(labelCell)
    })

    for (let i = 0; i < firstWeekDay; i++) {
        const emptyCell = document.createElement('div');
        calendarBody.appendChild(emptyCell)
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div')
        dayCell.classList.add('calendar-day')

        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        if (date.getDay() === 6 || date.getDay() === 7) {
            dayCell.classList.add('weekend')
        }
        
        dayCell.textContent = day
        dayCell.dataset.date = day;

        if (day === now.getDate() && isCurrentMonth) {
            dayCell.classList.add('current')
        }

        if (selectedDate && day === selectedDate.getDate() && isCurrentMonth) {
            dayCell.classList.add('selected')
        }

        dayCell.addEventListener('click', () => {
            document.querySelectorAll('.calendar-day').forEach(day => {
                day.classList.remove('selected');
                if (day.textContent == now.getDate()) {
                    day.classList.remove('active')
                    day.classList.add('current')
                }
            })
              
            if (day === now.getDate() && isCurrentMonth) {
                if (dayCell.classList.contains('current')) {
                    dayCell.classList.remove('current')
                    dayCell.classList.add('active')
                }else {
                    dayCell.classList.remove('active')
                    dayCell.classList.add('current')
                }
                selectedDate = null;
            }else {
                dayCell.classList.add('selected')
                selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)

                document.querySelector('.calendar-day.current')?.classList.remove('active')
                document.querySelector('.calendar-day.current')?.classList.add('current')
                
            }
        })
        
        calendarBody.appendChild(dayCell)
    }
}

function renderDayView() {
    calendarTitle.textContent = currentDate.toDateString();
    const dayCell = document.createElement('div')
    dayCell.classList.add('calendar-day', 'active')
    dayCell.textContent = currentDate.toDateString();
    calendarBody.appendChild(dayCell)
}

function renderWeekView() {
    calendarTitle.textContent = `Week View - ${currentDate.toDateString()}`;
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
        const weekDay = new Date(startOfWeek);
        weekDay.setDate(startOfWeek.getDate() + i)

        const weekDayCell = document.createElement('div')
        weekDayCell.classList.add('calendar-day')
        weekDayCell.textContent = weekDay.toDateString();
         
        if (weekDay.getDate() === currentDate.getDate()) {
            weekDayCell.classList.add('active')
        }
        calendarBody.appendChild(weekDayCell)
    }
}

function addEventListeners() {
    prevBtn.addEventListener('click', () => {
        changeDate(-1);
    })

    nextBtn.addEventListener('click', () => {
        changeDate(1)
    })

    dayViewBtn.addEventListener('click', () => {
        currentView = 'day';
        switchView(dayViewBtn)
    })

    weekViewBtn.addEventListener('click', () => {
        currentView = 'week'
        switchView(weekViewBtn)
    })

    monthViewBtn.addEventListener('click', ()=> {
        currentView = 'month'
        switchView(monthViewBtn)
    })
}

function switchView(activeBtn) {
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'))

    activeBtn.classList.add('active')
    renderCalendar()
}

function changeDate(amount) {
    if (currentView === 'day') {
        currentDate.setDate(currentDate.getDate() + amount)
    }
    else if (currentView === 'week') {
        currentDate.setDate(currentDate.getDate() + amount * 7)
    }
    else if (currentView === 'month') {
        currentDate.setMonth(currentDate.getMonth() + amount)
    }

    renderCalendar()
}

initCalendar()