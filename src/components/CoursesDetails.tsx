import { RouteProp } from "@react-navigation/native";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "../shared/button/button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors, Fonts, Radius } from "../shared/tokens";

type RootStackParamList = {
    CourseDetails: {
        title: string;
        description: string;
        price: string;
        duration: string;
        image: any;
    };
};

type CourseDetailsScreenProps = {
    route: RouteProp<RootStackParamList, 'CourseDetails'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'CourseDetails'>;
};

export function CourseDetailsScreen({ route }: CourseDetailsScreenProps) {
    const { title, description, price, duration, image } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Image source={image} style={styles.image} />
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.price}>Стоимость: {price}</Text>
            <Text style={styles.duration}>{duration}</Text>
            <View style={styles.buttonContainer}>
                <Button text="Купить курс" />
                <Button text="Добавить в корзину" />
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
    duration: { 
        fontSize: 14, 
        color: '#6B7280', 
        marginBottom: 16 
    },
    buttonContainer: { 
        gap: 12 
    },
});