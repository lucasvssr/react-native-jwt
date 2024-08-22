import { useContext, useEffect, useReducer } from "react";
import { ContactsContext, ContactsDispatchContext } from "../../contacts";
import { fetchContactsUser } from "../actions/contacts";
import { useAuthContext } from "./useAuthContext";

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

function contactsReducer(state, action) {
  switch (action.type) {
    case "FETCH_CONTACTS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_CONTACTS_SUCCESS":
      return {
        ...state,
        contacts: action.payload.contacts,
        loading: false,
      };
    case "FETCH_CONTACTS_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export function ContactsProvider({ children }) {
  const [state, dispatch] = useReducer(contactsReducer, initialState);
  const value = { state, dispatch };

  const { state: authState } = useAuthContext();

  useEffect(() => {
    fetchContactsUser({
      authState,
      contactsDispatch: dispatch,
    });
  }, [authState]);

  return (
    <ContactsContext.Provider value={value}>
      <ContactsDispatchContext.Provider value={dispatch}>
        {children}
      </ContactsDispatchContext.Provider>
    </ContactsContext.Provider>
  );
}

export function useContactsContext() {
  const context = useContext(ContactsContext);

  if (context === undefined) {
    throw new Error(
      "useContactsContext must be used within a ContactsProvider",
    );
  }

  return context;
}

export function useContactsDispatch() {
  const context = useContext(ContactsDispatchContext);

  if (context === undefined) {
    throw new Error(
      "useContactsDispatch must be used within a ContactsProvider",
    );
  }

  return context;
}
