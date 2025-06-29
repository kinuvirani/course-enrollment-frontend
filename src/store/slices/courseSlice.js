import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../services/api.js";
import {globalResetAll} from "../commonAction.js";

const initialState = {
    courses: [],
    loading: false,
    error: "",
}

const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`
}

export const getAllCourses = createAsyncThunk(
    "getAllCourses", async () => {
        try {
            const response = await api.get("/courses?is_available=t", {headers});
            return response.data;
        } catch (error) {
            return error.response.data?.message || "An error occurred";
        }
    }
)

export const courseSlice = createSlice({
    name: "course",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(globalResetAll, () => initialState)
            .addCase(getAllCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(getAllCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
})