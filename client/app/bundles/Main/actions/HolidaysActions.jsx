let nextHolidayId = 0
export const addHoliday = (holiday) => {
  console.log("---")
  return {
    type: 'ADD_HOLIDAY',
    id: nextHolidayId++,
    holiday: holiday
  }
}
