import { configureStore } from '@reduxjs/toolkit';
import {authSlice} from "./slices/authSlice.js";
import {courseSlice} from "./slices/courseSlice.js";
import {enrollmentSlice} from "./slices/enrollmentSlice.js";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        course: courseSlice.reducer,
        enrollment: enrollmentSlice.reducer
    }
})

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('state', JSON.stringify(state));
});
