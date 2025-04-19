import { useAuth } from "../../contexts/AuthContext";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";

const EventSummarize = ({ friends, friendsId, slot, setStep, location }) => {
    const { user } = useAuth();

    return (
        <View style={styles.container}>
            <LottieView
                source={require("../../assets/animations/confetti.json")}
                autoPlay
                loop
                style={styles.animation}
            />



            <ScrollView>

            </ScrollView>
        </View>
    );
};

export default EventSummarize;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#272625",
    },
    animation: {
        position:"absolute",
        top:"-50%",
        height:"200%",
        width:"100%"
    },
});
