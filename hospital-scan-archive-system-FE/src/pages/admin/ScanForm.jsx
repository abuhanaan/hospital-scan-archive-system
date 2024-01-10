import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ScanForm = () => {
    const { state } = useLocation();
    const scan = state && state.currentScan;
    const fileRef = useRef(null);
    const [selectedScan, setSelectedScan] = useState(null);
    const [formData, setFormData] = useState(scan ?
        {
            patientId: scan.patientId,
            doctorId: scan.doctorId,
            type: scan.type,
            symptoms: scan.symptoms,
            diagnosis: scan.diagnosis,
            file: scan.url
        }
        :
        {
            patientId: '',
            doctorId: '',
            type: '',
            symptoms: '',
            diagnosis: '',
            file: ''
        }
    );

    const dt = {
        "id": 1,
        "symptoms": "Chest pain",
        "diagnosis": "Chest pain",
        "type": "Chest Scan",
        "url": "https://hsas-bucket.s3.amazonaws.com/HSAS.zip",
        "createdAt": "2024-01-09T01:57:03.711Z",
        "updatedAt": "2024-01-09T01:57:03.711Z",
        "doctorId": 3,
        "patientId": 1,
        "doctor": {
            "id": 1,
            "firstName": null,
            "lastName": null,
            "gender": null,
            "phoneNumber": null,
            "speciality": null,
            "createdAt": "2024-01-08T11:13:21.532Z",
            "updatedAt": "2024-01-08T11:13:21.532Z",
            "doctorId": 3
        },
        "patient": {
            "id": 1,
            "firstName": "Aliyu",
            "lastName": "Rasheed",
            "gender": "male",
            "phoneNumber": "08076453712",
            "address": "18, Ajanlekoko Street, Gbagada",
            "dob": "1993-01-08T23:00:00.000Z",
            "nextOfKinName": "Zainab Hashim",
            "nextOfKinPhone": "09034678908",
            "nextOfKinRelationship": "Wife",
            "createdAt": "2024-01-09T00:49:38.158Z",
            "updatedAt": "2024-01-10T07:25:52.306Z"
        }
    }

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        const elementValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: elementValue
        }));
    }

    function browseScan(e) {
        e.preventDefault();

        fileRef.current?.click();
    }

    function handleScanSelect(e) {
        e.preventDefault();

        const file = e.target.files[0];

        if (file) {
            setSelectedScan(file);
        }

    }

    return (
        <div className="flex flex-col pt-6 font-poppins">
            <div className="pb-6">
                <nav aria-label="breadcrumb">
                    <ol className="flex space-x-2">
                        <li><Link to="/admin" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Dashboard</Link></li>
                        <li><Link to="/admin/scans" className="after:content-['>'] after:ml-2 text-gray-600 hover:text-purple-700 text-lg">Scans</Link></li>
                        <li className="text-purple-700 font-medium text-lg" aria-current="page">Scan Form</li>
                    </ol>
                </nav>

                <h1 className="font-bold text-primary text-2xl leading-tight mt-6">{state ? 'Update' : 'Upload'} Scan</h1>
            </div>

            <div className="mx-auto w-full">
                <form>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-6">
                        <div className="">
                            <label
                                htmlFor='patientId'
                                className="mb-1 block text-base font-medium text-[#07074D]"
                            >
                                Patient ID
                            </label>
                            <input
                                type="text"
                                name="patientId"
                                id="patientId"
                                value={formData.patientId}
                                onChange={handleChange}
                                placeholder="Patient ID"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor="doctorId"
                                className="mb-1 block text-base font-medium text-[#07074D]"
                            >
                                Doctor ID
                            </label>
                            <input
                                type="text"
                                name="doctorId"
                                id="doctorId"
                                value={formData.doctorId}
                                onChange={handleChange}
                                placeholder="Doctor ID"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor="type"
                                className="mb-1 block text-base font-medium text-[#07074D]"
                            >
                                Scan Type
                            </label>
                            <input
                                type="text"
                                name="type"
                                id="type"
                                value={formData.type}
                                onChange={handleChange}
                                placeholder="Scan Type"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor='symptoms'
                                className="mb-1 block text-base font-medium text-[#07074D]"
                            >
                                Symptoms
                            </label>
                            <input
                                type="text"
                                name="symptoms"
                                id="symptoms"
                                value={formData.symptoms}
                                onChange={handleChange}
                                placeholder="Symptoms"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor='diagnosis'
                                className="mb-1 block text-base font-medium text-[#07074D]"
                            >
                                Diagnosis
                            </label>
                            <input
                                type="text"
                                name="diagnosis"
                                id="diagnosis"
                                value={formData.diagnosis}
                                onChange={handleChange}
                                placeholder="Diagnosis"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor="file"
                                className="mb-1 block text-base font-medium text-[#07074D]"
                            >
                                Scan <small>Compressed files only (.zip)</small>
                            </label>
                            <input
                                type="file"
                                name="file"
                                id="file"
                                ref={fileRef}
                                onChange={handleScanSelect}
                                placeholder="Next of Kin"
                                className="w-full rounded-s-md h-[50px] border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md hidden"
                            />
                            <div className="flex items-end gap-4">
                                <button onClick={browseScan} className="hover:shadow-form rounded-md bg-[#6A64F1] hover:bg-[#5f58f1] py-3 px-8 text-center text-base font-semibold text-white outline-none">{selectedScan ? 'Change Scan' : 'Browse Scan'}</button>
                                <p className="font-poppins font-medium text-lg">{selectedScan ? selectedScan.name : 'No file chosen'}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end mt-3'>
                        {
                            state ?
                                <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">Update Scan</button>
                                :
                                <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">Upload Scan</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ScanForm;