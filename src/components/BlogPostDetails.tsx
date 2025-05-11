import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "../shared/button/button";
import { Colors, Fonts, Radius } from "../shared/tokens";
import { IPost } from "../types/types";
import { useEffect, useState } from "react";
import { api } from "../api/api";

type RootStackParamList = {
    BlogPostDetails: {
        id: number
    };
};

type BlogPostDetailsScreenProps = { 
    route: RouteProp<RootStackParamList, 'BlogPostDetails'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'BlogPostDetails'>;
}

export function BlogPostDetailsScreen({ route }: BlogPostDetailsScreenProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [post, setPost] = useState<IPost>();
    const { id } = route.params;

    useEffect(() => {
        const loadPost = async () => {
            try {
                const response = api.get(`api/posts/${id}`)
                const post = JSON.parse(JSON.stringify((await response).data))

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
            <Text style={styles.title}>{title}</Text>
            <Image source={image} style={styles.image} />
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.date}>{date}</Text>
            <View style={styles.buttonContainer}>
                <Button text="Оставить отзыв" />
            </View>
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
});