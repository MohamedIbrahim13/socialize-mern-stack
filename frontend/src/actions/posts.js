import axios from "axios";

const user = JSON.parse(localStorage.getItem("Profile"));
console.log("token", user?.token);

axios.defaults.headers.common = { Authorization: `Bearer ${user?.token}` };

export const getPosts = () => async dispatch => {
  try {
    const { data } = await axios.get("http://localhost:5000/posts", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    dispatch({ type: "ALL_POSTS", payload: data });
    //console.log('data',data)
  } catch (error) {
    console.log(error);
  }
};

export const getBySearch = searchQuery => async dispatch => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/posts/search?searchQuery=${
        searchQuery.search || "none"
      }&tags=${searchQuery.tags}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    dispatch({ type: "SEARCH", payload: data });
    //console.log('data',data)
  } catch (error) {
    console.log(error);
  }
};

export const getPost = id => async dispatch => {
  try {
    const { data } = await axios.get(`http://localhost:5000/posts/${id}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    dispatch({ type: "GET_ONE", payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = post => async dispatch => {
  const user = JSON.parse(localStorage.getItem("Profile"));
  try {
    const { data } = await axios.post("http://localhost:5000/posts", post, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${user?.token}`,
      },
    });

    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async dispatch => {
  try {
    const { data } = await axios.patch(
      `http://localhost:5000/posts/${id}`,
      post,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (id, value) => async dispatch => {
  try {
    const { data } = await axios.post(
      `http://localhost:5000/posts/${id}/commentPost`,
      value,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    dispatch({ type: "COMMENT", payload: data });
    console.log("data", data);
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = id => async dispatch => {
  const user = JSON.parse(localStorage.getItem("Profile"));
  try {
    const { data } = await axios.patch(
      `http://localhost:5000/posts/${id}/likePost`,
      user?.token,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    dispatch({ type: "LIKE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/posts/${id}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};
