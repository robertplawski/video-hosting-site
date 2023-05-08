export const parseTime = (seconds) => {
  if(isNaN(seconds)){
    seconds = 0;
  }
  let result = new Date(seconds * 1000).toISOString().substring(14,22)
  return result;
}
