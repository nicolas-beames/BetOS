import { useState } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Modal,
    FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DropdownComponent({
    data = [],
    selectedValue,
    onValueChange,
    placeholder = "Selecione...",
}) {
    const [visible, setVisible] = useState(false);

    const selectedLabel =
        data.find((item) => item.value === selectedValue)?.label || placeholder;

    return (
        <View style={styles.container}>
            {/* Botão principal */}
            <Pressable
                style={styles.dropdownButton}
                onPress={() => setVisible(true)}
            >
                <Text
                    style={[
                        styles.selectedText,
                        selectedValue ? { color: "#000" } : { color: "#888" },
                    ]}
                >
                    {selectedLabel}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#555" />
            </Pressable>

            {/* Modal da lista */}
            <Modal
                visible={visible}
                animationType="fade"
                transparent
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    style={styles.overlay}
                    onPress={() => setVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={styles.option}
                                    onPress={() => {
                                        onValueChange(item.value);
                                        setVisible(false);
                                    }}
                                >
                                    <Text style={styles.optionText}>
                                        {item.label}
                                    </Text>
                                </Pressable>
                            )}
                            ItemSeparatorComponent={() => (
                                <View style={styles.separator} />
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    dropdownButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#fff",
    },
    selectedText: {
        fontSize: 15,
        color: "#000",
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
        padding: 20,
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 12,
        width: "100%",
        maxHeight: "60%",
        paddingVertical: 10,
    },
    option: {
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    optionText: {
        fontSize: 16,
        color: "#333",
    },
    separator: {
        height: 1,
        backgroundColor: "#eee",
        marginHorizontal: 10,
    },
});
