import {Box, HStack, Text} from "@gluestack-ui/themed";

import React from "react";
import {ScrollView} from "react-native";

const hours = Array.from(
    {length: 24},
    (_, i) => `${i.toString().padStart(2, "0")}:00`
);
const CalendarField = ({children}) => {
    return (
        <ScrollView>
        <Box className="px-4 py-2 min-h-[1440px]">
            {hours.map((hour, i) => (
                <HStack
                    key={i}
                    className="items-start h-[60px] border-t border-outline-200"
                >
                    <Text className="text-xs w-[50px] text-typography-500">
                        {hour}
                    </Text>
                </HStack>
            ))}

            {children}
        </Box>
</ScrollView>

)
};
export default CalendarField