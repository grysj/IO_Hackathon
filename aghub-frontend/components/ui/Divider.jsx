import React from "react";
import { View, StyleSheet } from "react-native";

const Divider = ({
                     height = 1,
                     color = "#ca8a04",
                     marginVertical = 8,
                     marginHorizontal = 0,
                     style,
                 }) => {
    return (
        <View
            style={[
                {
                    height,
                    backgroundColor: color,
                    marginVertical,
                    marginHorizontal,
                },
                style,
            ]}
        />
    );
};

export default Divider;
