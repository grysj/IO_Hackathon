import { ScrollView, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  Input,
  InputField,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import Divider from "../ui/Divider";
import DateTimePickerBox from "./DateTimePickerBox";
import CustomDivider from "../ui/CustomDivider";
import React, { useState } from "react";
import { formatDateTimeToLocalDateTime } from "@/util/format/FormatDateTime";
import EventSlotCustomizer from "./EventSlotCustomizer";

const DateTimeRangePicker = ({
  friendIds,
  availableSlots,
  setAvailableSlots,
  dateStart,
  setDateStart,
  dateEnd,
  setDateEnd,
  setShowCalendar,
  selectedSlot,
  setSelectedSlot,
  onConfirm,
}) => {
  const [minDuration, setMinDuration] = useState("60");
  const [showTimeStart, setShowTimeStart] = useState(false);
  const [showTimeEnd, setShowTimeEnd] = useState(false);
  const [showDateStart, setShowDateStart] = useState(false);
  const [showDateEnd, setShowDateEnd] = useState(false);
  const [showSlotCustomizer, setShowSlotCustomizer] = useState(false);
  const [disableCalendarButton, setDisableCalendarButton] = useState(true);
  const [disableCustomizeAvailability, setDisableCustomizeAvailability] =
    useState(true);
  const fetchAvailabilities = async (friendsId) => {
    try {
      console.log(friendsId);

      const response = await fetch(
        "http://34.116.250.33:8080/api/availability/find",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            dateStart: formatDateTimeToLocalDateTime(dateStart),
            dateEnd: formatDateTimeToLocalDateTime(dateEnd),
            minDuration: `PT${minDuration}M`,
            usersId: friendsId,
          }),
        }
      );

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      const data = await response.json();
      setAvailableSlots(data);
      setSelectedSlot({ dateStart, dateEnd: dateStart });
    } catch (err) {
      console.error("Błąd podczas pobierania dostępności:", err.message);
    }
  };
  const setButtons = () => {
    setDisableCalendarButton(true);
    setShowSlotCustomizer(false);
    setDisableCustomizeAvailability(true);
  };
  return (
    <Box
      className="flex-1 bg-background-50"
      style={{
        padding: 5,
      }}
    >
      <View className="flex-row items-center gap-2 mb-1">
        <Ionicons name="time" size={30} color="#ca8a04" />
        <Text className="text-2xl font-bold text-white">Check time range</Text>
      </View>
      <ScrollView>
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
              style={{ color: "#ca8a40" }}
              placeholderTextColor="#aaa"
            />
          </Input>
          <Divider />
          <View className="flex-row alifne items-center gap-2 mb-2">
            <Ionicons name="calendar-number" size={24} color="#ca8a40" />
            <Text className="text-xl font-semibold text-white">
              Dates range:
            </Text>
          </View>

          <HStack space="md" className="flex-row gap-2">
            <DateTimePickerBox
              type={"date"}
              value={dateStart}
              onChange={setDateStart}
              visible={showDateStart}
              setButtons={setButtons}
              setVisible={setShowDateStart}
            ></DateTimePickerBox>
            <DateTimePickerBox
              label={"To:"}
              type={"date"}
              value={dateEnd}
              onChange={setDateEnd}
              visible={showDateEnd}
              setVisible={setShowDateEnd}
              setButtons={setButtons}
            ></DateTimePickerBox>
          </HStack>
          <Divider />
          <View className="flex-row alifne items-center gap-2 mb-2">
            <Ionicons name="timer" size={28} color="#ca8a04" />
            <Text className="text-xl font-semibold text-white">
              Hours range:
            </Text>
          </View>

          <HStack space="md" className="flex-row gap-2">
            <DateTimePickerBox
              value={dateStart}
              onChange={setDateStart}
              visible={showTimeStart}
              setVisible={setShowTimeStart}
              setButtons={setButtons}
            ></DateTimePickerBox>
            <DateTimePickerBox
              label={"To:"}
              value={dateEnd}
              onChange={setDateEnd}
              visible={showTimeEnd}
              setVisible={setShowTimeEnd}
              setButtons={setButtons}
            ></DateTimePickerBox>
          </HStack>
          <Divider />

          <TouchableOpacity
            onPress={() =>
              fetchAvailabilities(friendIds).then(() => {
                setDisableCalendarButton(false);
                setDisableCustomizeAvailability(false);
              })
            }
            className="bg-yellow-600 p-4 rounded-lg items-center"
          >
            <Text className="text-white font-bold">Refresh Availability</Text>
          </TouchableOpacity>
        </VStack>

        <VStack space="md" className={"gap-2"}>
          {availableSlots.map((slot, index) => {
            const isSelected = selectedSlot?.dateStart === slot.dateStart;
            return (
              <Pressable
                key={index}
                onPress={() => {
                  setSelectedSlot(slot);
                }}
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
                  {new Date(slot.dateStart).toLocaleDateString()}{" "}
                  {new Date(slot.dateStart).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  - {new Date(slot.dateEnd).toLocaleDateString()}{" "}
                  {new Date(slot.dateEnd).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Pressable>
            );
          })}
        </VStack>
        <Divider style={{ height: 2 }} />
        <TouchableOpacity
          disabled={disableCalendarButton}
          onPress={() => setShowCalendar(true)}
          className="bg-yellow-600 p-4 rounded-lg items-center"
        >
          <Text className="text-white font-bold">Check On Calendar</Text>
        </TouchableOpacity>
        <CustomDivider style={{ height: 2 }} marginVertical={12}>
          <Text style={{ color: "white" }}>OR</Text>
        </CustomDivider>

        {showSlotCustomizer ? (
          <EventSlotCustomizer
            dateMin={dateStart}
            dateMax={dateEnd}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            onConfirm={onConfirm}
          />
        ) : (
          <TouchableOpacity
            disabled={disableCustomizeAvailability}
            onPress={() => setShowSlotCustomizer(true)}
            className="bg-yellow-600 p-4 rounded-lg items-center"
          >
            <Text className="text-white font-bold">Customize Event Time</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </Box>
  );
};
export default DateTimeRangePicker;
