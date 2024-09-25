import React from 'react';
import ReactDOM from 'react-dom/client';
import 'swiper/css';
import 'swiper/css/navigation';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AdminUserCreation from './pages/AdminUserCreation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import { AuthProvider } from './utils/authProvider';
import ProtectedRoute from './utils/protectedRoute';
import Home from './pages/Home';
import Passreset from './pages/Passreset';
import RedireccionPass from './components/RedireccionPass';
import NewPass from './components/ResetPasswordForm';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <Router>
            <Routes>
                <Route path='/admin-user-creation' element={<AdminUserCreation/>} />
                <Route path='/login' element={<Auth />} />
                <Route path= '/home' element={<ProtectedRoute><Home/></ProtectedRoute>} />
                <Route path= '/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
                <Route path= '/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>} />
                <Route path= '/verify-mail' element={<Passreset/>}/>
                <Route path= '/reset-password' element={<NewPass/>}/>
                <Route path="/verify-reset" element={<RedireccionPass />} />
                <Route path="/new-pass" element={<NewPass/>} />
            </Routes>
        </Router>
    </AuthProvider>



);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
