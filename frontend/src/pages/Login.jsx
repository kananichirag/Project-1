import React, { useState } from "react";
import SignUpImage from "../assest/login-animation.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link,  useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector,useDispatch } from "react-redux";
import { loginRedux } from "../redux/userSlice";



function Login() {
  const navigate = useNavigate();
  const [ShowPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });
 

const dispatch = useDispatch()

  const handleShowPassword = () => {
    setShowPassword((preval) => !preval);
  };



  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {  email, password} = data;
    if ( email && password ) {
        const fetchData = await fetch(`${import.meta.env.VITE_REACT_APP}/v1/auth/signin`,
        {
          method:'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(data)
        })   

        const ResData = await fetchData.json();
        toast.success(ResData.msg);
        if(ResData.alert){
          dispatch(loginRedux(ResData))
          navigate('/home')
        }
         
    } else {
      toast.error("Enter Value First.!!")
    }
  };
  return (
    <div className="p-3  md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
        {/* <h1 className='text-center text-2xl font-semibold '>Sign Up</h1> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md">
          <img className=" " src={SignUpImage} />
        </div>

        <form
          method="POST"
          onSubmit={handleSubmit}
          className="py-3 w-full flex flex-col"
        >


          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            className="w-full bg-slate-200 py-2 px-2 mt-1 rounded focus-within:outline-blue-400"
          />

          <label htmlFor="password" className="">
            Password
          </label>
          <div className="flex  bg-slate-200 py-2 px-2 mt-1 rounded focus-within:outline focus-within:outline-blue-400">
            <input
              type={ShowPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              className="w-full bg-slate-200 border-none outline-none"
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {ShowPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>


          <button
            type="submit"
            className="mx-auto max-w-[120px] w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-semibold rounded-full mt-5 py-2"
          >
            Login
          </button>
        </form>
        <p>
          Don't have account ?{" "}
          <Link className="hover:text-blue-600" to="/signup">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
