import { RouteProp } from "@react-navigation/native";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "../shared/button/button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors, Fonts, Gaps, Radius } from "../shared/tokens";
import { useEffect, useState } from "react";
import { ICourse } from "../types/types";
import { api, parse } from "../api/api";

type RootStackParamList = {
    CourseDetails: {
        id: number
    };
};

type CourseDetailsScreenProps = {
    route: RouteProp<RootStackParamList, 'CourseDetails'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'CourseDetails'>;
};

export function CourseDetailsScreen({ route }: CourseDetailsScreenProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [course, setCourse] = useState<ICourse>();
    const { id } = route.params;

    useEffect(() => {
        const loadCourse = async () => {
            try {
                const response = await api.get(`/api/course/${id}`);
                console.log(response.data)
                const course = JSON.parse(JSON.stringify(response.data))

                setCourse(course)
            } catch (error) {
                console.error('Error loading course:', error);
            } finally {
                setLoading(false)
            }
        };
        loadCourse();
    }, [])

    return (
        <View style={styles.container}>
            {course ? (
            <View style={styles.content}>
                <Text style={styles.title}>{course.title}</Text>
                <Image source={require('../../assets/posts/stress.jpg')} style={styles.image} />
                <Text style={styles.description}>{course.description}</Text>
                <Text style={styles.price}>Стоимость: {course.price}</Text>
                <Text style={styles.duration}>{course.duration}</Text>
                <View style={styles.buttonContainer}>
                    <Button text="Купить курс" />
                    <Button text="Добавить в корзину" />
                </View>
            </View>
            ) : (
                <Text>Не удалось загрузить выбранный курс.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
    },
    content: {
        alignItems: 'center',
        gap: Gaps.g16,
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
    duration: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 16
    },
    buttonContainer: {
        gap: 12
    },
});