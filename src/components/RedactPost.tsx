import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../shared/button/button';
import { Colors } from '../shared/tokens';

const RedactPost = () => {
    const navigation = useNavigation();
    
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Экран редактирования курсов</Text>
                <Button text="Создать курс" onPress={() => navigation.navigate("CreatePost")}/>
            </View>
        );
};

export default RedactPost;

const styles = StyleSheet.create({
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
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});