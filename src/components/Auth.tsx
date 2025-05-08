import { useState } from "react";
import { Dimensions, View, Text, StyleSheet, Image } from "react-native";
import { Input } from "../shared/input/Input";
import { Button } from "../shared/button/button";
import { Colors, Gaps, Radius } from "../shared/tokens";
import { useNavigation } from "@react-navigation/native";

export function Auth() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigation = useNavigation();

    const width = Dimensions.get('window').width

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image 
                style = {styles.logo}
                source={require('../../assets/doctor-svgrepo-com.png')}
                />
                <View style={styles.form}>
                    <Input defaultValue={email} onChangeText={emailValue => setEmail(emailValue)} placeholder='Email' isPassword={false} />
                    <Input defaultValue={password} onChangeText={passwordValue => setPassword(passwordValue)} placeholder='Password' isPassword={true} />
                    <Button onPress={() => navigation.navigate('Chat')} text={'Войти'} />
                    <Button text={'Восстановить пароль'}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: Colors.white,
        padding: 55,
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        gap: Gaps.g50,
        borderRadius: Radius.r10,
    },
    form: {
        alignSelf: 'stretch',
        gap: Gaps.g16
    },
    logo: {
        width: 100,
        height: 150,
    }
});