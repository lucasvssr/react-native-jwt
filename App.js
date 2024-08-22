import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { AccueilView } from "./src/views/AccueilView";
import { ContactListView } from "./src/views/ContactListView";
import ContactView from "./src/views/ContactView";
import { AuthProvider } from "./src/hooks/useAuthContext";
import { ContactsProvider } from "./src/hooks/useContactsContext";
import AddContactView from "./src/views/AddContactView";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <ContactsProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Accueil"
              screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            >
              <Stack.Screen name="Accueil" component={AccueilView} />
              <Stack.Screen name="ContactList" component={ContactListView} />
              <Stack.Screen name="Contact" component={ContactView} />
              <Stack.Screen name="AddContact" component={AddContactView} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ContactsProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#2C3F6F",
  },
});
