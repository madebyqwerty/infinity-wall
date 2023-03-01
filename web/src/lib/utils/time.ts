
export function to_hours_and_minutes(total_minutes: number) {
    const hours = Math.floor(total_minutes / 60);
    const minutes = total_minutes % 60;

    return `${pad_to_two_digits(hours)}:${pad_to_two_digits(minutes)}`;
}

function pad_to_two_digits(num: number) {
    return num.toString().padStart(2, '0');
}

export function from_hours_and_minutes(time: string) {
    const time_split = time.split(":")
    return (parseInt(time_split[0]) * 60) + parseInt(time_split[1])
}