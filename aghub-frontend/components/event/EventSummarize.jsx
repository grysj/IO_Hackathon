import {useAuth} from "../../contexts/AuthContext";
import {View} from "react-native";
const EventSummarize = ({friends, friendsId, slot, setStep, location}) => {
    const {user} = useAuth()
    return (
        <View style={{backgroundColor: "red"}}>


        </View>
    )
};
export default EventSummarize