import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const FriendComponent = ({ friend, isSelected = false, style = {} }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.iconWrapper}>
                <MaterialIcons name="person" size={30} color="white" />
            </View>
            <View>
                <Text style={[styles.username, isSelected && styles.usernameSelected]}>
                    {friend.username}
                </Text>
                <Text style={[styles.email, isSelected && styles.emailSelected]}>
                    {friend.email}
                </Text>
            </View>
        </View>
    );
};

export default FriendComponent;
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    iconWrapper: {
        marginRight: 0,
    },
    username: {
        fontWeight: "600",
        color: "white",
        fontSize: 14,
    },
    usernameSelected: {
        color: "#FFFFFF",
    },
    email: {
        fontSize: 11,
        color: "#888888",
    },
    emailSelected: {
        color: "#fef9c3",
    },
});
