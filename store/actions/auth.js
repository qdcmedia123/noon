import { AsyncStorage } from "react-native";
export const SIGNUP = "SIGNUP";
export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTHENTICATE";

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

let timer;

export const signup = (firstName, lastName, email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBeeIWtGxW70vMoeHAauOXTDmMcNEfABsI",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    console.log(response);
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "Email address already exists.";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    const expireationData = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );

    // Save data to ano ther modle as well
    // Url to post https://mobileshop-458de.firebaseio.com/users.json
    // Another request ends here
    const saveUser = await fetch(
      `https://mobileshop-458de.firebaseio.com/users.json?auth=${resData.idToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      }
    );

    if (!saveUser.ok) {
      let errorResData = await saveUser.json();
      let errorId = errorResData.error.message;
      let message = `Something went wrong! with secound operation ${errorId}`;
      console.log(saveUser);
      throw new Error(message);
    }

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    saveDataToStorage(resData.idToken, resData.localId, expireationData);
  };
};

const saveDataToStorage = (token, userId, expireationData) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryData: expireationData.toISOString(),
    })
  );
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
