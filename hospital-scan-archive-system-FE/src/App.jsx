import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { loader as userViewLoader } from './pages/admin/UserView';
import { loader as patientsListLoader } from './pages/admin/PatientsList';
import { loader as patientViewLoader } from './pages/admin/PatientView';
import { AdminLayout, AuthLayout, Layout } from './components';
import { Home, AdminDashboard, UsersList, UserView, UserForm, PatientView, PatientsList, PatientForm, ScanForm, ScansList, ScanView } from './pages';
import { createBrowserRouter, createRoutesFromChildren, RouterProvider, Route } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromChildren(
    <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<AuthLayout />}>
            <Route path='admin' element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />

                <Route path='users' element={<UsersList />} />
                <Route path='users/:id' loader={userViewLoader} element={<UserView />} />
                <Route path='users/create-user' element={<UserForm />} />

                <Route path='patients' loader={patientsListLoader} element={<PatientsList />} />
                <Route path='patients/:id' loader={patientViewLoader} element={<PatientView />} />
                <Route path='patients/create-patient' element={<PatientForm />} />

                <Route path='scans' element={<ScansList />} />
                <Route path='scans/:id' element={<ScanView />} />
                <Route path='scans/create-scan' element={<ScanForm />} />
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
