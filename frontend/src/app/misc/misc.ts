export function getTimeofDay() {
  let time = (new Date()).getHours();
  if (time < 12) {
    return "morning";
  }
  if (time >= 12 && time < 17) {
    return "afternoon";
  }
  if (time >= 17) {
    return "evening";
  }
}
