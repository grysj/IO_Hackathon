import React from "react";
import { View, StyleSheet } from "react-native";

const VBox = ({ children, style = {}}) => {
    return (
        <View
            style={[
                styles.vBox,
                style,
            ]}
        >
            {children}
        </View>
    );
};

export default VBox;
const styles = StyleSheet.create({
    vBox: {
        flexDirection: "column",
        gap:8,
        paddingTop:8

    },
});
