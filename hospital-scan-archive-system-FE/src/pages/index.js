// Pages
export { default as Home } from './Home';
export { default as AdminDashboard } from './admin/AdminDashboard';
export { default as UsersList } from './admin/UsersList';
export { default as UserView } from './admin/UserView';
export { default as UserForm } from './admin/UserForm';
export { default as PatientsList } from './admin/PatientsList';
export { default as PatientView } from './admin/PatientView';
export { default as PatientForm } from './admin/PatientForm';
export { default as ScansList } from './admin/ScansList';
export { default as ScanView } from './admin/ScanView';
export { default as ScanForm } from './admin/ScanForm';

export { default as DoctorDashboard } from './user/UserDashboard';
export { default as DoctorPatientsList } from './user/PatientsList';
export { default as DoctorPatientView } from './user/PatientView';
export { default as DoctorScansList } from './user/ScansList';
export { default as DoctorScanView } from './user/ScanView';
export { default as DoctorProfileView } from './user/UserView';
export { default as DoctorForm } from './user/UserForm';

// Admin Loaders
export { loader as adminDashboardLoader } from './admin/AdminDashboard';
export { loader as usersListLoader } from './admin/UsersList';
export { loader as userViewLoader } from './admin/UserView';
export { loader as patientsListLoader } from './admin/PatientsList';
export { loader as patientViewLoader } from './admin/PatientView';
export { loader as scanViewLoader } from './admin/ScanView';
export { loader as scansListLoader } from './admin/ScansList';

// User Loaders
export { loader as doctorDashboardLoader } from './user/UserDashboard';
export { loader as doctorPatientsListLoader } from './user/PatientsList';
export { loader as doctorPatientViewLoader } from './user/PatientView';
export { loader as doctorScansListLoader } from './user/ScansList';
export { loader as doctorScanViewLoader } from './user/ScanView';
export { loader as doctorProfileViewLoader } from './user/UserView';