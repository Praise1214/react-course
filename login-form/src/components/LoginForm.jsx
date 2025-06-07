import './LoginForm.css';
function LoginForm ({showPassword, setShowPassword}) {

    function switchPassword() {
        if (showPassword) {
            setShowPassword(false)
        }
        else {
            setShowPassword(true)
        }
    }
    return(
        <>
        <p>Hello, welcome to my website</p>
        <div>
            <input placeholder = "Email" className = "email-input"/>
        </div>
        <div>
            <input 
                placeholder = "password" 
                className = "password-input"
                type = {showPassword === true ? 'text' : 'password'}
            />
            <button onClick = {switchPassword}>{showPassword ? 'Hide' : 'Show'}</button>
        </div>
        <button className ="login-button">Login</button>
        <button className = "sign-up-button">Sign up</button>
        </>
    )
}

export default LoginForm;