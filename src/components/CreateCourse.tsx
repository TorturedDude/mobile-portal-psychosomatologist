import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../shared/tokens';
import { Button } from '../shared/button/button';
import { ICourseCreate } from '../types/types';
import { api } from '../api/api';


const CreateCourse = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState<ICourseCreate>({
        title: '',
        description: '',
        duration: 0,
        price: 0,
        startDate: new Date(),
    });
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleCreate = async () => {
        try {
            console.log('Creating course:', formData);

            const response = await api.post("/api/course", formData)
            console.log(response)

            const id = JSON.parse(JSON.stringify(response.data))
            console.log(id)

            if (id) {
                alert("Курс был добавлен")
            }
        } catch (error) {
            console.error(error)
        }

    };

    const updateFormData = (key: keyof ICourseCreate, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || formData.startDate;
        setShowDatePicker(Platform.OS === 'ios'); // На iOS DatePicker остается открытым, на Android закрывается автоматически
        updateFormData('startDate', currentDate);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image
                    source={require('../../assets/doctor-svgrepo-com.png')} // Замените на путь к изображению врача
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Создание курса</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Название курса"
                    value={formData.title}
                    onChangeText={text => updateFormData('title', text)}
                    autoCapitalize="sentences"
                    autoCorrect={false}
                />
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Описание курса"
                    value={formData.description}
                    onChangeText={text => updateFormData('description', text)}
                    multiline
                    numberOfLines={4}
                    autoCapitalize="sentences"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Длительность (в часах)"
                    value={formData.duration.toString()}
                    onChangeText={text => updateFormData('duration', parseInt(text) || 0)}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Цена (в рублях)"
                    value={formData.price.toString()}
                    onChangeText={text => updateFormData('price', parseInt(text) || 0)}
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={styles.datePickerText}>
                        Дата начала: {formData.startDate.toLocaleDateString()}
                    </Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={formData.startDate}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                    />
                )}
                <Button text="Создать" onPress={handleCreate} />
            </View>
        </ScrollView>
    );
};

export default CreateCourse;

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