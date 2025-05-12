import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { api } from '../api/api';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Fonts, Gaps, Radius } from '../shared/tokens';

interface IReviewCreate {
    id: number,
    rating: number,
    decription: string,
    postId: number,
}

type RootStackParamList = {
    Reviews: {
        id: number
    };
};

type ReviewsScreenProps = {
    route: RouteProp<RootStackParamList, 'Reviews'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'Reviews'>;
}

const Reviews = ({ route }: ReviewsScreenProps) => {
    const [reviews, setReviews] = useState<IReviewCreate[]>();
    const [loadingReviews, setLoadingReviews] = useState<boolean>(true);
    const { id } = route.params;

    useEffect(() => {
        const load = async () => {
            try {
                const response = await api.get(`/api/reviews/${id}`);
                console.log(response)

                const reviews = JSON.parse(JSON.stringify(response.data))
                console.log(reviews)
                setReviews(reviews);
            } catch (error) {
                console.error("Error loading reviews for post id = ", id, error);
            } finally {
                setLoadingReviews(false);
            }
        };
        load();
    }, [])

    return (
        <View style={styles.content}>
            <Text style={styles.title}>Отзывы</Text>
                {reviews ? (
                    <FlatList
                data={reviews}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.textContent}>
                            <Text>{item.decription}</Text>
                            <Text>{item.rating}</Text>
                        </View>
                    </View>)}
                contentContainerStyle={{ paddingBottom: 16 }}
                showsVerticalScrollIndicator={true}
            />) : (
                <Text>Не удалось отобразить отзывы</Text>
            )}
        </View>
    );
};

export default Reviews;

const styles = StyleSheet.create({
    container: {
        flex: 10,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: Colors.white
    },
    content: {
        padding: 100,
        justifyContent: 'center',
        gap: Gaps.g50,
        borderRadius: Radius.r10,
    },
    title: {
        fontSize: Fonts.f18,
        fontWeight: 'bold',
        marginBottom: 12
    },
    image: {
        height: 200,
        resizeMode: 'cover',
        borderRadius: Radius.r10,
        marginBottom: 12
    },
    description: {
        fontSize: Fonts.f16,
        marginBottom: 12
    },
    price: {
        fontSize: Fonts.f16,
        fontWeight: 'bold'
    },
    date: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 16
    },
    buttonContainer: {
        gap: 12
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#F9FAFB',
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    },
    textContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
});