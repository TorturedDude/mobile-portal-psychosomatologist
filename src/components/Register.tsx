import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { IUserCreate } from '../types/types';
import { ScrollView, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { Button } from '../shared/button/button';
import { useAuth } from '../hooks/useAuth';
import { api } from '../api/api';

export const Register = () => {
    const navigation = useNavigation();
    const { setToken } = useAuth();
    const [formData, setFormData] = useState<IUserCreate>({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        try {
            // Логика регистрации (например, вызов API)
            console.log('Register with:', formData);

            const response = await api.post("/auth/sign-up", formData)
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

            navigation.navigate("Profile")
        } catch (error) {
            console.error(error)
        }
    };

    const updateFormData = (key: keyof IUserCreate, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image
                    source={require('../../assets/doctor-svgrepo-com.png')} // Замените на путь к изображению врача
                    style={styles.image}
                    resizeMode="contain"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Имя"
                    value={formData.firstName}
                    onChangeText={text => updateFormData('firstName', text)}
                    autoCapitalize="words"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Фамилия"
                    value={formData.lastName}
                    onChangeText={text => updateFormData('lastName', text)}
                    autoCapitalize="words"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={text => updateFormData('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Имя пользователя"
                    value={formData.username}
                    onChangeText={text => updateFormData('username', text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Пароль"
                        value={formData.password}
                        onChangeText={text => updateFormData('password', text)}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={20}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>
                <Button text="Зарегистрироваться" onPress={handleRegister} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    image: {
        width: 100,
        height: 200,
        marginBottom: 40,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
    },
    pickerContainer: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
    },
    picker: {
        width: '100%',
        height: 50,
    },
    passwordContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});