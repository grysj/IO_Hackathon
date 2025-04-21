import {StyleSheet, View} from "react-native";

const HBox = ({children, style}) => {
    return (
        <View style={[styles.hBox, style]}>
            {children}
        </View>
    )
};
export default HBox
const styles = StyleSheet.create({
    hBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8
    },
})