import { View, StyleSheet } from "react-native";
import { NavBar } from "../components/NavBar";
import FicheContact from "../components/Contact";
import Error from "../components/Error";

export default function ContactView({
  navigation,
  route: {
    params: { contact },
  },
}) {
  return (
    <View style={styles.container}>
      <NavBar isConnected={true} navigation={navigation} canBack={true} />
      <FicheContact contact={contact} />
      <Error />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3F6F",
  },
  text: {
    color: "#F8F6F5",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
});
