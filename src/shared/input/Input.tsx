import { useState } from "react";
import { TextInput, TextInputProps, View, StyleSheet, Pressable } from "react-native";
import { Colors, Radius } from "../tokens";
import EyeOpenIcon from "../../icons/eye-open";
import EyeClosedIcon from "../../icons/eye-closed";

export function Input({isPassword, ...props}: TextInputProps & {isPassword?: boolean}) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    return (
        <View>
            <TextInput
            style = {styles.input}
            secureTextEntry={isPassword && !isPasswordVisible}
            placeholderTextColor={Colors.grey}
            {...props}/>
            {isPassword && <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                {isPasswordVisible ? <EyeOpenIcon/> : <EyeClosedIcon/>}
            </Pressable>}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 58,
        backgroundColor: Colors.mint,
        paddingHorizontal: 24,
        borderRadius: Radius.r10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.black
    },
    eyeIcon: {
        position: 'absolute',
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 20
    }
});