export default function isDaytime(
    start: number = 8,
    end: number = 22
): boolean {
    const hours: number = new Date().getHours();
    return hours > start && hours < end;
}
