import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "@/api";

interface LoginDto {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  token: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string[] | null;
}

const SLICE_NAME = "auth";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const login = createAsyncThunk<User, LoginDto, { rejectValue: string[] }>(
  `${SLICE_NAME}/login`,
  async (userData, thunkAPI) => {
    try {
      const { data } = await API.login(userData);
      console.log("Login response:", data);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || [error.message || "Login failed"]
      );
    }
  }
);

const getprofile = createAsyncThunk<User, void, { rejectValue: string[] }>(
  `${SLICE_NAME}/getprofile`,
  async (_, thunkAPI) => {
    try {
      const { data } = await API.getProfile();

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unauthorized"
      );
    }
  }
);

const authSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || ["Unknown error"];
    });

    builder.addCase(getprofile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getprofile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(getprofile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || ["Unknown error"];
    });
  },
});

const { reducer: authReducer, actions } = authSlice;

export { login, getprofile };

export default authReducer;
