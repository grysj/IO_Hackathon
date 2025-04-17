export const getWeekDays = (referenceDate = new Date()) => {
    const day = referenceDate.getDay();
    const diffToMonday = (day + 6) % 7;
    const monday = new Date(referenceDate);
    monday.setDate(referenceDate.getDate() - diffToMonday);
    monday.setHours(0, 0, 0, 0);

    return Array.from({length: 7}, (_, i) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        return date;
    });
};

export const cropScheduleToPickedDay = (items, pickedDay) => {
    const startOfDay = new Date(pickedDay);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(pickedDay);
    endOfDay.setHours(23, 59, 59, 999);

    return items
        .filter(
            (item) =>
                new Date(item.dateEnd) >= startOfDay &&
                new Date(item.dateStart) <= endOfDay
        )
        .map((item) => ({
            ...item,
            dateStart: new Date(Math.max(new Date(item.dateStart), startOfDay)),
            dateEnd: new Date(Math.min(new Date(item.dateEnd), endOfDay)),
        }));
};