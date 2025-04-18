import {Text} from "@gluestack-ui/themed";
import {formatDateLabel} from "../../app/functions/format/FormatDateTime";
import {View} from "react-native";
import React from "react";

const CalendarLabel = ({dateStart, dateEnd}) =>{
    return(
        <View className="px-4 py-2 bg-background-50">
            <Text className="text-xl font-bold text-typography-950 ">
                {`${formatDateLabel(dateStart)} - ${formatDateLabel(dateStart)}`}
            </Text>
        </View>
    )
};
export default CalendarLabel