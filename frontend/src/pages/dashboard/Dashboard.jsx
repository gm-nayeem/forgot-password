import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { userRequest } from '../../utils/request';

const Dashboard = () => {
    // const { logindata, setLoginData } = useContext(LoginContext);

    const [user, setUser] = useState(null);
    const [data, setData] = useState(false);
    const navigate = useNavigate();

    const DashboardValid = async () => {
        const res = await userRequest.get('/users');

        if (res.data.status == 401 || !res.data) {
            navigate("*");
        } else {
            setUser(res.data.user);
            // navigate("/dash");
        }
    }

    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true)
        }, 2000);
    }, [])

    return (
        <>
            {
                data ? (
                    <div
                        style={{
                            display: "flex", flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <img
                            src="./man.png"
                            style={{ width: "200px", marginTop: 20 }}
                            alt=""
                        />
                        <h1>
                            User Name: {user && user.fname}
                        </h1>
                        <h2 style={{marginTop: "20px"}}>
                            User Email: {user && user.email}
                        </h2>
                    </div>
                ) : (
                    <Box
                        sx={{
                            display: 'flex', justifyContent: "center",
                            alignItems: "center", height: "100vh"
                        }}
                    >
                        Loading... &nbsp;
                        <CircularProgress />
                    </Box>
                )

            }

        </>

    )
}

export default Dashboard