import React from "react";
import { Pressable, View, Text } from "react-native";
const shift = 8;

const hourToTopOffset = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return hours * 60 + minutes + shift;
};

const CalendarComponent = ({
  dateStart,
  dateEnd,
  name,
  color = "bg-primary-600",
  zIndex = 10,
  onPress: handlePress,
    opacity = 0.8,
    borderWidth = 1,
    borderColor = "bg-primary-600",
    style ={}
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
          {`${dateStart.getHours().toString().padStart(2, "0")}:${dateStart
            .getMinutes()
            .toString()
            .padStart(2, "0")} - ${dateEnd
            .getHours()
            .toString()
            .padStart(2, "0")}:${dateEnd
            .getMinutes()
            .toString()
            .padStart(2, "0")}`}
        </Text>
      </View>
    </Pressable>
  );

  // return (
  //   <Box
  //     className={` ${color} absolute left-[60px] w-[70%] rounded-md px-3 py-2 `}
  //     style={{
  //       top,
  //       height,
  //       zIndex,
  //     }}
  //   >
  //     <Text className="text-background-light font-bold">{name}</Text>
  //     <Text className="text-background-100 text-xs">
  //       {`${dateStart.getHours().toString().padStart(2, "0")}:${dateStart
  //         .getMinutes()
  //         .toString()
  //         .padStart(2, "0")} - ${dateEnd
  //         .getHours()
  //         .toString()
  //         .padStart(2, "0")}:${dateEnd
  //         .getMinutes()
  //         .toString()
  //         .padStart(2, "0")}`}
  //     </Text>
  //   </Box>
  // );
};

export default CalendarComponent;
