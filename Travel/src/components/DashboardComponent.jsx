import { useSelector } from "react-redux";
import "../style/dashboard.css"
import { useNavigate } from "react-router-dom";


const DashboardComponent = function () {
    const navigate = useNavigate();
    const user = useSelector((state) => state.authLogin.user);

    return (
        <>
            {
                user && (
                    <div className="container admin-dashboard">
                        <header className="dashboard-header">
                            <h1>Admin Dashboard</h1>
                            <p>Welcome back, {user.firstName}. Manage everything from here.</p>
                        </header>

                        <div className="dashboard-sections">
                            <section className="dashboard-card">
                                <h2>Account Management</h2>
                                <p>View, edit, or delete user accounts from the platform.</p>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/dashboard-acc')
                                }}>Manage Accounts</button>
                            </section>

                            <section className="dashboard-card">
                                <h2>Listings Management</h2>
                                <p>Browse, update, or remove listings from the platform.</p>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/dashboard-list')
                                }}>Manage Listings</button>
                            </section>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default DashboardComponent