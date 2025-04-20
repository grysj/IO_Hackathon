import {useAuth} from "../../contexts/AuthContext";
import {
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import LottieView from "lottie-react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Divider from "../ui/Divider";
import * as Linking from "expo-linking";
import {isTheSameDay} from "../util/calendarUtils";
import {formatDateLabel, formatTime} from "../../app/functions/format/FormatDateTime";
import FriendComponent from "../friendlist/FriendComponent";

const EventSummarize = ({friends, friendsId, slot, setStep, location}) => {
    const {user} = useAuth();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const handleLocationPress = () => {
        console.log(location)
        if (location?.latitude && location?.longitude) {
            const gmapsUrl = `comgooglemaps://?q=${location.latitude},${location.longitude}`;
            const fallbackUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

            Linking.canOpenURL(gmapsUrl)
                .then((supported) => {
                    if (supported) {
                        Linking.openURL(gmapsUrl);
                    } else {
                        Linking.openURL(fallbackUrl);
                    }
                })
                .catch((err) => console.error("Error opening map:", err));
        }


    }
    return (

            <View style={styles.container}>
                <LottieView
                    source={require("../../assets/animations/confetti.json")}
                    autoPlay
                    loop={false}
                    style={styles.animation}
                />
                <View style={styles.header}>
                    <Ionicons name="checkmark-done-outline" size={30} color="#ca8a04"/>
                    <Text style={styles.title}>Check time range</Text>
                </View>
                {/*//TODO zrobić ten styled Scroll View jak box jest*/}
                <View style={styles.scrollContainer}>
                    <ScrollView >
                        <View style={{marginBottom:10}}>
                        {/*Name Container*/}
                        <View>
                            <View style={styles.labelContainer}>
                                <MaterialIcons name="new-label" size={24} color="#ca8a04"/>
                                <Text style={styles.labelText}>Name:</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter a name..."
                                placeholderTextColor="#aaa"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                        <Divider/>
                        {/*Des Container*/}
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <View style={styles.labelContainer}>
                                <MaterialIcons name="description" size={24} color="#ca8a40"/>
                                <Text style={styles.labelText}>Event Description:</Text>
                            </View>
                            <TextInput
                                style={styles.description}
                                placeholder="Add a description..."
                                placeholderTextColor="#aaa"
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                numberOfLines={4}
                                returnKeyType="done"
                            />
                        </View>
                        </TouchableWithoutFeedback>
                        <Divider/>
                        {/*Location Container*/}
                        <View>
                            <View style={styles.labelButtonContainer}>
                                <Text style={[styles.labelText, {color: "#ca8a04"}]}>Location:</Text>
                                <TouchableOpacity onPress={()=>setStep("location")} style={styles.labelButton}>
                                    <View style={[styles.labelContainer, {marginBottom: 0}]}>
                                        <Ionicons name="arrow-back" size={15} color="white"/>
                                        <Text style={styles.buttonText}>Location</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity onPress={handleLocationPress} style={styles.locationBox}>
                                <Ionicons name="location-sharp" size={22} color="#ca8a04"/>
                                <Text style={styles.locationText}>
                                    {"Unknown Poi"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Divider/>
                        <View>
                            <View style={styles.labelButtonContainer}>
                                <Text style={[styles.labelText, {color: "#ca8a04"}]}>Time:</Text>
                                <TouchableOpacity style={styles.labelButton}
                                                  onPress={() => setStep("availability")}>
                                    <View style={[styles.labelContainer, {marginBottom: 0}]}>
                                        <Ionicons name="arrow-back" size={15} color="white"/>
                                        <Text style={styles.buttonText}>Time</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.labelContainer}>
                                <Ionicons name="time" size={24} color="#ca8a04"/>
                                <Text style={styles.locationText}>
                                    {formatTime(slot.dateStart)} - {formatTime(slot.dateEnd)}
                                </Text>
                            </View>
                            <View style={styles.labelContainer}>
                                <Ionicons name="calendar" size={24} color="#ca8a04"/>
                                <Text style={styles.locationText}>
                                    {isTheSameDay(slot.dateStart, slot.dateEnd)
                                        ? `${formatDateLabel(slot.dateStart)}`
                                        : `${formatDateLabel(slot.dateStart)} - ${formatDateLabel(slot.dateEnd)}`
                                    }</Text>
                            </View>

                        </View>
                        <Divider/>
                        <View>
                            <View style={styles.labelButtonContainer}>
                                <Text style={[styles.labelText, {color: "#ca8a04"}]}>Participants:</Text>
                                <TouchableOpacity style={styles.labelButton}
                                                  onPress={() => setStep("friends")}>
                                    <View style={[styles.labelContainer, {marginBottom: 0}]}>
                                        <Ionicons name="arrow-back" size={15} color="white"/>
                                        <Text style={styles.buttonText}>Friends</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.vStack}>

                                {friends.map((friend,i)=>(
                                    <FriendComponent key={i} friend={friend} style={styles.friend}/>
                                ))}
                            </View>
                        </View>
                        <Divider/>

                        <TouchableOpacity style={styles.applicationButton}                       >
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        </View>

                    </ScrollView>

                </View>
            </View>

    );
};

