import { View, StyleSheet } from "react-native";
import Error from "../components/Error";
import { AddContact } from "../components/AddContact";
import { NavBar } from "../components/NavBar";

export default function AddContactView({ navigation }) {
  return (
    <View style={styles.container}>
      <NavBar isConnected={true} navigation={navigation} canBack={true} />
      <AddContact />
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
