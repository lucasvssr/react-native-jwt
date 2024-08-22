import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { postLogin, refreshToken } from "../actions/authentification";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Form({ navigation }) {
  const [login, setLogin] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const { state, dispatch } = useAuthContext();

  useEffect(() => {
    if (state.isAuthentificated) {
      navigation.navigate("ContactList");
    }
  }, [navigation, state.isAuthentificated, state.token]);

  const handleLogin = () => {
    console.log("refresh token", login, password, state.isAuthentificated);
    if (
      state.isAuthentificated &&
      login === undefined &&
      password === undefined
    ) {
      console.log("refresh token");
      refreshToken(dispatch);
      console.log("refresh token");
    } else {
      postLogin(login, password, dispatch);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Login"
            keyboardType="login"
            onChangeText={setLogin}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.text}>Login</Text>
          </Pressable>
        </View>
      </View>
    </>
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
