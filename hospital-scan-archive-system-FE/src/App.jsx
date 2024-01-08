import './App.css';
import { AdminLayout, UserLayout, AuthLayout, Layout } from './components';
import { Home, AdminDashboard, UsersList, UserView, UserForm, PatientView, PatientsList, PatientForm, ScanForm, ScansList, ScanView, UserDashboard, UserPatientsList, UserPatientView, UserScansList, UserScanView, UserScanForm, UserProfileView, UserProfileForm, adminDashboardLoader, usersListLoader, userViewLoader, patientViewLoader, patientsListLoader, scanViewLoader, scansListLoader, userDashboardLoader, userPatientsListLoader, userPatientViewLoader, userScansListLoader, userScanViewLoader, userScanFormLoader, userProfileViewLoader, loginAction } from './pages';
import { createBrowserRouter, createRoutesFromChildren, RouterProvider, Route } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromChildren(
    <Route path='/' element={<Layout />}>
        <Route index element={<Home />} action={loginAction} />
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

            <Route path='user' element={<UserLayout />}>
                <Route index loader={userDashboardLoader} element={<UserDashboard />} />

                <Route path='profile' loader={userProfileViewLoader} element={<UserProfileView />} />
                <Route path='profile/update' element={<UserProfileForm />} />

                <Route path='patients' loader={userPatientsListLoader} element={<UserPatientsList />} />
                <Route path='patients/:id' loader={userPatientViewLoader} element={<UserPatientView />} />

                <Route path='scans' loader={userScansListLoader} element={<UserScansList />} />
                <Route path='scans/:id' loader={userScanViewLoader} element={<UserScanView />} />
                <Route path='scans/create-scan' loader={userScanFormLoader} element={<UserScanForm />} />
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
