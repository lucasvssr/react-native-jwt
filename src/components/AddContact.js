import { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
} from "react-native";

export function AddContact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleAddContact = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="First Name"
          style={styles.input}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Phone"
          style={styles.input}
          keyboardType="phone-pad"
          onChangeText={setPhone}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <Pressable style={styles.button} onPress={handleAddContact}>
          <Text style={styles.text}>Add Contact</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    backgroundColor: "#F8F6F5",
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 50,
    gap: 15,
    borderRadius: 8,
  },
  input: {
    borderColor: "#2661DD",
    borderWidth: 2,
    borderRadius: 6,
    backgroundColor: "white",
    height: 45,
    minWidth: 300,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 25,
    backgroundColor: "#44997c",
    width: 200,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  text: {
    color: "#F8F6F5",
  },
});
