import { useState, useContext } from 'react';
import axios from 'axios';
import './user-page.css';
import { AuthContext } from "../../context/auth.context";

const UserPage = () => {
    const { user, setUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const passwordInputType = showPassword ? 'text' : 'password';

    // Set the username from the user object
    useState(() => {
        if (user) {
            setUsername(user.name);
        }
    }, [user]);

    const handleChangeUsername = async () => {
        try {
            const storedToken = localStorage.getItem("authToken");
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/change-username`, { username: username }, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });
            setUsernameMessage('Username updated successfully');
            setUser(prevUser => ({ ...prevUser, name: username }));
        } catch (error) {
            console.error('Error updating username:', error);
            setUsernameMessage('Error updating username');
        }
    };

    const handleChangePassword = async () => {
        try {
            const storedToken = localStorage.getItem("authToken");
            // Check if new password matches confirmation
            if (newPassword !== confirmPassword) {
                setPasswordMessage('Passwords do not match');
                return;
            }

            // Send request to backend to change password
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/change-password`, { currentPassword: oldPassword, newPassword }, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });
            setPasswordMessage('Password updated successfully');
        } catch (error) {
            console.error('Error updating password:', error);
            setPasswordMessage('Error updating password');
        }
    };

    return (
        <div className="user-page">
            {user && <div><h2>Hallo, {user.name}</h2>
                <h6>here you can change your username and password</h6></div>
            }
            <div className="form-container">
                <p className={usernameMessage.includes('Error') ? 'text-danger' : 'text-success'}>{usernameMessage}</p>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Enter new username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <button className="btn btn-primary mt-1 mb-3" onClick={handleChangeUsername}>Change Username</button>
                <p className={passwordMessage.includes('Error') ? 'text-danger' : 'text-success'}>{passwordMessage}</p>
                <div className="input-group">
                    <input type={passwordInputType} className="form-control" placeholder="Enter current password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div className="input-group">
                    <input type={passwordInputType} className="form-control" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="input-group mt-3">
                    <input type={passwordInputType} className="form-control" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="mt-3">
                    <label>
                        <input type="checkbox" onChange={togglePasswordVisibility} /> Show Password
                    </label>
                </div>
                <button className="btn btn-primary mt-3" onClick={handleChangePassword}>Change Password</button>

            </div>
        </div>
    );
};

export default UserPage;