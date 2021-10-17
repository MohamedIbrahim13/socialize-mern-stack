import axios from "axios";

export const signUp = authData => async dispatch => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/users/signup",
      authData,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    dispatch({ type: "AUTH", payload: data });
    //console.log('data',data)
  } catch (error) {
    console.log(error);
  }
};

export const signIn = authData => async dispatch => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/users/signin",
      authData,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    dispatch({ type: "AUTH", payload: data });
    //console.log('data',data)
  } catch (error) {
    console.log(error);
  }
};

export const logOut = () => async dispatch => {
  try {
    const { data } = await axios.get("http://localhost:5000/users/logout", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    dispatch({ type: "LOGOUT", payload: data });
    console.log("data", data);
  } catch (error) {
    console.log(error);
  }
};
