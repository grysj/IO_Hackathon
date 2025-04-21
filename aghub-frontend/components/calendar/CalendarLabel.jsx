import { View, Text, StyleSheet } from "react-native";
import { formatDateLabel } from "@/util/format/FormatDateTime";
import React from "react";

const CalendarLabel = ({ dateStart, dateEnd ,style={} }) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.labelText}>
                {`${formatDateLabel(dateStart)} - ${formatDateLabel(dateEnd)}`}
            </Text>
        </View>
    );
};

export default CalendarLabel;

const styles = StyleSheet.create({
    container: {// px-4
        paddingVertical: 8,
        paddingHorizontal:8,
    },
    labelText: {
        fontSize: 18,              // text-xl
        fontWeight: "bold",        // font-bold
        color: "#fafaf9",          // text-typography-950 (DARK)
    },
});
