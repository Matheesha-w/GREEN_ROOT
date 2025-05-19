import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
// back button
import BackButton from '../../components/BackButton';

const DeleteUser = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const handleDelete = () => {
        axios
            .delete(`http://localhost:3000/api/user/delete/${id}`)
            .then(() => {
                // navigate('/admin/user-management/farmer');
                navigate(-1);
                // sweet alert
                Swal.fire({
                    title: "User Deleted!",
                    text: "",
                    icon: "success"
                });
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    title: "Error while Deleting the user!",
                    text: "",
                    icon: "error"
                })
            })
    }

    return (
        <>
            <div className='m-2 flex justify-start'>
                <BackButton /> {/* Add Back Button Here */}
            </div>
            <div className='min-h-dvh min-w-dvw flex items-center justify-center'>
                {/* <h1 className='text-3xl my-4'>Delete User</h1> */}
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                    <p>Are you want to delete this user?</p>
                    <button
                        onClick={handleDelete}
                        className='bg-red-500 text-white rounded-md p-2 mt-4 hover:bg-red-600'
                    >
                        Yes, Delete
                    </button>
                    <button
                        onClick={() => navigate('/admin/user-management/farmer')}
                        className='bg-blue-500 text-white rounded-md p-2 mt-4 hover:bg-blue-600'
                    >
                        Cancle
                    </button>
                </div>
            </div>
        </>
    )
}

export default DeleteUser