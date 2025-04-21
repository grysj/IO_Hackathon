import {View, StyleSheet} from "react-native";

const PageView = ({children, style}) => {
    return(
        <View style={[styles.container, style]}>
            {children}
        </View>
    )

};export default PageView
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#272625",
    },
})