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
export const mockEvents = [
    {
        title: 'PUMP',
        start: new Date('2025-04-12T10:00:00'),
        end: new Date('2025-04-12T12:00:00'),
        color: 'bg-blue-600',
    },
    {
        title: 'ZZZ',
        start: new Date('2025-04-12T22:00:00'),
        end: new Date('2025-04-13T05:00:00'),
        color: 'bg-red-400',
        zIndex: 5,
    },
    {
        title: 'YOGA',
        start: new Date('2025-04-12T08:30:00'),
        end: new Date('2025-04-12T09:30:00'),
        color: 'bg-green-500',
    },
    {
        title: 'FROM YESTERDAY',
        start: new Date('2025-04-11T23:00:00'),
        end: new Date('2025-04-12T03:00:00'),
        color: 'bg-yellow-500',
    },
    {
        title: 'TO TOMORROW',
        start: new Date('2025-04-12T23:00:00'),
        end: new Date('2025-04-13T01:00:00'),
        color: 'bg-purple-500',
    },
    {
        title: 'MONDAY MEETING',
        start: new Date('2025-04-14T09:00:00'),
        end: new Date('2025-04-14T10:00:00'),
        color: 'bg-orange-500',
    },
];