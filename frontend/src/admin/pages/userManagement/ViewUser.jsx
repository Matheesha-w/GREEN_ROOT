import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserCard from '../../components/UserCard';
import BackButton from '../../components/BackButton';

const ViewUser = () => {

    const [user, setUser] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/user/${id}`)
            .then((res) => {
                setUser(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <>

            <UserCard user={user} />

        </>
    )
}

export default ViewUser