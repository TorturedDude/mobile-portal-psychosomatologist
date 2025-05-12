import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Button } from "../shared/button/button";
import { Colors, Fonts, Gaps, Radius } from "../shared/tokens";
import { IPost } from "../types/types";
import { useEffect, useState } from "react";
import { api } from "../api/api";

type RootStackParamList = {
    BlogPostDetails: {
        id: number
    };
};

interface IReviewCreate {
    id: number,
    rating: number,
    decription: string,
    postId: number,
}

type BlogPostDetailsScreenProps = {
    route: RouteProp<RootStackParamList, 'BlogPostDetails'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'BlogPostDetails'>;
}

export function BlogPostDetailsScreen({ route }: BlogPostDetailsScreenProps) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(true);
    const [post, setPost] = useState<IPost>();
    const [reviews, setReviews] = useState<IReviewCreate[]>();
    const { id } = route.params;

    useEffect(() => {
        const loadPost = async () => {
            try {
                const response = await api.get(`api/posts/${id}`)
                const post = JSON.parse(JSON.stringify(response.data))

                setPost(post)
            } catch (error) {
                console.error('Error loading post with id = ', id, error)
            } finally {
                setLoading(false)
            }
        };

        loadPost();
    }, [])

    return (
        <View style={styles.container}>
            {post ? (
                <View style={styles.content}>
                    <Text style={styles.title}>{post.title}</Text>
                    <Image source={require('../../assets/posts/stress.jpg')} style={styles.image} />
                    <Text style={styles.description}>{post.description}</Text>
                    <Text style={styles.date}>{post.publishDate.toString()}</Text>
                    <View style={styles.buttonContainer}>
                        <Button text="Оставить отзыв" onPress={()=> navigation.navigate("CreateReview", {id: id})} />
                        <Button text="Посмотреть отзывы" onPress={()=> navigation.navigate("Reviews", {id: id})} />
                    </View>
                </View>
            ) : (<View>
                <Text>Не удалось отобразить Пост.</Text>
            </View>)}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
    },
    content: {
        alignItems: 'center',
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