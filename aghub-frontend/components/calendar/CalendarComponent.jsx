import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';
const shift = 8

const hourToTopOffset = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return (hours * 60 + minutes+shift);
};

const CalendarComponent = ({
                               startDate,
                               endDate,
                               name,
                               color = 'bg-primary-600',
                               zIndex = 10,
                           }) => {
    const top = hourToTopOffset(startDate);
    const bottom = hourToTopOffset(endDate);
    const height = bottom - top;

    return (
        <Box
            className={` ${color} absolute left-[60px] w-[70%] rounded-md px-3 py-2 `}
            style={{
                top,
                height,
                zIndex,
            }}
        >
            <Text className="text-background-light font-bold">{name}</Text>
            <Text className="text-background-100 text-xs">
                {`${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')} - ${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`}
            </Text>
        </Box>
    );
};

export default CalendarComponent;
