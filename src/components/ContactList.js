import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ContactItem from "./ContactItem";
import { useAuthContext } from "../hooks/useAuthContext";
import { useContactsContext } from "../hooks/useContactsContext";

export default function ContactList({ navigation }) {
  const [contacts, setContacts] = useState(null);
  const { state: authState } = useAuthContext();
  const { state: contactsState } = useContactsContext();

  useEffect(() => {
    setContacts(contactsState.contacts);
  }, [contactsState]);

  return (
    <>
      {authState.isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#F8F6F5" />
        </View>
      ) : contacts ? (
        <ScrollView style={styles.container}>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
