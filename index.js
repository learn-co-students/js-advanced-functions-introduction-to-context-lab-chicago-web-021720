const createEmployeeRecord = employee => {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = employees => {
    return employees.map(createEmployeeRecord)
}

class TimePunch {
    constructor(dateString) {
        const dateTime = dateString.split(" ")
        this.date = dateTime[0]
        this.hour = parseInt(dateTime[1])
    }
}

const createTimeInEvent = (employee, dateString) => {
    let timeIn = new TimePunch(dateString)
    timeIn.type = "TimeIn"
    employee.timeInEvents.push(timeIn)
    return employee
}


const createTimeOutEvent = (employee, dateString) => {
    let timeOut = new TimePunch(dateString)
    timeOut.type = "TimeOut"
    employee.timeOutEvents.push(timeOut)
    return employee
}

const hoursWorkedOnDate = (employee, date) => {
    const timeIn = employee.timeInEvents.find(timeIn => timeIn.date === date)
    const timeOut = employee.timeOutEvents.find(timeOut => timeOut.date === date)
    return (timeOut.hour - timeIn.hour)/ 100
}

const wagesEarnedOnDate = (employee, date) => {
    const hours = hoursWorkedOnDate(employee, date)
    return hours * employee.payPerHour
}

const allWagesFor = employee => {
    const dates = employee.timeInEvents.map(timeIn => timeIn.date)
    const wages = dates.map(date => wagesEarnedOnDate(employee, date))
    return wages.reduce((memo, wage) => memo + wage)
}

const calculatePayroll = employees => {
    const totalWages = employees.map(allWagesFor)
    return totalWages.reduce((memo, wage) => memo + wage)
}

const findEmployeeByFirstName = (employees, name) => {
    return employees.find(emp => emp.firstName === name)
}