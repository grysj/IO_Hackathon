import React, {useState} from "react";
import {Box, HStack, Input, InputField, Pressable, Text, VStack, View} from "@gluestack-ui/themed";
import {Platform, StatusBar, ScrollView} from "react-native";
import DateTimePickerBox from "./DateTimePickerBox";
import Divider from "../ui/Divider";


//TODO Sprawdzić czy w friendsID jest user id
const getFormattedDate = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().split("T")[0];
};

function formatDate(newDate) {
    const date = new Date(newDate.toString())
    date.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
    return date.toISOString()
}

const AvailabilityPicker = ({friendIds = [], onConfirm}) => {
    const [minDuration, setMinDuration] = useState("60");
    const [showTimeStart, setShowTimeStart] = useState(false)
    const [showTimeEnd, setShowTimeEnd] = useState(false)
    const [showDateStart, setShowDateStart] = useState(false)
    const [showDateEnd, setShowDateEnd] = useState(false)
    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())

    const [selectedSlot, setSelectedSlot] = useState()
    const [availableSlots, setAvailableSlots] = useState([])
    const fetchAvailabilities = async (friendsId) => {
        try {
            console.log(formatDate(dateStart))
            console.log(formatDate(dateEnd))
            console.log(`PT${minDuration}M`)
            const response = await fetch("http://34.116.250.33:8080/api/availability/find", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dateStart: formatDate(dateStart),
                    dateEnd: formatDate(dateEnd),
                    minDuration: `PT${minDuration}M`,
                    usersId: friendsId,
                }),
            });
            console.log(friendsId)

            if (!response.ok) {
                const err = await response.text();
                throw new Error(err);
            }

            const data = await response.json();
            console.log(data)
            setAvailableSlots(data);
        } catch (err) {
            console.error("Błąd podczas pobierania dostępności:", err.message);
        }
    };

    const parseTimeToDate = (dateStr, timeStr) => {
        const [hour, minute] = timeStr.split(":").map(Number);
        const date = new Date(dateStr);
        date.setHours(hour, minute, 0, 0);
        return date;
    };


    const handleConfirm = () => {
        if (selectedSlot) {
            onConfirm(selectedSlot);
        }
    };

    return (
        <Box
            className="flex-1 bg-background-50 px-4"
            style={{
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 60,
                paddingBottom: 20,
            }}
        >
            <Text className="text-2xl font-bold mb-4 text-white">
                Check time range
            </Text>

            <VStack space="lg" className="mb-4">
                <Text className="text-xl font-semibold text-white">
                    Minimal duration of event (minutes)
                </Text>
                <Input className="bg-background-200 px-4 py-4 rounded-lg w-full">
                    <InputField
                        keyboardType="numeric"
                        value={minDuration}
                        onChangeText={setMinDuration}
                        placeholder="Np. 60"
                        style={{color: "#ca8a40"}}
                        placeholderTextColor="#aaa"
                    />
                </Input>
                <Divider/>
                <Text className="text-xl font-semibold text-white mt-2">
                    Dates range:
                </Text>


                <HStack space="md" className="flex-row gap-2">
                    <DateTimePickerBox type={"date"} value={dateStart} onChange={setDateStart} visible={showDateStart} setVisible={setShowDateStart} ></DateTimePickerBox>
                    <DateTimePickerBox label={"To"} type={"date"} value={dateEnd} onChange={setDateEnd} visible={showDateEnd} setVisible={setShowDateEnd} ></DateTimePickerBox>
                </HStack>
                <Divider/>

                <Text className="text-xl font-semibold text-white">
                    Hours range:
                </Text>

                <HStack space="md" className="flex-row gap-2">
                    <DateTimePickerBox value={dateStart} onChange={setDateStart} visible={showTimeStart} setVisible={setShowTimeStart} ></DateTimePickerBox>
                    <DateTimePickerBox label={"To"} value={dateEnd} onChange={setDateEnd} visible={showTimeEnd} setVisible={setShowTimeEnd} ></DateTimePickerBox>
                </HStack>
                <Divider/>




                <Pressable
                    onPress={() => fetchAvailabilities(friendIds)}
                    className="bg-yellow-600 p-4 rounded-lg items-center mt-4"
                >
                    <Text className="text-white font-bold">Refresh Availability</Text>
                </Pressable>
            </VStack>

            <ScrollView className="mb-4" style={{flexGrow: 0}}>
                <VStack space="md">
                    {availableSlots.map((slot, index) => {
                        const isSelected = selectedSlot?.startDate === slot.startDate;
                        return (
                            <Pressable
                                key={index}
                                onPress={() => setSelectedSlot(slot)}
                                className={`w-full p-4 rounded-lg border ${
                                    isSelected
                                        ? "bg-yellow-600 border-yellow-700"
                                        : "bg-background-100 border-outline-200"
                                }`}
                            >
                                <Text
                                    className={`text-lg font-semibold ${
                                        isSelected ? "text-white" : "text-typography-900"
                                    }`}
                                >
                                    {new Date(slot.startDate).toLocaleDateString()}{" "}
                                    {new Date(slot.startDate).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}{" "}
                                    -{" "}
                                    {new Date(slot.startDate).toLocaleDateString()}{" "}
                                    {new Date(slot.endDate).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </Text>
                            </Pressable>
                        );
                    })}
                </VStack>
            </ScrollView>


            <Box className="mt-4">
                {/*<Pressable*/}
                {/*    onPress={handleConfirm}*/}
                {/*    disabled={!selectedSlot}*/}
                {/*    className={`py-4 rounded-xl items-center ${*/}
                {/*        selectedSlot ? "bg-green-600" : "bg-background-muted"*/}
                {/*    }`}*/}
                {/*>*/}
                {/*    <Text className="text-white font-bold text-lg">*/}
                {/*        {selectedSlot ? "Wybierz lokalizację ➡️" : "Zaznacz termin"}*/}
                {/*    </Text>*/}
                {/*</Pressable>*/}
            </Box>
        </Box>
    );
};

export default AvailabilityPicker;
