import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
// back button
import BackButton from '../../components/BackButton';

const EditUser = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: '',
        image: 'avatar.png',
        status: 'active'
    });

    // fetch user data
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/api/user/${id}`)
                .then(res => {
                    setFormData(res.data.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    alert(`Can not fetch user data...`);
                    setLoading(false);
                });
        }
    }, [id]);


    const handleChange = (e) => {
        if (e.target.name === "image" && e.target.files.length > 0) {
            const file = e.target.files[0]; // Get the uploaded file
            setFormData({ ...formData, [e.target.name]: file.name }); // Use only the file name
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };




    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
        else handleSubmit();
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };



    // handle submit
    const handleSubmit = () => {
        axios.put(`http://localhost:3000/api/user/update/${id}`, formData)
            .then((res) => {
                // navigate('/admin/user-management/farmer');
                navigate(-1);
                // sweet alert
                Swal.fire({
                    title: "User updated successfully!",
                    text: "",
                    icon: "success"
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const steps = [
        { title: "Personal Info" },
        { title: "Account Security" },
        { title: "Review & Submit" },
    ];

    return (
        <>
            <div className='m-2 flex justify-start'>
                <BackButton /> {/* Add Back Button Here */}
            </div>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                    <div className="flex justify-between mb-8">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div
                                    className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${currentStep >= index ? "bg-purple-600" : "bg-gray-300"
                                        }`}
                                >
                                    {index + 1}
                                </div>
                                <p className="text-sm mt-2">{step.title}</p>
                            </div>
                        ))}
                    </div>

                    {loading && <p className="text-center">Loading...</p>}

                    {!loading && (
                        <>
                            {currentStep === 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Step 1: Personal Info</h2>
                                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full border px-4 py-2 mb-4" />
                                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full border px-4 py-2 mb-4" />
                                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full border px-4 py-2 mb-4" />
                                    <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full border px-4 py-2 mb-4" />
                                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border px-4 py-2" />
                                </div>
                            )}

                            {currentStep === 1 && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Step 2: Account Security</h2>
                                    <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full border px-4 py-2 mb-4" />
                                    <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full border px-4 py-2 mb-4" />
                                    <input type="file" name="image" onChange={handleChange} className="w-full border px-4 py-2 mb-4" />

                                    <select name="role" value={formData.role} onChange={handleChange} className="w-full border px-4 py-2 mb-2">
                                        <option value="admin">admin</option>
                                        <option value="farmer">farmer</option>
                                        <option value="customer">customer</option>
                                        <option value="seller">seller</option>
                                    </select>

                                    <select name="status" value={formData.status} onChange={handleChange} className="w-full border px-4 py-2">
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Step 3: Review & Submit</h2>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li><strong>Name:</strong> {formData.firstName} {formData.lastName}</li>
                                        <li><strong>Email:</strong> {formData.email}</li>
                                        <li><strong>Address:</strong> {formData.address}</li>
                                        <li><strong>Phone:</strong> {formData.phone}</li>
                                        <li><strong>Image:</strong> {formData.image}</li>
                                        <li><strong>Status:</strong> {formData.status}</li>
                                    </ul>
                                </div>
                            )}
                        </>
                    )}

                    <div className="flex justify-between mt-8">
                        <button type="button" className={`px-6 py-2 rounded-lg ${currentStep === 0 ? "hidden" : "bg-gray-300"}`} onClick={prevStep}>Previous</button>
                        <button type="button" className="bg-purple-600 text-white px-6 py-2 rounded-lg" onClick={nextStep}>
                            {currentStep === steps.length - 1 ? "Submit" : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditUser