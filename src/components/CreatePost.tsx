import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../shared/tokens';
import { IPostCreate } from '../types/types';
import { Button } from '../shared/button/button';
import { api } from '../api/api';

const CreatePost = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState<IPostCreate>({
        title: '',
        description: '',
        publishDate: new Date(),
    });
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleCreate = async () => {
        try {
            console.log('Creating post:', formData);
            
            const response = await api.post("api/posts", formData)
            console.log(response)

            const id = JSON.parse(JSON.stringify(response.data))
            console.log(id)

            if (id) {
                alert("Пост был создан")
            }
        } catch (error) {
            console.error(error)
        }
    };

    const updateFormData = (key: keyof IPostCreate, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || formData.publishDate;
        setShowDatePicker(Platform.OS === 'ios');
        updateFormData('publishDate', currentDate);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image
                    source={require('../../assets/doctor-svgrepo-com.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Создание поста</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Заголовок поста"
                    value={formData.title}
                    onChangeText={text => updateFormData('title', text)}
                    autoCapitalize="sentences"
                    autoCorrect={false}
                />
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Описание поста"
                    value={formData.description}
                    onChangeText={text => updateFormData('description', text)}
                    multiline
                    numberOfLines={4}
                    autoCapitalize="sentences"
                    autoCorrect={false}
                />
                <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={styles.datePickerText}>
                        Дата публикации: {formData.publishDate.toLocaleDateString()}
                    </Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={formData.publishDate}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                    />
                )}
                <Button text="Создать" onPress={handleCreate}/>
            </View>
        </ScrollView>
    );
};

export default CreatePost;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingVertical: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 200,
        marginBottom: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
        paddingVertical: 10,
    },
    datePickerButton: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
    },
    datePickerText: {
        fontSize: 16,
        color: '#333',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});