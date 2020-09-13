import { AsyncStorage } from "react-native";
export const SIGNUP = "SIGNUP";
export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTHENTICATE";
export const CREATE_SHIPPING = "CREATE_SHIPPING";
export const UPDATE_SHIPPING = "UPDATE_SHIPPING";
export const DELETE_SHIPPING = "DELETE_SHIPPING";
export const SET_DEFAULT_SHIPPING = "DEFAULT_SHIPPING";

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

let timer;

export const create_shipping = (data) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // Before saving we need to check if there is shipping is already exist for the user
    // If exists then

    const response = await fetch(
      `https://mobileshop-458de.firebaseio.com/shipping/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Could not save the shipping address.");
    }

    console.log(response);

    dispatch({
      type: CREATE_SHIPPING,
      payload: data,
    });
  };
};

export const updateShipping = (data, shippingId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        `https://mobileshop-458de.firebaseio.com/shipping/${userId}/${shippingId}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      dispatch({
        type: UPDATE_SHIPPING,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteShipping = (shippingID) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://mobileshop-458de.firebaseio.com/shipping/${userId}/${shippingID}.json?auth=${token}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      dispatch({
        type: DELETE_SHIPPING,
        payload: shippingID,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setOrUpdateDefaultShipping = (shippingID) => {
  return async (dispatch, getState) => {
    let token = getState().auth.token;
    let userId = getState().auth.userId;
    const data = {};
    data[userId] = shippingID;
    console.log(`userID: #${userId}`)
    
    try{
      let response = await fetch(`https://mobileshop-458de.firebaseio.com/shippings/${userId}.json/?auth=${token}`);
      
      if(!response.ok) {
        throw new Error("Could fetch the default shipping address.");
      }

      let jsonReponse = await response.json();
      console.log(jsonReponse);
      console.log('default shipping')
    } catch (error) {
      console.log(error)
    }
    
  

    try {
      const response = await fetch(
        `https://mobileshop-458de.firebaseio.com/defaultShippings/${userId}.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Could not save default shipping address.");
      }

      dispatch({
        type: SET_DEFAULT_SHIPPING,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

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
          defaultShipping: "",
        }),
      }
    );

    if (!saveUser.ok) {
      let errorResData = await saveUser.json();
      let errorId = errorResData.error.message;
      let message = `Something went wrong! with secound operation ${errorId}`;
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

export const login = (email, password) => {
  return async (dispatch) => {
    //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBeeIWtGxW70vMoeHAauOXTDmMcNEfABsI
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBeeIWtGxW70vMoeHAauOXTDmMcNEfABsI",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expireationData = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
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
