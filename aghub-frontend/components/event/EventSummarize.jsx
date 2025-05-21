
import ScrollView from "../ui/scrollview/StyledScrollView";
import { useAuth } from "../../contexts/AuthContext";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Divider from "../ui/Divider";
import * as Linking from "expo-linking";
import { isTheSameDay } from "../util/calendarUtils";

import FriendComponent from "../friendlist/FriendComponent";
import {useRouter} from "expo-router";
import {formatDateLabel, formatTime} from "../../util/format/FormatDateTime";
import PageHeader from "../ui/PageHeader";
import PageView from "../ui/PageView";

const API_URL = process.env.EXPO_PUBLIC_AGHUB_API_URL;

const createEvent = async (
  userId,
  slot,
  location,
  friendsId,
  name,
  description,
  onError
) => {
  try {
    const eventDto = {
      name: name,
      description: description,
      dateStart: slot.dateStart, //TODO tu jest błąd pewnie z formatem danych dlatego to nie chciało się wysyłać
      dateEnd: slot.dateEnd,
      latitude: location.latitude,
      longitude: location.longitude,
      participantsId: friendsId,
      poiId: null,
      createdById: userId,
    };

    const response = await fetch(
      `${API_URL}/api/events/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventDto),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Błąd zapisu wydarzenia: ${errText}`);
    }
    console.log("Wydarzenie zapisane pomyślnie");
  } catch (err) {
    console.error("Błąd podczas zapisu eventu:", err.message);
    onError(`Event creation error: ${err.message}`);
  }
};
const EventSummarize = ({ friends, friendsId, slot, setStep, location }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [playAnimation, setPlayAnimation] = useState(false);
  const [nameError, setNameError] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [description, setDescription] = useState("");
  const [disableAll, setDisableAll] = useState(false);
  const handleLocationPress = () => {
    console.log(location);
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
  };
  const handleConfirm = () => {
    if (!name) {
      setNameError("Choose name for your event");
      return;
    }
    createEvent(
      user.id,
      slot,
      location,
      friendsId,
      name,
      description,
      setFetchError
    )
      .then(() => setDisableAll(true))
      .then(() => setPlayAnimation(true));
  };

    return (

        <PageView>
            {playAnimation && <LottieView
                source={require("../../assets/animations/confetti.json")}
                autoPlay={playAnimation}
                loop={false}
                onAnimationFinish={() => {
                    router.push("/map")
                }}
                style={styles.animation}
            />}
            <PageHeader>
                <Ionicons name="checkmark-done-outline" size={30} color="#ca8a04"/>
                <Text style={styles.title}>Event summarize</Text>
            </PageHeader>
            {fetchError && <Text style={styles.errorText}>{fetchError}</Text>}
            {/*//TODO zrobić ten styled Scroll View jak box jest*/}
            <ScrollView>
                {/*Name Container*/}
                <View>
                    <View style={styles.labelContainer}>
                        <MaterialIcons name="new-label" size={24} color="#ca8a04"/>
                        <Text style={styles.subTitle}>Name:</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter a name..."
                        placeholderTextColor="#aaa"
                        value={name}
                        onChangeText={setName}
                    />
                    {nameError && <Text style={styles.errorText}>{nameError}</Text>}
                </View>
                <Divider/>
                {/*Des Container*/}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <View style={styles.labelContainer}>
                            <MaterialIcons name="description" size={24} color="#ca8a40"/>
                            <Text style={styles.subTitle}>Event Description:</Text>
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
                        <Text style={[styles.subTitle, {color: "#ca8a04"}]}>Location:</Text>
                        <TouchableOpacity disabled={disableAll} onPress={() => setStep("location")}
                                          style={styles.labelButton}>
                            <View style={[styles.labelContainer, {marginBottom: 0}]}>
                                <Ionicons name="arrow-back" size={15} color="white"/>
                                <Text style={styles.buttonText}>Location</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity disabled={disableAll} onPress={handleLocationPress}
                                      style={styles.locationBox}>
                        <Ionicons name="location-sharp" size={22} color="#ca8a04"/>
                        <Text style={styles.locationText}>
                            {"Unknown Poi"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Divider/>
                <View>
                    <View style={styles.labelButtonContainer}>
                        <Text style={[styles.subTitle, {color: "#ca8a04"}]}>Time:</Text>
                        <TouchableOpacity disabled={disableAll} style={styles.labelButton}
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
                        <Text style={[styles.subTitle, {color: "#ca8a04"}]}>Participants:</Text>
                        <TouchableOpacity disabled={disableAll} style={styles.labelButton}
                                          onPress={() => setStep("friends")}>
                            <View style={[styles.labelContainer, {marginBottom: 0}]}>
                                <Ionicons name="arrow-back" size={15} color="white"/>
                                <Text style={styles.buttonText}>Friends</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.vStack}>

                        {friends.map((friend, i) => (
                            <FriendComponent key={i} friend={friend} style={styles.friend}/>
                        ))}
                    </View>
                </View>
                <Divider/>

                <TouchableOpacity disabled={disableAll} onPress={handleConfirm}
                                  style={styles.applicationButton}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </ScrollView>
        </PageView>

    );
};

export default EventSummarize;
//TODO stylowanie mocno powiązane z EventCreationCalendar i EventAvailability picker i pewnie innymi z tej podstrony
const styles = StyleSheet.create({

    //To w ogóle można wyciągnąc jako jakiś aPlication view bo
    // takie stylowanie będę dawał wszędzie gdzie jest ten navbar obsrany
    animation: {
        position: "absolute",
        top: "-50%",
        height: "200%",
        width: "100%",
        zIndex:10,
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
    subTitle: {
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
        backgroundColor: "#414040",
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
        backgroundColor: "#414040",
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
        fontWeight: "bold",
    },
    vStack: {
        flexDirection: "column",
        gap: 12,
    },
    friend: {
        backgroundColor: "#414040",
        padding: 8,
        borderRadius: 8,

    },
    applicationButton: {
        backgroundColor: "#ca8a04",
        borderRadius: 8,
        alignItems: "center",
        padding: 16
    },
    errorText: {
        color: "#ef4444",//error-500
    }


});
