import React, { useState } from "react";
import SignUpImage from "../assest/login-animation.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ImageToBase } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();
  const [ShowPassword, setShowPassword] = useState(false);
  const [ConfirmShowPassword, setConfirmShowPassword] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    image: "",
  });
  //console.log(data);

  const handleShowPassword = () => {
    setShowPassword((preval) => !preval);
  };

  const handleConfirmShowPassword = () => {
    setConfirmShowPassword((preval) => !preval);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    //const name = e.target.name;
    //const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const Image = await ImageToBase(e.target.files[0]);
    setData((pre) => {
      return {
        ...pre,
        image: Image,
      };
    });
  };
  // console.log(process.env.REACT_APP);
  //console.log(import.meta.REACT_APP);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, email, password, confirmpassword } = data;
    if (firstname && email && password && confirmpassword) {
      if (password === confirmpassword) {
        const fetchData = await fetch(
          `${import.meta.env.VITE_REACT_APP}/v1/auth/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const Resdata = await fetchData.json();
        toast.success(Resdata.msg);
        if (Resdata.alert) {
          navigate("/login");
        }
      } else {
        toast.error("Password is not Matched.!!");
      }
    } else {
      toast.error("Fill the Form First.!!");
    }
  };

  return (
    <div className="p-3  md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
        {/* <h1 className='text-center text-2xl font-semibold '>Sign Up</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md relative ">
          <img
            className="h-full w-full "
            src={data.image ? data.image : SignUpImage}
          />

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-60 w-full text-center cursor-pointer ">
              <p className="text-sm text-white">Upload</p>
              <input
                onChange={handleImageUpload}
                type="file"
                className="hidden"
                id="profileImage"
                accept="image/*"
              />
            </div>
          </label>
        </div>

        <form
          method="POST"
          onSubmit={handleSubmit}
          className="py-3 w-full flex flex-col"
        >
          <label htmlFor="firstname" className="">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={data.firstname}
            onChange={handleOnChange}
            className="w-full bg-slate-200 py-2 px-2 mt-1 rounded mb-2 focus-within:outline-blue-400"
          />

          <label htmlFor="lastname" className="">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={data.lastname}
            onChange={handleOnChange}
            className="w-full bg-slate-200 py-2 px-2 mt-1 rounded mb-2 focus-within:outline-blue-400"
          />

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

          <label htmlFor="password" className="">
            Confirm Password
          </label>
          <div className="flex  bg-slate-200 py-2 px-2 mt-1 rounded focus-within:outline focus-within:outline-blue-400">
            <input
              type={ConfirmShowPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              value={data.confirmpassword}
              onChange={handleOnChange}
              className="w-full bg-slate-200 border-none outline-none"
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleConfirmShowPassword}
            >
              {ConfirmShowPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button
            type="submit"
            className="mx-auto max-w-[120px] w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-semibold rounded-full mt-5 py-2"
          >
            SignUp
          </button>
        </form>
        <p>
          Already have account ?{" "}
          <Link className="hover:text-blue-600" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
