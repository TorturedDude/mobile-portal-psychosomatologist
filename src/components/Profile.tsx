import { ActivityIndicator, Image, Text, View, StyleSheet } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../shared/button/button";
import { useEffect, useState } from "react";
import { IUser } from "../types/types";
import { api, parse } from "../api/api";
import { Colors, Gaps, Radius } from "../shared/tokens";

export function Profile() {
    const { logout } = useAuth();
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await api.get("/auth/me");
                const data = parse(response.data);
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {user ? (
                <View style={styles.content}>
                    <Image
                        source={require("../../assets/avatar.png")} // или URI: { uri: user.avatarUrl }
                        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
                    />
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
                        {user.firstName} {user.lastName}
                    </Text>
                    <Text style={{ fontSize: 14, color: "gray" }}>{user.email}</Text>
                </View>
            ) : (
                <Text>Не удалось загрузить данные пользователя.</Text>
            )}
            <Button text="Выйти" onPress={logout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: Colors.white,
        padding: 55,
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        gap: Gaps.g16,
        borderRadius: Radius.r10,
    },
    form: {
        alignSelf: 'stretch',
        gap: Gaps.g16
    },
    logo: {
        width: 100,
        height: 150,
    }
});
