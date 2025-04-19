import {useAuth} from "../../contexts/AuthContext";
import {ScrollView, View} from "react-native";
const EventSummarize = ({friends, friendsId, slot, setStep, location}) => {
    const {user} = useAuth()
    return (
        <View style={{backgroundColor: "red"}}>
            <View>

            </View>
            <ScrollView><
            /ScrollView>

        </View>
    )
};
export default EventSummarize