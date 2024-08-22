import { View, Text, StyleSheet, Linking, Pressable } from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { fetchOneContact } from "../actions/contacts";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Contact({ contact: { id } }) {
  const [contact, setContact] = useState(null);
  const { state: authState, dispatch: authDispatch } = useAuthContext();

  useEffect(() => {
    const contactData = async () => {
      const req = await fetchOneContact({ id, authDispatch });
      setContact(req);
    };

    try {
      contactData();
    } catch (error) {
      console.error("CONTACT", error);
    }
  }, [authDispatch, authState, id]);

  return (
    <View style={styles.container}>
      {contact ? (
        <>
          <Image
            style={styles.image}
            source={contact.avatar}
            contentFit="cover"
          />
          <Text style={styles.text}>{contact.phone}</Text>
          <Text style={styles.text}>{contact.lastName}</Text>
          <Text style={styles.text}>{contact.firstName}</Text>
          <Text style={styles.text}>{contact.email}</Text>
          <Pressable
            style={styles.callButton}
            onPress={() => Linking.openURL(`tel:${contact.phone}`)}
          >
            <Text style={styles.callText}>Appeler</Text>
          </Pressable>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F6F5",
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 6,
    padding: 15,
    gap: 15,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginHorizontal: "auto",
    marginTop: 25,
    marginBottom: 50,
  },
  callButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#44997c",
    width: 200,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    alignSelf: "center",
  },
  callText: {
    color: "white",
  },
});
