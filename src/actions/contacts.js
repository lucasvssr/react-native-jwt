import getJwt from "../hooks/getJwt";
import { refreshToken } from "./authentification";

const API_URL = "http://localhost:3000";

export function newUser({ login, jwt }) {
  return fetch(`${API_URL}/admin/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ login }),
  }).then((res) => {
    return res.json();
  });
}

export function fetchContactsAdmin() {
  return fetch(`${API_URL}/admin/contacts`).then((req) => {
    if (!req.ok) {
      throw new Error("Failed to fetch contacts");
    }
    return req.json();
  });
}

export function fetchContactsUser({ authDispatch, contactsDispatch }) {
  getJwt().then((jwt) => {
    fetch(`${API_URL}/api/contacts`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((req) => {
        if (req.status === 401) {
          refreshToken({ authDispatch }).then(() => {
            return getJwt().then((newJwt) => {
              return fetchContactsUser({ jwt: newJwt });
            });
          });
        } else if (!req.ok) {
          contactsDispatch({
            type: "FETCH_CONTACTS_FAILURE",
            payload: {
              error: "Failed to fetch contacts",
              loading: false,
            },
          });
        } else {
          req.json().then((response) => {
            contactsDispatch({
              type: "FETCH_CONTACTS_SUCCESS",
              payload: {
                contacts: response,
                loading: false,
              },
            });
          });
        }
      })
      .catch((error) => {
        contactsDispatch({
          type: "FETCH_CONTACTS_FAILURE",
          payload: {
            error: error.message,
            loading: false,
          },
        });
      });
  });
}

export async function fetchOneContact({ id, authDispatch }) {
  const jwt = await getJwt();
  const req = await fetch(`${API_URL}/api/contact/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (req.status === 401) {
    refreshToken({ authDispatch });

    return fetchOneContact({ id, authDispatch });
  }

  if (!req.ok) {
    throw new Error("Failed to fetch contact");
  }

  const response = await req.json();

  return response;
}

export async function addContact({
  firstName,
  lastName,
  email,
  phone,
  avatar,
  jwtuserId,
}) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtuserId}`,
    },
    body: JSON.stringify({ firstName, lastName, email, phone, avatar }),
  });
  return await res.json();
}
