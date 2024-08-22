import * as SecureStore from "expo-secure-store";

export default function getRefreshToken() {
  return SecureStore.getItemAsync("refreshToken").then((res) => res);
}

export function setRefreshToken(refreshToken) {
  SecureStore.setItemAsync("refreshToken", refreshToken)
    .then(() => {
      console.log("Refresh token stored successfully.");
      return true;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function deleteRefreshToken() {
  SecureStore.deleteItemAsync("refreshToken").catch((error) => {
    console.error(error);
  });
}
