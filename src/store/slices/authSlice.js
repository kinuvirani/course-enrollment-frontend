import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../services/api.js";
import {globalResetAll} from "../commonAction.js";

const initialState = {
    student: {},
    loading: false,
    error: null
}

export const studentRegistration = createAsyncThunk(
    "/students/register", async (studentData, {rejectWithValue}) => {
        try {
            const response = await api.post("/students/register", studentData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
)

export const studentLogin = createAsyncThunk(
    "/students/login", async (studentData, {rejectWithValue}) => {
        try {
            const response = await api.post("/students/login", studentData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(globalResetAll, () => initialState)
            .addCase(studentRegistration.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(studentRegistration.fulfilled, (state, action) => {
                state.loading = false;
                state.student = action.payload;
            })
            .addCase(studentRegistration.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(studentLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(studentLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.student = action.payload;
            })
            .addCase(studentLogin.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload;
            })

    },
})