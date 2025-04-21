import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const PageButton = ({
                        onPress,
                        title,
                        disabled = false,
                        style = {},
                        textStyle = {},
                    }) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[
                styles.button,
                disabled && styles.buttonDisabled,
                style,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    disabled && styles.textDisabled ,
                    textStyle,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default PageButton;
const styles = StyleSheet.create({
    button: {
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: "#ca8a04",
    },

    buttonDisabled: {
        backgroundColor: "#3a3a3a", // muted dark
    },
    text: {
        fontWeight: "bold",
        fontSize: 14,
        color: "white",
    },
    textDisabled: {
        color: "#aaa",
    },
});
