import * as SecureStore from "expo-secure-store";

export default function getJwt() {
  return SecureStore.getItemAsync("jwt").then((jwt) => jwt);
}

export function setJwt(jwt) {
  SecureStore.setItemAsync("jwt", jwt)
    .then(() => {
      console.log("JWT stored successfully.");
    })
    .catch((error) => {
      console.error(error);
    });
}

export function deleteJwt() {
  SecureStore.deleteItemAsync("jwt")
    .then(() => {
      console.log("JWT deleted successfully.");
    })
    .catch((error) => {
      console.error(error);
    });
}
