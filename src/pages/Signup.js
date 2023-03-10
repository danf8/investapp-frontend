function SignUp(props){
    return (
    <>
    <h1>Sign Up Page</h1>
    <form action="/signup" method='POST'>
        <label>
             Email: <input type="email" name="email" required/>
        </label><br/><br/>
        <label>
            Password: <input type="password" name="password" required/>
        </label><br/><br/>
        <a href="/login">Sign in instead</a>
        <input id="SignupBtn" type="submit" value="Sign Up"/>
    </form>
    </>
    )
};

export default SignUp;