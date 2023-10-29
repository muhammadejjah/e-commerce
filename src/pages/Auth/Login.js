
import React, { Fragment, useEffect, useRef } from 'react'
import { Container, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { login } from '../../State/AuthSlics';
import Loading from '../../components/Website/Loading';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Cookie from "cookie-universal";
const Login = () => {
    const dispatch = useDispatch()
    const { loading, error, token } = useSelector(state => state.AuthSlics)
    const navigate = useNavigate()
    // states
    const [form, setForm] = React.useState({
        email: "",
        password: "",
    })
    const [err, seterr] = React.useState(null)
    const focus =useRef(null)
    const handleChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    useEffect(()=>{
        focus.current.focus()
    },[])
    //handle submit
    const cookie = Cookie()
    const handleSubmit =  (e) => {
        e.preventDefault();
        dispatch(login(form)).then((result) => {
            const user = result.payload.user
            if (cookie.get("e-commerce")) {
                if (user.role === "1995") {
                    navigate("/dashboard/users")
                } else if (user.role === "1996") {
                    navigate("/dashboard/writer")
                } else if (user.role === "2001") {
                    navigate("/")
                } else if (user.role === "1999") {
                    navigate("/dashboard/categories")
                }
            }
        })
    }
    
    return (
        <Fragment>
            {error && <Alert className='fixed-top w-100 rounded-0  ' variant="danger">
                Wrong Email Or password
            </Alert>}
            {err && <Alert className='fixed-top w-100 rounded-0  ' variant="danger">
                Wrong Email Or password
            </Alert>}
            <Container className=''  >
                <div className='row hi-100'>
                    <form
                        onSubmit={handleSubmit}
                        className='form shadow  '
                    >
                        <h1 className='fw-bold mb-4'>Login</h1>
                        <div className='custom-form'>
                            <div className='form-controll'>
                                <input
                                    id='Email'
                                    name='email'
                                    type='email'
                                    placeholder='Enter Your Email'
                                    value={form.email}
                                    onChange={handleChange}
                                    ref={focus}
                                    required
                                />
                                <label style={{ width: "80px" }} htmlFor='Email'>Email</label>
                            </div>
                            <div className='form-controll'>
                                <input
                                    id='Password'
                                    name='password'
                                    type='password'
                                    placeholder='Enter Your Password'
                                    value={form.password}
                                    onChange={handleChange}
                                    autoComplete={form.password.toString()}
                                    minLength={6}
                                    required
                                />
                                <label style={{ width: "80px" }} htmlFor='Password'>Password</label>
                            </div>
                            <span>Dont Have Account <Link to="/register">Register now</Link></span>
                        </div>
                        <Loading loading={loading}>
                            <Button
                                variant="primary"
                                className='my-3'
                                type='submit'
                            >Login
                            </Button>
                        </Loading>
                        <p>Or Login With :</p>
                        <a href={"http://127.0.0.1:8000/login-google"} className='mt-0 google-icon'>
                            <svg className='' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                        </a>
                    </form>
                </div>
            </Container>
        </Fragment>
    )
}

export default Login

