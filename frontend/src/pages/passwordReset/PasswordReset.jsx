import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { publicRequest } from '../../utils/request';

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(false);

    const sendLink = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else {
            const res = await publicRequest.post('/auth/sendpasswordlink', { email });

            if (res.data.status == 201) {
                setEmail("");
                setMessage(true)
            } else {
                toast.error("Invalid User", {
                    position: "top-center"
                })
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Enter Your Email</h1>
                    </div>
                    {
                        message && 
                        <p style={{ color: "green", fontWeight: "bold" }}>
                            Pasword reset link send succsfully in your Email
                        </p>
                    }
                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email" value={email}
                                name="email" id="email"
                                placeholder='Enter Your Email Address'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button className='btn' onClick={sendLink}>Send</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default PasswordReset