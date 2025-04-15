export const mockFriends = [
    { id: 1, username: 'alice', email: 'alice@example.com' },
    { id: 2, username: 'bob', email: 'bob@example.com' },
    { id: 3, username: 'charlie', email: 'charlie@example.com' },
]

export const mockUser = {
    id: 1,
    username: 'jan.kowalski',
    email: 'jan.kowalski@example.com',
}
export const mockSchedule = {
    classes: [
        {
            name: 'PUMY',
            startDate: new Date('2025-04-12T10:00:00'),
            endDate: new Date('2025-04-12T12:00:00'),
        },
        {
            name: 'MATMA',
            startDate: new Date('2025-04-12T22:00:00'),
            endDate: new Date('2025-04-13T05:00:00'),
        },
    ],
    events: [
        {
            name: 'MONDAY MEETING',
            startDate: new Date('2025-04-14T09:00:00'),
            endDate: new Date('2025-04-14T10:00:00'),
        },
    ],
    unavailability: [
        {
            name: 'ZZZZ',
            startDate: new Date('2025-04-12T08:30:00'),
            endDate: new Date('2025-04-12T09:30:00'),
        },
        {
            name: 'FROM YESTERDAY',
            startDate: new Date('2025-04-11T23:00:00'),
            endDate: new Date('2025-04-12T03:00:00'),
        },
        {
            name: 'TO TOMORROW',
            startDate: new Date('2025-04-12T23:00:00'),
            endDate: new Date('2025-04-13T01:00:00'),
        },
    ],}