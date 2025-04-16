import { View, StyleSheet } from "react-native";
const shift = 2;
const hourToTopOffset = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours * 60 + minutes + shift;
};
const CalendarTimeLine = ({ color = "red", left = 5 , zIndex=20}) => {

    const top = hourToTopOffset(new Date())
    return (
        <View style={[styles.container, {top, zIndex, left}]}>
            <View style={[styles.dot, { backgroundColor: color }]} />
            <View style={[styles.line, { backgroundColor: color }]} />
        </View>
    );
};

export default CalendarTimeLine;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    line: {
        flex: 1,
        height:2,
        marginEnd:8
    },
});
