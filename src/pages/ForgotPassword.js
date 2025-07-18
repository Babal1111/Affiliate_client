import { useState } from "react";
import axios from "axios";
import { serverEndpoint } from "../config/config";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!email) {
            setError("Email is required");
            return;
        }

        try {
            const response = await axios.post(
                `${serverEndpoint}/auth/forgot-password`,
                { email },
                { withCredentials: true }
            );

            setMessage(response.data.message || "OTP sent successfully!");

            setTimeout(()=>{
                navigate("/reset-password",{ state: { email } });
            },1000)
        } catch (err) {
            console.log(err);
            if (err?.response?.status === 404) {
                setError("No user found with this email");
            } else {
                setError("Something went wrong, please try again");
            }
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h2 className="text-center mb-4">Forgot Password</h2>

                    {message && (
                        <div className="alert alert-success" role="alert">
                            {message}
                        </div>
                    )}
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="Enter your registered email"
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Send OTP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
