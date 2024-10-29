import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {useState} from "react";
import {handleLogin} from "../authentication/authedUser";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({dispatch, loggedIn}) => {
    const [username, setUsername] = useState("sarahedo");
    const [password, setPassword] = useState("sarahedo");

    if (loggedIn) {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get('redirectTo');
        return <Navigate to={redirectUrl ? redirectUrl : "/"}/>;
    }

    const handleUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
    };

    const handlePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleLogin(username, password));
        setUsername("");
        setPassword("");
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mt-9" data-testid="login-heading">Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-slate-700">Username</label>
                    <div className="mt-1">
                        <input
                            value={username}
                            onChange={handleUsername}
                            type="text"
                            name="username"
                            id="username"
                            data-testid="username"
                            className="mb3"/>
                    </div>
                </div>
                <div className="mt-6">
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                    <div className="mt-1">
                        <input
                            value={password}
                            onChange={handlePassword}
                            type="password"
                            name="password"
                            id="password"
                            data-testid="password"
                            className="mb-3"/>
                    </div>
                </div>
                <div className="mt-6 text-right">
                    <button type="submit"
                            data-testid="submit"
                            className="w-100">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = ({authedUser}) => ({
    loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(Login);
