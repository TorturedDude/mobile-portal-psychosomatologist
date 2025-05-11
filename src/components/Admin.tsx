import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../shared/button/button';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../shared/tokens';

const Admin = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Button text="Перейти к редактированию курсов" onPress={() => navigation.navigate("RedactCourse")}/>
            <Button text="Перейти к редактированию статей в блоге" onPress={() => navigation.navigate("RedactPosts")}/>
            <Button text="Перейти к отзывам" onPress={() => navigation.navigate("RedactReview")}/>
        </View>
    );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: Colors.white,
    padding: 55,
    gap: 7,
    justifyContent: 'center',
  },
});