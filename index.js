// Your code here
const createEmployeeRecord = a => ({
  firstName: a[0],
  familyName: a[1],
  title: a[2],
  payPerHour: a[3],
  timeInEvents: [],
  timeOutEvents: []
});
const createEmployeeRecords = array_of_employee_records => array_of_employee_records
  .map(record => createEmployeeRecord(record));

const makeTimeIn = date_stamp => {
  const [date, hour] = date_stamp.split(' ');
  return {
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  }
};

const makeTimeOut = date_stamp => {
  const [date, hour] = date_stamp.split(' ');
  return {
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  }
};
//
//
const createTimeInEvent = (employee_record, date_stamp) => {
  employee_record.timeInEvents.push(makeTimeIn(date_stamp));
  return employee_record;
}

const createTimeOutEvent = (employee_record, date_stamp) => {
  employee_record.timeOutEvents.push(makeTimeOut(date_stamp));
  return employee_record;
}


// Object.assign({}, employee_record, {
//   timeInEvents: [...employee_record.timeInEvents, makeTimeIn(date_stamp)]});

// const createTimeOutEvent =
//   (employee_record, date_stamp) => Object.assign({}, employee_record, {
//     timeOutEvents: [...employee_record.timeOutEvents, makeTimeOut(date_stamp)]});



const hoursWorkedOnDate = (employee_record, date) => {
  const timeInDate = employee_record.timeInEvents.find(e => e.date === date);
  const timeOutDate = employee_record.timeOutEvents.find(e => e.date === date);
  return (parseInt(timeOutDate.hour) - parseInt(timeInDate.hour)) / 100;
};


const wagesEarnedOnDate = (employee_record, date) =>
  parseFloat((hoursWorkedOnDate(employee_record, date) * employee_record.payPerHour).toString());

const allWagesFor = employee_record => employee_record.timeInEvents
  .reduce((sum,e) => sum + wagesEarnedOnDate(employee_record, e.date),0);

const calculatePayroll = employee_records => employee_records.reduce((sum,emp) => sum + allWagesFor(emp), 0);

const findEmployeeByFirstName = (arr, firstName) => arr.find(rec => rec.firstName === firstName);
