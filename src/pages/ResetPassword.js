import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverEndpoint } from "../config/config";

function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;
    const [formData, setFormData] = useState({
        otp: "",
        newPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        if (!email) {
            navigate("/forgot-password");
        }
    }, [email, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validate = () => {
        let newErrors = {};
        let isValid = true;

        if (!formData.otp) {
            newErrors.otp = "Code is required";
            isValid = false;
        }

        if (!formData.newPassword || formData.newPassword.length < 6) {
            newErrors.newPassword = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const response = await axios.post(`${serverEndpoint}/auth/reset-password`, {
                    email,
                    otp: formData.otp,
                    newPassword: formData.newPassword
                });

                setSuccessMsg("Password reset successfully. You can now login.");
                setTimeout(() => navigate("/login"), 1500);
            } catch (error) {
                console.error(error);
                if (error.response?.data?.message) {
                    setErrors({ message: error.response.data.message });
                } else {
                    setErrors({ message: "Something went wrong. Please try again." });
                }
            }
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <h2 className="mb-4 text-center">Reset Password</h2>

                    {errors.message && (
                        <div className="alert alert-danger">{errors.message}</div>
                    )}
                    {successMsg && (
                        <div className="alert alert-success">{successMsg}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">OTP Code</label>
                            <input
                                type="text"
                                name="otp"
                                className={`form-control ${errors.otp ? 'is-invalid' : ''}`}
                                value={formData.otp}
                                onChange={handleChange}
                            />
                            {errors.otp && (
                                <div className="invalid-feedback">{errors.otp}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                            {errors.newPassword && (
                                <div className="invalid-feedback">{errors.newPassword}</div>
                            )}
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
