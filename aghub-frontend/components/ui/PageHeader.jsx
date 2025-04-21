import {StyleSheet, View} from "react-native"

const PageHeader = ({children, style}) => {
    return (
        <View style={[styles.header, style]}>
            {children}
        </View>)
};
export default PageHeader
const styles = StyleSheet.create({
        header: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            borderBottomWidth: 2,
            borderColor: "white",
            padding: 3,
            marginBottom: 4,
        },
    }
)