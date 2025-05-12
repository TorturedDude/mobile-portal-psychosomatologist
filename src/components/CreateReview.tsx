import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Colors } from '../shared/tokens';
import { Button } from '../shared/button/button';
import { api } from '../api/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IReviewCreate {
    rating: number;
    decription: string;
    postId: number
}

type RootStackParamList = {
    CreateReview: {
        id: number
    };
};

type ReviewCreateScreenProps = {
    route: RouteProp<RootStackParamList, 'CreateReview'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'CreateReview'>;
};

const CreateReview = ({ route }: ReviewCreateScreenProps) => {
    const navigation = useNavigation();
    const postId = route.params.id
    const [formData, setFormData] = useState<IReviewCreate>({
        rating: 0,
        decription: '',
        postId: postId || 0
    });

    const handleCreate = async () => {
        try {
            console.log('Creating review:', formData);

            const response = await api.post("api/reviews", formData)
            console.log(response)

            const id = JSON.parse(JSON.stringify(response.data))
            console.log(id)

            if (id) {
                alert("Отзыв добавлен")
            }
        } catch (error) {
            console.error(error)
        }
    };

    const updateFormData = (key: keyof IReviewCreate, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Создание отзыва</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Рейтинг (0-5)"
                    value={formData.rating.toString()}
                    onChangeText={text => {
                        const rating = parseInt(text);
                        if (!isNaN(rating) && rating >= 0 && rating <= 5) {
                            updateFormData('rating', rating);
                        }
                    }}
                    keyboardType="numeric"
                />
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Описание отзыва"
                    value={formData.decription}
                    onChangeText={text => updateFormData('decription', text)}
                    multiline
                    numberOfLines={4}
                    autoCapitalize="sentences"
                    autoCorrect={false}
                />
                <Button text="Создать" onPress={handleCreate} />
            </View>
        </ScrollView>
    );
};

export default CreateReview;

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