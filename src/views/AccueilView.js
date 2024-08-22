import { View, StyleSheet } from "react-native";
import Error from "../components/Error";
import Form from "../components/Form";
import { NavBar } from "../components/NavBar";

export function AccueilView({ navigation }) {
  return (
    <View style={styles.container}>
      <NavBar />
      <Form navigation={navigation} />
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
