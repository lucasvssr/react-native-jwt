import { View, StyleSheet } from "react-native";
import ContactList from "../components/ContactList";
import Error from "../components/Error";
import { NavBar } from "../components/NavBar";

export function ContactListView({ navigation }) {
  return (
    <View style={styles.container}>
      <NavBar isConnected={true} navigation={navigation} addContact={true} />
      <ContactList navigation={navigation} />
      <Error />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3F6F",
  },
});
