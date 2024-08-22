import { View, StyleSheet, Text } from "react-native";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";

export default function Error() {
  const { state } = useAuthContext();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (state.error) {
      setError(state.error);
    }
  }, [state.error, state]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    backgroundColor: "#F8F6F5",
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 8,
    padding: 10,
  },
  text: {
    color: "red",
    fontSize: 16,
  },
});
