import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { publicRequest } from '../../utils/request';

const ForgotPassword = () => {
    const { id, token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [data, setData] = useState(false);
    const [message, setMessage] = useState(false);

    const userValid = async () => {
        const res = await publicRequest.post(`/auth/forgotpassword/${id}/${token}`);

        if (res.data.status === 401) {
            console.log("user not valid");
            navigate("/*");
        } else {
            console.log("user valid")
        }
    }

    const sendpassword = async (e) => {
        e.preventDefault();

        if (password === "" || cpassword === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        } else if (password !== cpassword) {
            toast.error("password doesn't match!", {
                position: "top-center"
            });
        } else {
            const res = await publicRequest.post(`/auth/changepassword/${id}/${token}`, {
                password,
                cpassword
            });

            if (res.data.status == 201) {
                setPassword("")
                setCPassword("")
                setMessage(true)
            } else {
                toast.error("! Token Expired generate new LInk", {
                    position: "top-center"
                })
            }
        }
    }

    useEffect(() => {
        userValid();
        setTimeout(() => {
            setData(true)
        }, 3000);
    }, []);

    return (
        <>
            {
                data ? (
                    <>
                        <section>
                            <div className="form_data">
                                <div className="form_heading">
                                    <h1>Enter Your NEW Password</h1>
                                </div>
                                {
                                    message &&
                                    <p style={{ color: "green", fontWeight: "bold" }}>
                                        Password Succesfulyy Updated
                                    </p>
                                }
                                <form>
                                    <div className="form_input">
                                        <label htmlFor="password">New password</label>
                                        <input type="password" value={password}
                                            name="password" id="password"
                                            placeholder='Enter new password'
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="form_input">
                                        <label htmlFor="cpassword">Confirm password</label>
                                        <input type="password" value={cpassword}
                                            name="cpassword" id="cpassword"
                                            placeholder='Enter confirm password'
                                            onChange={(e) => setCPassword(e.target.value)}
                                        />
                                    </div>

                                    <button className='btn' onClick={sendpassword}>Send</button>
                                </form>
                                <ToastContainer />
                            </div>
                        </section>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                        Loading... &nbsp;
                        <CircularProgress />
                    </Box>
                )
            }
        </>
    )
}

export default ForgotPassword;