export default EventSummarize;
//TODO stylowanie mocno powiązane z EventCreationCalendar i EventAvailability picker i pewnie innymi z tej podstrony
const styles = StyleSheet.create({

    //To w ogóle można wyciągnąc jako jakiś aPlication view bo
    // takie stylowanie będę dawał wszędzie gdzie jest ten navbar obsrany
    container: {
        flex: 1,
        backgroundColor: "#272625",
    },
    scrollContainer: {
        paddingTop: 5,
        paddingHorizontal: 10,
        paddingBottom: 45
    },
    animation: {
        position: "absolute",
        top: "-50%",
        height: "200%",
        width: "100%"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderBottomWidth: 2,
        borderColor: "white",
        padding: 3,
        marginBottom: 4,
    },
    title: {
        fontSize: 24,
        lineHeight: 30,
        fontWeight: 700,
        color: "white",
    },
    labelContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
    //Stylowanie 1 do 1 z kalendarza
    labelButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8

    },
    //same
    labelButton: {
        backgroundColor: "#ca8a04",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    labelText: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: "600",
        color: "white",
    },

    input: {
        fontSize: 24,
        lineHeight: 30,
        fontWeight: 700,
        margin: 0,
        padding: 0,
        color: "#ca8a40",

    },
    description: {
        borderWidth: 1,
        borderColor: "#ca8a04",
        borderRadius: 8,
        padding: 10,
        color: "#fff",
        backgroundColor: "#FFFFFF1A",
        fontSize: 16,
        lineHeight: 22,
        minHeight: 160,
        textAlignVertical: "top", // ważne przy multiline!
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#ca8a04",
    },
    locationBox: {
        flexDirection: "row",              // flex-row
        alignItems: "center",              // items-center
        gap: 12,                            // gap-3 (if unsupported, use marginRight on icon)
        backgroundColor: "#FFFFFF1A",
        paddingVertical: 12,               // py-3
        paddingHorizontal: 20,             // px-5
        borderRadius: 12,                  // rounded-xl
    },
    locationText: {
        fontSize: 18,                      // text-lg
        fontWeight: "500",                 // font-medium
        color: "white",                    // text-white
    },
    buttonText: {
        color: "white",
        fontWeight:"bold",
    },
    vStack: {
        flexDirection: "column",
        gap: 12,
    },
    friend:{
        backgroundColor:"#FFFFFF1A",
        padding:8,
        borderRadius: 8,

    },
    applicationButton:{
        backgroundColor:"#ca8a04",
        borderRadius:8,
        alignItems:"center",
        padding:16
    },


});
