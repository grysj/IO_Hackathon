import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import VBox from "../ui/VBox";
import { formatDate, formatTime } from "/util/format/FormatDateTime";


const AvailabilityList = ({ availableSlots = [], selectedSlot, setSelectedSlot }) => {
    return (
        <VBox gap={12}>
            {availableSlots.map((slot, index) => {
                const isSelected = selectedSlot?.dateStart === slot.dateStart;

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedSlot(slot)}
                        style={[
                            styles.slotContainer,
                            isSelected && styles.selected,
                        ]}
                    >
                        <Text
                            style={[
                                styles.slotText,
                                isSelected && styles.slotTextSelected,
                            ]}
                        >
                            {formatDate(slot.dateStart,".")}{" "}
                            {formatTime(slot.dateStart)}{" - "}
                            {formatDate(slot.dateEnd,".")}{" "}
                            {formatTime(slot.dateEnd)}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </VBox>
    );
};

export default AvailabilityList;


const styles = StyleSheet.create({
    slotContainer: {
        width: "100%",
        padding: 16,
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: "#577c54", // bg-background-100 (dark)
        borderColor: "#138505",
    },


    selected: {
        backgroundColor: "#106705",
        borderColor: "#138505",
    },
    slotText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#aaa",
    },
    slotTextSelected: {
        color: "white",

    },

});
