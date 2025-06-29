import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../services/api.js";
import {globalResetAll} from "../commonAction.js";

const initialState = {
    loading: false,
    error: null,
    enrollments: [],
}

const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`
}

export const enrollIntoCourse = createAsyncThunk(
    "enrollIntoCourse", async (enrollmentPayload) => {
        try {
            const response = await api.post("/enrollments", enrollmentPayload, {headers});
            return response.data;
        } catch (error) {
            return error.response.data?.message || "An error occurred";
        }
    }
)

export const getAllEnrollments = createAsyncThunk(
    "getAllEnrollments", async (studentId) => {
       try {
           const response = await api.get(`/enrollments?studentId=${studentId}`, {headers});
           return response.data;
       } catch (error) {
           return error.response.data?.message || "An error occurred";
       }
    }
)

export const withdrawEnrollment = createAsyncThunk(
    "withdrawEnrollment", async (enrollmentId, {rejectWithValue}) => {
        try {
            const response = await api.delete(`/enrollments/${enrollmentId}`, {headers});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "An error occurred");
        }
    }
)

export const enrollmentSlice = createSlice({
    name: "enrollment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(globalResetAll, () => initialState)
            .addCase(enrollIntoCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(enrollIntoCourse.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(enrollIntoCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(getAllEnrollments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllEnrollments.fulfilled, (state, action) => {
                state.loading = false;
                state.enrollments = action.payload;
            })
            .addCase(getAllEnrollments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(withdrawEnrollment.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(withdrawEnrollment.fulfilled, (state, action) => {
                state.enrollments.data = state.enrollments?.data.filter((enrollment) => enrollment.enrollmentId !== action.meta.arg)
                state.loading = false;
            })
            .addCase(withdrawEnrollment.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = true;
            })
    }
});