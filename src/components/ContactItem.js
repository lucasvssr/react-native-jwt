import { Pressable, StyleSheet, Text } from "react-native";

export default function ContactItem({ navigation, contact }) {
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate("Contact", {
          contact: contact,
        })
      }
    >
      <Text style={styles.text}>
        {contact.firstName} - {contact.lastName}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderColor: "#2C3F6F",
    borderWidth: 2,
    minHeight: 100,
    backgroundColor: "#F8F6F5",
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
