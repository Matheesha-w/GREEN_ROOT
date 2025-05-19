import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";


const CreateUser = () => {

    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        email: '',
        role: 'admin',
        password: '',
        confirmPassword: '',
        image: 'avatar.png',
        status: 'active'
    });

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


    const handleSubmit = () => {
        axios.post(`http://localhost:3000/api/user/create`, formData)
            .then((res) => {
                // navigate('/admin/user-management/farmer');
                navigate(-1);
                // sweet alert
                Swal.fire({
                    title: "User created successfully!",
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
                                    <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="w-full border px-4 py-2 mb-4" />
                                    <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="w-full border px-4 py-2 mb-4" />
                                    <input type="text" name="address" placeholder="Address" onChange={handleChange} className="w-full border px-4 py-2 mb-4" />
                                    <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="w-full border px-4 py-2 mb-4" />
                                    <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full border px-4 py-2" />
                                </div>
                            )}

                            {currentStep === 1 && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Step 2: Account Security</h2>
                                    <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full border px-4 py-2 mb-4" />
                                    <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full border px-4 py-2 mb-4" />
                                    <input type="file" name="image" onChange={handleChange} className="w-full border px-4 py-2 mb-4" />
                                    <select name="role" onChange={handleChange} className="w-full border px-4 py-2 mb-2">
                                        <option value="admin">admin</option>
                                        <option value="farmer">farmer</option>
                                        <option value="customer">customer</option>
                                        <option value="seller">seller</option>
                                        <option value="researcher">Researcher</option>
                                        <option value="deliveryPerson">Delivery Person</option>
                                    </select>

                                    <select name="status" onChange={handleChange} className="w-full border px-4 py-2">
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
                                        <li><strong>Role:</strong> {formData.role}</li>
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

export default CreateUser