export const formatTime = (date, separator = ":", includeSec = false, includeMils = false) => {
    const newDate = new Date(date)
    const hours = newDate.getHours().toString().padStart(2, "0");
    const minutes = newDate.getMinutes().toString().padStart(2, "0");
    const seconds = includeSec || includeMils ? newDate.getSeconds().toString().padStart(2, "0") : "";
    const millis = includeMils ? newDate.getMilliseconds().toString().padStart(3, "0") : "";

    let time = `${hours}${separator}${minutes}`;
    if (seconds) {
        time += `${separator}${seconds}`;
    }
    if (millis) {
        time += `${separator}${millis}`;
    }

    return time;
};

export function formatDateTimeToLocalDateTime(startDate) {
    const date = new Date(startDate.toString())
    date.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());
    return date.toISOString()
}

export const formatDateLabel = (date, separator = " ") => {
    const d = new Date(date);
    const string = d.toString().split(" ");
    return `${string[1]}${separator}${string[2]}${separator}${string[3]}`;
};

export const formatDate = (date, separator = " ") => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}${separator}${month}${separator}${year}`;
};
