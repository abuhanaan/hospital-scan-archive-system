import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Layout from './components/layouts/Layout';
import Home from './pages/Home';
import AuthLayout from './components/layouts/AuthLayout';
import AdminLayout from './components/layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import UsersList from './pages/UsersList';
import UserView from './pages/UserView';
import UserForm from './pages/UserForm';
import ScanView from './components/ScanView';
import { createBrowserRouter, createRoutesFromChildren, RouterProvider, Route } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromChildren(
    <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<AuthLayout />}>
            <Route path='admin' element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path='users' element={<UsersList />} />
                <Route path='users/:id' element={<UserView />} />
                <Route path='users/create' element={<UserForm />} />
                
                <Route path='scans/:id' element={<ScanView />} />

                {/* <Route path='patients' element={<PatientsList />} />
                <Route path='patients/:id' element={<PatientView />} />
                <Route path='patients/create' element={<PatientForm />} /> */}
            </Route>

            {/* <Route path='doctor' element={<DoctorDashboard />} /> */}
        </Route>
    </Route>
));

function App() {

    return (
        <RouterProvider router={router} />
    )
}

export default App;
