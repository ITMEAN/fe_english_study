import React, { Suspense, lazy, useState } from "react";
import Swal from "sweetalert2";
import { resetPassaword } from "../../api/service/AuthService";

// Lazy load Layout component
const Layout = lazy(() => import("../../Layout"));

export default function ResetPassword() {
    const token = new URLSearchParams(window.location.search).get("token");
    const email = new URLSearchParams(window.location.search).get("email");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleResetPassword = async () => {
        try {
            const response = await resetPassaword(email, password, confirmPassword, token);
            console.log(response);
            Swal.fire({
                title: "Good job!",
                text: "Đổi mật khẩu thành công",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/login";
                }
            });
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                title: "Lỗi",
                text: "Đã có lỗi xảy ra",
                icon: "error"
            });
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Layout>
                <div className="container" style={{ minHeight: '100vh' }}>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="text-center">Reset Password</h3>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                            <input type="password" className="form-control" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
                                        </div>
                                        <button type="button" className="btn btn-primary" onClick={handleResetPassword}>Reset Password</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Suspense>
    );
}
