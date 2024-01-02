import './App.css';
import { AdminLayout, DoctorLayout, AuthLayout, Layout } from './components';
import { Home, AdminDashboard, UsersList, UserView, UserForm, PatientView, PatientsList, PatientForm, ScanForm, ScansList, ScanView, DoctorDashboard, DoctorPatientsList, DoctorPatientView, DoctorScansList, DoctorScanView, DoctorProfileView, DoctorForm, adminDashboardLoader, usersListLoader, userViewLoader, patientViewLoader, patientsListLoader, scanViewLoader, scansListLoader, doctorDashboardLoader, doctorPatientsListLoader, doctorPatientViewLoader, doctorScansListLoader, doctorScanViewLoader, doctorProfileViewLoader } from './pages';
import { createBrowserRouter, createRoutesFromChildren, RouterProvider, Route } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromChildren(
    <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<AuthLayout />}>
            <Route path='admin' element={<AdminLayout />}>
                <Route index loader={adminDashboardLoader} element={<AdminDashboard />} />

                <Route path='users' loader={usersListLoader} element={<UsersList />} />
                <Route path='users/:id' loader={userViewLoader} element={<UserView />} />
                <Route path='users/create-user' element={<UserForm />} />

                <Route path='patients' loader={patientsListLoader} element={<PatientsList />} />
                <Route path='patients/:id' loader={patientViewLoader} element={<PatientView />} />
                <Route path='patients/create-patient' element={<PatientForm />} />

                <Route path='scans' loader={scansListLoader} element={<ScansList />} />
                <Route path='scans/:id' loader={scanViewLoader} element={<ScanView />} />
                <Route path='scans/create-scan' element={<ScanForm />} />
            </Route>

            <Route path='user' element={<DoctorLayout />}>
                <Route index loader={doctorDashboardLoader} element={<DoctorDashboard />} />

                <Route path='profile' loader={doctorProfileViewLoader} element={<DoctorProfileView />} />
                <Route path='profile/update' element={<DoctorForm />} />

                <Route path='patients' loader={doctorPatientsListLoader} element={<DoctorPatientsList />} />
                <Route path='patients/:id' loader={doctorPatientViewLoader} element={<DoctorPatientView />} />

                <Route path='scans' loader={doctorScansListLoader} element={<DoctorScansList />} />
                <Route path='scans/:id' loader={doctorScanViewLoader} element={<DoctorScanView />} />
            </Route>
        </Route>
    </Route>
));

function App() {

    return (
        <RouterProvider router={router} />
    )
}

export default App;
