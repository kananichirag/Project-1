import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname:'',
  lastname:'',
  email:'',
  image:'',
  _id:'',
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
     state._id  = action.payload.data._id;
     state.firstname  = action.payload.data.firstname;
     state.lastname  = action.payload.data.lastname;
     state.email  = action.payload.data.email;
     state.image  = action.payload.data.image;
    },

    logOutRedux:(state,action) => {
      state._id  = "";
      state.firstname  = "";
      state.lastname  = "";
      state.email  = "";
      state.image  = "";
    }
  },
});

export const { loginRedux , logOutRedux } = userSlice.actions;
export default userSlice.reducer;
