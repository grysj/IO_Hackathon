import React from "react";
import {Pressable, Text, View} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {formatTime} from "../../app/functions/format/FormatDateTime";
import {formatDate} from "date-fns";


const DateTimePickerBox = ({
                               label = "From",
                               type = "time",
                               maximumDate = null,
                               minimumDate = new Date(),
                               value,
                               onChange,
                               visible,
                               setVisible,
                               setButtons
                           }) => {
    const setDate = (date) => {
        if (!date) return;

        switch (type) {
            case "time": {
                const newDate = new Date(value.toString());
                newDate.setHours(date.getHours());
                newDate.setMinutes(date.getMinutes());
                onChange(newDate);
                break;
            }

            case "date": {
                const newDate = new Date(value.toString());
                newDate.setFullYear(date.getFullYear());
                newDate.setMonth(date.getMonth());
                newDate.setDate(date.getDate());
                onChange(newDate);
                break;
            }


            default:
                break;
        }
        setVisible(false)

    };
    const formatText = () => {
        switch (type) {
            case "time": {
                return formatTime(value)
            }
            case "date": {
                return formatDate(value, "-")
            }
        }
    }
    return (
        <View className="flex-1 min-w-[100px]">
            <Text className="text-white mb-1 font-semibold">{label}:</Text>

            <Pressable onPress={() => {
                setVisible(true)
                setButtons()
            }}>
                <View className="bg-background-200 py-4 rounded-lg">
                    {visible && (
                        <RNDateTimePicker
                            value={value}
                            mode={type}
                            display="spinner"
                            is24Hour={true}
                            minimumDate={minimumDate}
                            maximumDate={maximumDate}
                            timeZoneName="Europe/Warsaw"
                            positiveButton={{textColor: "white"}}
                            negativeButton={{textColor: "white"}}
                            onChange={(event, date) => {
                                setDate(date);
                            }}
                        />
                    )}

                    <Text className="text-yellow-600 font-bold text-xl text-center">
                        {formatText()}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

export default DateTimePickerBox;
