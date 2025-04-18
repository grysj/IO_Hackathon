import React from "react";
import {Pressable, Text, View} from "react-native";
import {formatTime} from "../../app/functions/format/FormatDateTime";

const shift = 8;

const hourToTopOffset = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours * 60 + minutes + shift;
};
//TODO style do porpawienia tak żeby zgadzało się z react native i może jeszcze zamiast tylu zmiennych przekazywać komponent style
const CalendarComponent = ({
                               dateStart,
                               dateEnd,
                               side = "left",
                               username = "",
                               showDate = true,
                               name = "",
                               backgroundColor = "bg-primary-600",
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
            className={`absolute w-[70%] rounded-md px-3 py-2`}
            style={{
                opacity,
                borderWidth,
                borderColor,
                backgroundColor,
                top,
                height,
            ...(side === "left" ? {left: 60} : {}),
                ...(side === "right" ? {right: 15} : {}),
                zIndex,
                ...style,
            }}
        >
            <View>
                <Text className="text-white font-bold">{name}</Text>
                {showDate && (<Text className="text-gray-100 text-xs">
                    {formatTime(dateStart)} - {formatTime(dateEnd)}
                </Text>)}
                {username && (<Text className="text-gray-100 text-xs">
                    {username}
                </Text>)}
            </View>
        </Pressable>
    );
};

export default CalendarComponent;
