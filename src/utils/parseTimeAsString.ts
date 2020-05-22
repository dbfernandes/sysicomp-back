export default function parseTimeAsString(date: Date, separator = ':'): string {
  const hour = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const seconds = date.getSeconds().toString();

  const fullTime = `${hour.padStart(2, '0')}${separator}${minutes.padStart(
    2,
    '0',
  )}${separator}${seconds.padStart(2, '0')}`;

  return fullTime;
}
