
import { Box, VStack, HStack, Text, ScrollView, Pressable } from '@gluestack-ui/themed';

import Calendar from "../../components/calendar/Calendar";
import {useAuth} from "../../contexts/authContext";









const CalendarScreen = () => {
   const {user} = useAuth()

    return (
        <Box className="flex-1 bg-background-50 ">
            <Calendar user={user}/>
        </Box>
    );
};

export default CalendarScreen;
