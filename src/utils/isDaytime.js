export default function isDaytime() {
    const hours = new Date().getHours();
    return hours > 6 && hours < 23;
}
