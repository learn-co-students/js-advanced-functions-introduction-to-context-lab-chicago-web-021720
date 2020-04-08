function createEmployeeRecord(array) {
    const [firstName, familyName, title, payPerHour] = array
    const timeInEvents = []
    const timeOutEvents = []
    return {firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents}
}

function createEmployeeRecords(arrays) {
    return arrays.map(arr => createEmployeeRecord(arr))
}

function createTimeInEvent(empObj, dtStr) {
    const type = "TimeIn"
    let [date, hour] = dtStr.split(' ')
    hour = parseInt(hour)
    empObj.timeInEvents.push({type, date, hour})
    return empObj
}

function createTimeOutEvent(empObj, dtStr) {
    const type = "TimeOut"
    let [date, hour] = dtStr.split(' ')
    hour = parseInt(hour)
    empObj.timeOutEvents.push({type, date, hour})
    return empObj
}
function hoursWorkedOnDate(empObj, date) {
    const start = empObj.timeInEvents.find(elm => elm.date === date)
    const end = empObj.timeOutEvents.find(elm => elm.date === date)
    return (end.hour - start.hour) / 100
}

function wagesEarnedOnDate(empObj, date) {
    return empObj.payPerHour * hoursWorkedOnDate(empObj, date)
}

function allWagesFor(empObj) {
    const wages = empObj.timeInEvents.map(event => wagesEarnedOnDate(empObj, event.date))
    return wages.reduce((x,y)=>x+y, 0)
}

function createEmployeeRecords(empArray) {
    return empArray.map(emp => createEmployeeRecord(emp))
}

function findEmployeeByFirstName(empArray, firstName) {
    return empArray.find(emp => emp.firstName === firstName)
}

function calculatePayroll(empArray) {
    const wages = empArray.map(emp => allWagesFor(emp))
    return wages.reduce((x,y)=>x+y, 0)
}