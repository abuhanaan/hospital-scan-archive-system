import './App.css';
import { AdminLayout, UserLayout, AuthLayout, Layout } from './components';
import { Home, AdminPasswordUpdate, PasswordUpdate, AdminDashboard, UsersList, UserView, UserForm, PatientView, PatientsList, PatientForm, ScanForm, ScansList, ScanView, UserDashboard, UserPatientForm, UserPatientsList, UserPatientView, UserScansList, UserScanView, UserScanForm, UserProfileView, UserProfileForm, loginLoader, adminDashboardLoader, usersListLoader, userViewLoader, patientViewLoader, patientsListLoader, scanViewLoader, scansListLoader, userDashboardLoader, userProfileUpdateLoader, userPatientsListLoader, userPatientViewLoader, userScansListLoader, userScanViewLoader, userProfileViewLoader, userPasswordUpdateLoader, loginAction, PageNotFound, Error } from './pages';
import { createBrowserRouter, createRoutesFromChildren, RouterProvider, Route } from 'react-router-dom';
import { requireAuth } from './utils';

async function loader({ request }) {
    await requireAuth(request);
    return null;
}

const router = createBrowserRouter(createRoutesFromChildren(
    <Route path='/' element={<Layout />}>
        <Route index element={<Home />} loader={loginLoader} action={loginAction} />
        <Route path='admin' element={<AdminLayout />} errorElement={<Error />}>
            <Route index loader={adminDashboardLoader} element={<AdminDashboard />} />
            <Route path='password/update'  loader={loader} element={<AdminPasswordUpdate />} />

            <Route path='users' loader={usersListLoader} element={<UsersList />} />
            <Route path='users/:id' loader={userViewLoader} element={<UserView />} />
            <Route path='users/create-user' loader={loader} element={<UserForm />} />

            <Route path='patients' loader={patientsListLoader} element={<PatientsList />} />
            <Route path='patients/:id' loader={patientViewLoader} element={<PatientView />} />
            <Route path='patients/create-patient' loader={loader} element={<PatientForm />} />

            <Route path='scans' loader={scansListLoader} element={<ScansList />} />
            <Route path='scans/:id' loader={scanViewLoader} element={<ScanView />} />
            <Route path='scans/create-scan' loader={loader} element={<ScanForm />} />
        </Route>

        <Route path='user' element={<UserLayout />} errorElement={<Error />}>
            <Route index loader={userDashboardLoader} element={<UserDashboard />} />

            <Route path='profile' loader={userProfileViewLoader} element={<UserProfileView />} />
            <Route path='profile/update' loader={userProfileUpdateLoader} element={<UserProfileForm />} />
            <Route path='password/update' loader={userPasswordUpdateLoader} element={<PasswordUpdate />} />

            <Route path='patients' loader={userPatientsListLoader} element={<UserPatientsList />} />
            <Route path='patients/:id' loader={userPatientViewLoader} element={<UserPatientView />} />
            <Route path='patients/create-patient' loader={loader} element={<UserPatientForm />} />

            <Route path='scans' loader={userScansListLoader} element={<UserScansList />} />
            <Route path='scans/:id' loader={userScanViewLoader} element={<UserScanView />} />
            <Route path='scans/create-scan' loader={loader} element={<UserScanForm />} />
        </Route>

        <Route path='*' element={<PageNotFound />} />
    </Route>
));

function App() {

    return (
        <RouterProvider router={router} />
    )
}

export default App;
