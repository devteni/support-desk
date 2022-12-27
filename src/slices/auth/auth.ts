import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/API";
import ProcessError from "../../lib/error";
import { setUserAndAuth } from "./auth.service";

const initialState = {
    user: {},
    isLoading: false,
    expires_in: 0,
    error: "",
};

export const register = createAsyncThunk("auth/register", async (user, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`/auth/register`, user);
  
      setUserAndAuth(data);
  
      if (data.data.email) {
        window.location.href = "/businesses/create";
        return data.data;
      }
    } catch (error) {
      const err = ProcessError(error);
      return rejectWithValue(err?.message);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false;
        state.error = "";
      },
      setUser: (state, action) => {
        state.user = action.payload;
      },
      setExpiry: (state, action) => {
        state.expires_in = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(register.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
          state.error = "";
        })
        .addCase(register.rejected, (state, action) => {
          state.isLoading = false;
          state.user = {};
          state.error = JSON.stringify(action.payload);
        })
        // .addCase(login.pending, (state) => {
        //   state.isLoading = true;
        // })
        // .addCase(login.fulfilled, (state, action) => {
        //   state.isLoading = false;
        //   state.isSuccess = true;
        //   state.user = action.payload;
        // })
        // .addCase(login.rejected, (state, action) => {
        //   state.isLoading = false;
        //   state.isError = true;
        //   state.user = {};
        //   state.message = JSON.stringify(action.payload);
        // })
        // .addCase(meQuery.pending, (state) => {
        //   state.isLoading = false;
        // })
        // .addCase(meQuery.fulfilled, (state, action) => {
        //   state.isLoading = false;
        //   state.isSuccess = true;
        //   state.user = action.payload;
        // })
        // .addCase(meQuery.rejected, (state, action) => {
        //   state.isLoading = false;
        //   state.isError = true;
        //   state.user = {};
        //   state.message = JSON.stringify(action.payload);
        // })

    },
  });
  export const { reset, setUser, setExpiry } = authSlice.actions;
  export default authSlice.reducer;