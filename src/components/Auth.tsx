import { useState } from "react";
import { Dimensions, View, Text, StyleSheet, Image } from "react-native";
import { Input } from "../shared/input/Input";
import { Button } from "../shared/button/button";
import { Colors, Gaps, Radius } from "../shared/tokens";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { api } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Auth() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { setToken } = useAuth();

    const navigation = useNavigation();

    const login = async () => {
        try {
            const response = await api.post('/auth/sign-in', {
                username,
                password
            })

            const raw = response.data

            if (typeof raw === 'string' && raw.startsWith('data:')) {
                const jsonPart = raw.replace(/^data:/, '');
                const parsed = JSON.parse(jsonPart);
                const token = parsed.accessToken;

                if (!token) {
                    console.error('Login failed: accessToken not found in parsed response');
                    return;
                }

                setToken(token);
            }

        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/doctor-svgrepo-com.png')}
                />
                <View style={styles.form}>
                    <Input defaultValue={username} onChangeText={usernamelValue => setUsername(usernamelValue)} placeholder='Email' isPassword={false} />
                    <Input defaultValue={password} onChangeText={passwordValue => setPassword(passwordValue)} placeholder='Password' isPassword={true} />
                    <Button onPress={login} text={'Войти'} />
                    <Button text={'Восстановить пароль'} />
                </View>
            </View>
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
        gap: Gaps.g50,
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