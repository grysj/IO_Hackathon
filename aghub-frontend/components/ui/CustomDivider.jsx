import React from "react";
import { View} from "react-native";
import Divider from "./Divider";

const CustomDivider = ({
                           children,
                           height,
                           color,
                           marginVertical,
                           marginHorizontal,
                           style,
                       }) => {
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
        }} >
            <Divider
                height={height}
                color={color}
                marginVertical={marginVertical}
                marginHorizontal={marginHorizontal}
                style={[style,{flex:1}]}
            />

                {children}

            <Divider

                height={height}
                color={color}
                marginVertical={marginVertical}
                marginHorizontal={marginHorizontal}
                style={[style,{flex:1}]}
            />
        </View>
    );
};

export default CustomDivider;
