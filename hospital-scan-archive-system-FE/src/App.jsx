import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { AdminLayout, AuthLayout, Layout } from './components';
import { Home, AdminDashboard, UsersList, UserForm, PatientView, PatientsList, PatientForm, ScanForm, ScansList, ScanView } from './pages';
import { createBrowserRouter, createRoutesFromChildren, RouterProvider, Route } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromChildren(
    <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<AuthLayout />}>
            <Route path='admin' element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />

                <Route path='users' element={<UsersList />} />
                <Route path='users/create' element={<UserForm />} />

                <Route path='patients' element={<PatientsList />} />
                <Route path='patients/:id' element={<PatientView />} />
                <Route path='patients/create' element={<PatientForm />} />

                <Route path='scans' element={<ScansList />} />
                <Route path='scans/:id' element={<ScanView />} />
                <Route path='scans/create' element={<ScanForm />} />
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
