import { useAuth } from "../../../contexts/authContext";
import { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    TextInput,
    StyleSheet,
    Text,
} from "react-native";
import AddFriendComponent from "../../../components/friendlist/AddFriendComponent";

const FindFriendsScreen = () => {
    const { user } = useAuth();

    const [newFriends, setNewFriends] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchNewFriends = async (userId) => {
        try {
            const response = await fetch(`http://34.116.250.33:8080/api/friends/${userId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error("Błąd pobierania znajomych");

            const data = await response.json();
            setNewFriends(data);
            setFilteredFriends(data);
            setSearchQuery("");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNewFriends(user.id);
    }, []);

    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = newFriends.filter((friend) =>
            friend.username.toLowerCase().includes(query) ||
            friend.email.toLowerCase().includes(query)
        );
        setFilteredFriends(filtered);
    }, [searchQuery]);

    return (
        <View style={styles.flex}>
            <View style={styles.container}>
                <TextInput

                    style={styles.input}
                    placeholder="Szukaj znajomych..."
                    placeholderTextColor={"#ca8a04"}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                {filteredFriends.map((friend) => (
                    <AddFriendComponent key={friend.id} friend={friend} />
                ))}
            </ScrollView>
        </View>
    );
};

export default FindFriendsScreen;

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: "#272625", // albo dynamicznie z theme
    },
    container: {
        flexGrow: 1,
        padding: 20,
    },
    input: {
        borderWidth: 2,
        backgroundColor: "#e4e4e4",
        borderColor:"#ca8a04",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 45,
        fontSize: 16,
        color: "#ca8a04",
        marginBottom: 20,
    },
});
