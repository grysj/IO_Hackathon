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
            const response = await fetch(`http://34.116.250.33:8080/api/friends/new/${userId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const errorText = await response.text(); // lub response.json() jeśli API zwraca JSON
            throw new Error(errorText || "Błąd pobierania nie znajomych");

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
    const handleAddingFriends = async (friendId) => {
        try {
            const response = await fetch("http://34.116.250.33:8080/api/friends/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: user.id,
                    friend: friendId
                }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Błąd dodawania znajomego");
            }

            const data = await response.json();
            console.log("Sukces:", data.message);
            setSearchQuery("");
            setNewFriends((prev) => prev.filter((f) => f.id !== friendId));
            setFilteredFriends(newFriends);

        } catch (error) {
            console.error("Błąd:", error.message);
        }
    };

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
                    <AddFriendComponent key={friend.id} friend={friend} onClick={handleAddingFriends}/>
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
