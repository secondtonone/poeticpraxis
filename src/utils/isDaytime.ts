export default function isDaytime(
  start = 8,
  end = 22
): boolean {
  const hours: number = new Date().getHours();
  return hours > start && hours < end;
}
