import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';
const shift = 8

const hourToTopOffset = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return (hours * 60 + minutes+shift);
};

const CalendarClass = ({ title, start, end, color = 'bg-primary-600', zIndex = 10 }) => {
    const top = hourToTopOffset(start);
    const bottom = hourToTopOffset(end);
    const height = bottom - top;

    return (
        <Box
            className={`absolute left-[60px] w-[70%] rounded-md px-3 py-2 ${color}`}
            style={{
                top,
                height,
                zIndex,
            }}
        >
            <Text className="text-background-light font-bold">{title}</Text>
            <Text className="text-background-100 text-xs">
                {`${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')} - ${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`}
            </Text>
        </Box>
    );
};

export default CalendarClass;
