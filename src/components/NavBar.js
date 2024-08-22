import { View, Text, Pressable } from "react-native";
import { useAuthContext } from "../hooks/useAuthContext";
import { logout } from "../actions/authentification";

export function NavBar({ navigation, isConnected, canBack, addContact }) {
  const { dispatch } = useAuthContext();

  return (
    <View style={styles.home}>
      {canBack && (
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.textDeconnexion}>Back</Text>
        </Pressable>
      )}
      <Text style={styles.text}>Accueil</Text>
      {isConnected && (
        <>
          {addContact && (
            <Pressable
              style={styles.addContact}
              onPress={() => {
                navigation.navigate("AddContact");
              }}
            >
              <Text style={styles.textAddContact}>+</Text>
            </Pressable>
          )}

          <Pressable
            style={styles.deconnexion}
            onPress={() => {
              logout(dispatch);
              navigation.navigate("Accueil");
            }}
          >
            <Text style={styles.textDeconnexion}>Logout</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = {
  home: {
    backgroundColor: "#1f2b48",
    height: 40,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    color: "#f8f7f5",
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  back: {
    backgroundColor: "#3067e1",
    position: "absolute",
    left: 10,
    padding: 5,
    borderRadius: 5,
  },
  deconnexion: {
    backgroundColor: "#f44336",
    position: "absolute",
    right: 10,
    padding: 5,
    borderRadius: 5,
  },
  textDeconnexion: {
    color: "#f8f7f5",
    fontSize: 14,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  addContact: {
    backgroundColor: "#44997c",
    position: "absolute",
    left: 15,
    padding: 5,
    borderRadius: 5,
    width: 50,
    flexDirection: "row",
    justifyContent: "center",
  },
  textAddContact: {
    color: "#f8f7f5",
    fontSize: 14,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
};
