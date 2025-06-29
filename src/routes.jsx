import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from "./components/layout/MainLayout.jsx";
import Registration from "./components/authentication/Registration.jsx";
import Login from "./components/authentication/Login.jsx";
import Dashboard from "./components/home/Dashboard.jsx";
import {MessageProvider} from "./contexts/MessageProvider.jsx";
import Enrollment from "./components/home/Enrollment.jsx";

export default function Routers() {
    return (
        <MessageProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />} >
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/enrollments" element={<Enrollment />} />
                        <Route path="/" element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </MessageProvider>
    )
}