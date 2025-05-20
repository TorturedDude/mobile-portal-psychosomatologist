import { View, Text, StyleSheet } from "react-native";
import { Colors, Gaps, Radius } from "../shared/tokens";


export function SessionScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>Данный функционал будет доступен в следующем релизе. Надеемся на ваше понимание.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: Colors.white,
        padding: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        alignItems: 'center',
        gap: Gaps.g16,
        borderRadius: Radius.r10,
    }
});