import React, {useEffect, useState} from "react";
import {Box, Button, HStack, Input, InputField, Pressable, ScrollView, Text, VStack,} from "@gluestack-ui/themed";
import {Platform, StatusBar} from "react-native";

const HARDCODED_AVAILABILITY = [
    {start: "2025-04-14T10:00:00", end: "2025-04-14T11:00:00"},
    {start: "2025-04-14T14:00:00", end: "2025-04-14T15:00:00"},
    {start: "2025-04-14T19:00:00", end: "2025-04-14T20:00:00"},
    {start: "2025-04-15T09:00:00", end: "2025-04-15T10:00:00"},
    {start: "2025-04-15T12:00:00", end: "2025-04-15T13:00:00"},
    {start: "2025-04-16T16:00:00", end: "2025-04-16T17:00:00"},
];

const getFormattedDate = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().split("T")[0];
};

const AvailabilityPicker = ({friendIds = [], onConfirm}) => {
    const [minDuration, setMinDuration] = useState("60");
    const [timeRange, setTimeRange] = useState({from: "08:00", to: "23:00"});
    const [selectedDate, setSelectedDate] = useState(getFormattedDate(0));
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const dates = [getFormattedDate(0), getFormattedDate(1), getFormattedDate(2)];
    const fetchAvailabilities = async (friendsId) => {
        try {
            const startDate = parseTimeToDate(selectedDate, timeRange.from);
            const endDate = parseTimeToDate(selectedDate, timeRange.to);

            const response = await fetch("http://34.116.250.33:8080/api/availability/find", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usersId: friendsId,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    minDuration: `PT${minDuration}M`,
                }),
            });

            if (!response.ok) {
                const err = await response.text();
                throw new Error(err);
            }

            const data = await response.json();
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
                Wybierz dostępny termin
            </Text>

            <VStack space="lg" className="mb-4">
                <Text className="text-base font-semibold text-white">
                    Minimalny czas trwania (minuty):
                </Text>
                <Input className="bg-background-100 px-4 py-4 rounded-lg w-full">
                    <InputField
                        keyboardType="numeric"
                        value={minDuration}
                        onChangeText={setMinDuration}
                        placeholder="Np. 60"
                        style={{color: "#fff"}}
                        placeholderTextColor="#aaa"
                    />
                </Input>

                <Text className="text-base font-semibold text-white">
                    Zakres godzin:
                </Text>

                <HStack space="md" className="flex-row">
                    <Box className="flex-1 min-w-[100px]">
                        <Text className="text-white mb-1">Od:</Text>
                        <Input className="bg-background-100 px-4 py-4 rounded-lg w-full">
                            <InputField
                                keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"}
                                value={timeRange.from}
                                onChangeText={(text) =>
                                    setTimeRange((prev) => ({...prev, from: text}))
                                }
                                placeholder="08:00"
                                style={{color: "#fff"}}
                                placeholderTextColor="#aaa"
                            />
                        </Input>
                    </Box>
                    <Box className="flex-1 min-w-[100px]">
                        <Text className="text-white mb-1">Do:</Text>
                        <Input className="bg-background-100 px-4 py-4 rounded-lg w-full">
                            <InputField
                                keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"}
                                value={timeRange.to}
                                onChangeText={(text) =>
                                    setTimeRange((prev) => ({...prev, to: text}))
                                }
                                placeholder="23:00"
                                style={{color: "#fff"}}
                                placeholderTextColor="#aaa"
                            />
                        </Input>
                    </Box>
                </HStack>

                <Text className="text-base font-semibold text-white mt-2">
                    Dzień wydarzenia:
                </Text>
                <HStack space="md" className="flex-wrap">
                    {dates.map((date) => (
                        <Pressable
                            key={date}
                            onPress={() => setSelectedDate(date)}
                            className={`w-full px-4 py-3 rounded-lg border text-center mb-2 ${
                                selectedDate === date
                                    ? "bg-yellow-600 border-yellow-700"
                                    : "bg-background-100 border-outline-200"
                            }`}
                        >
                            <Text
                                className={`text-center ${
                                    selectedDate === date
                                        ? "text-white"
                                        : "text-typography-900"
                                }`}
                            >
                                {new Date(date).toLocaleDateString()}
                            </Text>
                        </Pressable>
                    ))}
                </HStack>


                <Pressable
                    onPress={()=>fetchAvailabilities(friendIds)}
                    className="bg-yellow-600 p-4 rounded-lg items-center mt-4"
                >
                    <Text className="text-white font-bold">Odśwież dostępność</Text>
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

            {/* Przycisk na dole */}
            <Box className="mt-4">
                <Pressable
                    onPress={handleConfirm}
                    disabled={!selectedSlot}
                    className={`py-4 rounded-xl items-center ${
                        selectedSlot ? "bg-green-600" : "bg-background-muted"
                    }`}
                >
                    <Text className="text-white font-bold text-lg">
                        {selectedSlot ? "Wybierz lokalizację ➡️" : "Zaznacz termin"}
                    </Text>
                </Pressable>
            </Box>
        </Box>
    );
};

export default AvailabilityPicker;
