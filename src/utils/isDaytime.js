export default function isDaytime(start = 8, end = 22) {
    const hours = new Date().getHours();
    return hours > start && hours < end;
}
