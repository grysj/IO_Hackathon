import {StyleSheet, TouchableOpacity, View} from "react-native";
import DateTimePickerBox from "./DateTimePickerBox";
import React, {useEffect, useState} from "react";
import {Text} from "@gluestack-ui/themed";
import Divider from "../ui/Divider";

const EventSlotCustomizer = ({
                                 onConfirm,
                                 dateMin,
                                 dateMax,
                                 selectedSlot,
                                 setSelectedSlot = () => {}
                             }) => {
    const [dateStart, setDateStart] = useState(dateMin)
    const [dateEnd, setDateEnd] = useState(dateMax)
    const [showTimeStart, setShowTimeStart] = useState(false)
    const [showTimeEnd, setShowTimeEnd] = useState(false)
    const [showDateStart, setShowDateStart] = useState(false)
    const [showDateEnd, setShowDateEnd] = useState(false)
    useEffect(() => {
        if (selectedSlot) {
            setDateStart(selectedSlot.dateStart);
            setDateEnd(selectedSlot.dateEnd);
        }
    }, [selectedSlot]);
    const handleSetDateEnd = (date) => {
        setDateEnd(date);
        setSelectedSlot({ dateStart: new Date(dateStart),dateEnd: new Date(date)});
    };
    const handleSetDateStart = (date) => {
        setDateStart(date);
        setSelectedSlot({ dateStart: new Date(date),dateEnd: new Date(dateEnd)});
    };


    return (
        <View style={styles.container}>

            <View style={styles.row}>
                <DateTimePickerBox
                    type={"date"}
                    value={dateStart}
                    onChange={handleSetDateStart}
                    visible={showDateStart}
                    setButtons={() => {}}
                    minimumDate={dateMin}
                    maximumDate={dateMax}
                    setVisible={setShowDateStart}
                />
                <DateTimePickerBox
                    value={dateStart}
                    label={""}
                    onChange={handleSetDateStart}
                    visible={showTimeStart}
                    setVisible={setShowTimeStart}
                    minimumDate={dateMin}
                    maximumDate={dateMax}
                    setButtons={() => {}}
                />
            </View>

            <View style={styles.row}>
                <DateTimePickerBox
                    label={"To:"}
                    type={"date"}
                    value={dateEnd}
                    onChange={handleSetDateEnd}
                    visible={showDateEnd}
                    setVisible={setShowDateEnd}
                    minimumDate={dateMin}
                    maximumDate={dateMax}
                    setButtons={() => {}}
                />
                <DateTimePickerBox
                    label={""}
                    value={dateEnd}
                    onChange={handleSetDateEnd}
                    visible={showTimeEnd}
                    setVisible={setShowTimeEnd}
                    minimumDate={dateMin}
                    maximumDate={dateMax}
                    setButtons={() => {}}
                />
            </View>

            <TouchableOpacity onPress={onConfirm} style={styles.button}>
                <Text className="text-white font-bold">Choose Location</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EventSlotCustomizer;

const styles = StyleSheet.create({
    container: {
        gap: 12,
        padding: 8,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#ca8a04', // yellow-600
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});
