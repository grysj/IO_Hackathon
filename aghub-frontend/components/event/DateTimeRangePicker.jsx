import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import ScrollView from "../ui/scrollview/StyledScrollView";
import {Ionicons} from "@expo/vector-icons";
import {Input, InputField} from "@gluestack-ui/themed";
import Divider from "../ui/Divider";
import DateTimePickerBox from "./DateTimePickerBox";
import CustomDivider from "../ui/CustomDivider";
import React, {useState} from "react";
import {formatDateTimeToLocalDateTime,} from "/util/format/FormatDateTime";
import EventSlotCustomizer from "./EventSlotCustomizer";
import PageView from "../ui/PageView";
import PageHeader from "../ui/PageHeader";
import HBox from "../ui/HBox";
import PageButton from "../ui/PageButton";
import {isTheSameDate} from "../util/calendarUtils";
import AvailabilityList from "./AvailabilityList";


const DateTimeRangePicker = ({
                                 usersId,
                                 availableSlots,
                                 setAvailableSlots,
                                 dateStart,
                                 setDateStart,
                                 dateEnd,
                                 setDateEnd,
                                 setShowCalendar,
                                 selectedSlot,
                                 setSelectedSlot,
                                 onConfirm
                             }) => {
    const [minDuration, setMinDuration] = useState("60");
    const [showTimeStart, setShowTimeStart] = useState(false)
    const [showTimeEnd, setShowTimeEnd] = useState(false)
    const [showDateStart, setShowDateStart] = useState(false)
    const [showDateEnd, setShowDateEnd] = useState(false)
    const [showSlotCustomizer, setShowSlotCustomizer] = useState(false)
    const [disableCalendarButton, setDisableCalendarButton] = useState(true)
    const [disableCustomizeAvailability, setDisableCustomizeAvailability] = useState(true)
    const fetchAvailabilities = async (friendsId) => {
        try {
            console.log(friendsId)

            const response = await fetch("http://34.116.250.33:8080/api/availability/find", {
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
            });


            if (!response.ok) {
                const err = await response.text();
                throw new Error(err);
            }

            const data = await response.json();
            setAvailableSlots(data);
            setSelectedSlot({dateStart, dateEnd: dateStart})
        } catch (err) {
            console.error("Błąd podczas pobierania dostępności:", err.message);
        }
    };
    const setButtons = () => {
        setDisableCalendarButton(true)
        setShowSlotCustomizer(false)
        setDisableCustomizeAvailability(true)
    }
    return (
        <PageView>
            <PageHeader>
                <Ionicons name="time" size={30} color="#ca8a04"/>
                <Text style={styles.title}>
                    Check time range
                </Text>
            </PageHeader>
            {/*//TODO zrobić tak w innych podstronach tak jak tu*/}

            <ScrollView>

                <Text style={styles.sectionText}>
                    Minimal duration of event (minutes)
                </Text>
                <Input style={styles.inputWrapper}>
                    <InputField
                        keyboardType="numeric"
                        value={minDuration}
                        onChangeText={setMinDuration}
                        placeholder="Np. 60"
                        placeholderTextColor="#aaa"
                        style={styles.inputField}
                    />
                </Input>

                <Divider/>
                <View style={styles.sectionHeader}>
                    <Ionicons name="calendar-number" size={24} color="#ca8a04"/>
                    <Text style={styles.sectionText}>Dates range:</Text>
                </View>


                <HBox>
                    <DateTimePickerBox type={"date"} value={dateStart} onChange={setDateStart}
                                       visible={showDateStart} setButtons={setButtons}
                                       setVisible={setShowDateStart}></DateTimePickerBox>
                    <DateTimePickerBox label={"To:"} type={"date"} value={dateEnd} onChange={setDateEnd}
                                       visible={showDateEnd} setVisible={setShowDateEnd}
                                       setButtons={setButtons}></DateTimePickerBox>
                </HBox>
                <Divider/>
                <View style={styles.sectionHeader}>
                    <Ionicons name="timer" size={28} color="#ca8a04"/>
                    <Text style={styles.sectionText}>
                        Hours range:
                    </Text>
                </View>

                <HBox>
                    <DateTimePickerBox value={dateStart} onChange={setDateStart} visible={showTimeStart}
                                       setVisible={setShowTimeStart}
                                       setButtons={setButtons}></DateTimePickerBox>
                    <DateTimePickerBox label={"To:"} value={dateEnd} onChange={setDateEnd} visible={showTimeEnd}
                                       setVisible={setShowTimeEnd}
                                       setButtons={setButtons}></DateTimePickerBox>
                </HBox>
                <Divider/>


                <PageButton
                    title="Refresh Availability"
                    onPress={() => fetchAvailabilities(usersId).then(() => {
                        setDisableCalendarButton(false)
                        setDisableCustomizeAvailability(false)
                    })}
                    disabled={isTheSameDate(dateStart, dateEnd)}
                />


                <AvailabilityList
                    availableSlots={availableSlots}
                    selectedSlot={selectedSlot}
                    setSelectedSlot={setSelectedSlot}
                />
                <Divider style={{height: 2}}/>

                <PageButton
                    title="Check On Calendar"
                    onPress={() => setShowCalendar(true)}
                    disabled={disableCalendarButton}
                />
                <CustomDivider style={{height: 2}} marginVertical={12}>
                    <Text style={{color: "white"}}>OR</Text>
                </CustomDivider>

                {showSlotCustomizer ? <EventSlotCustomizer dateMin={dateStart}
                                                           dateMax={dateEnd}
                                                           selectedSlot={selectedSlot}
                                                           setSelectedSlot={setSelectedSlot}
                                                           onConfirm={onConfirm}

                /> : <PageButton disabled={disableCustomizeAvailability}
                                 onPress={() => setShowSlotCustomizer(true)}
                                 title={"Customize Event Time"}
                />


                }

            </ScrollView>
        </PageView>
    )
};
export default DateTimeRangePicker

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        lineHeight: 30,
        fontWeight: "600",
        color: "white",
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
    sectionText: {
        fontSize: 20,
        fontWeight: "600",
        color: "white",
    },
    inputWrapper: {
        backgroundColor: "#535252",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        marginTop: 4
    },
    inputField: {
        color: "#ca8a04",           // tekst wpisywany
        fontSize: 16,
    },
})