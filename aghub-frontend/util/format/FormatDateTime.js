export const formatTime = (date, separator = ":", includeSec = false, includeMils = false) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = includeSec || includeMils ? date.getSeconds().toString().padStart(2, "0") : "";
    const millis = includeMils ? date.getMilliseconds().toString().padStart(3, "0") : "";

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
    const string = date.toString().split(" ");
    return `${string[1]}${separator}${string[2]}${separator}${string[3]}`;
};

export const formatDate = (date, separator = " ") => {
    return `${date.getDate()
        .toString()
        .padStart(2, "0")}${separator}${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${separator}${date.getFullYear()
    }`
}