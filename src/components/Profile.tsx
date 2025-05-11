import { ActivityIndicator, Image, Text, View, StyleSheet } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../shared/button/button";
import { useEffect, useState } from "react";
import { IUser } from "../types/types";
import { api, parse } from "../api/api";
import { Colors, Gaps, Radius } from "../shared/tokens";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Auth: undefined;
    Profile: undefined;
    Admin: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function Profile() {
    const navigation = useNavigation<NavigationProp>();
    const { logout, isAuthenticated } = useAuth();
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    console.log("isAuthenticated:", isAuthenticated);

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

    const handleLogout = async () => {
        try {
            await logout();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
            });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

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
                        source={require("../../assets/avatar.png")}
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
            {user?.role === "ROLE_ADMIN" ? (
                <Button text="Войти в админ панель" onPress={() => navigation.navigate("Admin")} />
            ) : (
                <Button text="Поменять пароль" />
            )}
            <Button text="Выйти" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: Colors.white,
        padding: 55,
        gap: 7,
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