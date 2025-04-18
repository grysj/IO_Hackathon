import React from "react";
import {Pressable, Text, View} from "react-native";
import {formatTime} from "../../app/functions/format/FormatDateTime";

const shift = 8;

const hourToTopOffset = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours * 60 + minutes + shift;
};

const CalendarComponent = ({
                               dateStart,
                               dateEnd,
                               showDate = true,
                               name = "",
                               color = "bg-primary-600",
                               zIndex = 10,
                               onPress: handlePress,
                               opacity = 0.8,
                               borderWidth = 1,
                               borderColor = "bg-primary-600",
                               style = {}
                           }) => {
    const top = hourToTopOffset(dateStart);
    const bottom = hourToTopOffset(dateEnd);
    const height = bottom - top;

    return (
        <Pressable
            onPress={handlePress}
            className={`absolute left-[60px] w-[70%] ${color} rounded-md px-3 py-2`}
            style={{
                opacity,
                borderWidth,
                borderColor,
                top,
                height,
                zIndex,
                ...style,
            }}
        >
            <View>
                <Text className="text-white font-bold">{name}</Text>
                <Text className="text-gray-100 text-xs">
                    {showDate && `${formatTime(dateStart)} - ${formatTime(dateEnd)}`}
                </Text>
            </View>
        </Pressable>
    );
};

export default CalendarComponent;
