import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { formatTime, formatDate } from "@/util/format/FormatDateTime";

const DateTimePickerBox = ({
  label = "From:",
  type = "time",
  maximumDate = null,
  minimumDate = new Date(),
  value,
  onChange,
  visible,
  setVisible,
  setButtons,
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
    setVisible(false);
  };
  const formatText = () => {
    switch (type) {
      case "time": {
        return formatTime(new Date(value));
      }
      case "date": {
        return formatDate(new Date(value), "-");
      }
    }
  };
  return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>

        <Pressable
            onPress={() => {
              setVisible(true);
              setButtons();
            }}
        >
          <View style={styles.pickerBox}>
            {visible && (
                <RNDateTimePicker
                    value={new Date(value)}
                    mode={type}
                    display="spinner"
                    is24Hour={true}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    timeZoneName="Europe/Warsaw"
                    positiveButton={{ textColor: "white" }}
                    negativeButton={{ textColor: "white" }}
                    onChange={(event, date) => setDate(date)}
                />
            )}

            <Text style={styles.valueText}>{formatText()}</Text>
          </View>
        </Pressable>
      </View>

  );
};

export default DateTimePickerBox;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    minWidth: 100,
  },
  label: {
    color: "white",
    marginBottom:2,
    fontWeight: "600",
  },
  pickerBox: {
    backgroundColor: "#535252", // bg-background-200 dark
    paddingVertical: 16,        // py-4
    borderRadius: 12,           // rounded-lg
    justifyContent: "center",
  },
  valueText: {
    color: "#ca8a04", // text-yellow-600
    fontWeight: "bold",
    fontSize: 18,      // text-xl
    textAlign: "center",
  },
});
