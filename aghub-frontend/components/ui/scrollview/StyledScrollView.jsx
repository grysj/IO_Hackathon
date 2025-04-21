import {ScrollView as RNScrollView, View} from "react-native";
import { StyleSheet } from 'react-native';

const ScrollView = ({children, style}) => {
    return (<View style={[styles.scrollContainer, style]}>
        <RNScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.scrollInsideContainer}>
                {children}
            </View>
        </RNScrollView>
    </View>);

};
export default ScrollView;


const styles= StyleSheet.create({
    scrollContainer: {
        paddingTop: 5,
        paddingHorizontal: 10,
        paddingBottom: 45
    },
    scrollInsideContainer: {
        marginBottom: 10
    }
})