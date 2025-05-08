import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Radius } from "../tokens";

export function Button({text, ...props}: PressableProps & {text: string}) {
    return (
        <Pressable {...props} style={styles.button}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Radius.r10,
        height: 58,
        backgroundColor: Colors.green
    },
    text: {
        color: Colors.white,
        fontSize: Fonts.f16
    }
})