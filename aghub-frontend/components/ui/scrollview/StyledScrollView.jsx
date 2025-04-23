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
        paddingHorizontal: 10,
        paddingBottom: 40
    },
    scrollInsideContainer: {
        marginBottom: 10,
        paddingTop:10
    }
})