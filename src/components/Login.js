import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import {query, where, getDocs} from 'firebase/firestore'
import { usersRef } from "../firebase/firebase";
import { Appstate } from "../App";
import bcrypt from 'bcryptjs'
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [form, setForm] = useState({
    mobile: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const quer = query(usersRef, where('mobile', '==', form.mobile))
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if(isUser) {
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);
          swal({
            title: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000
          })
          navigate('/')
        } else {
          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000
          })
        }
      })
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false);
  }

  return (
    <div className="w-full flex flex-col mt-8 items-center">
    <h1 className="text-xl font-bold">Login</h1>
    <div class="p-2 w-full md:w-1/3">
      <div class="relative">
      <label for="message" class="leading-7 font-bold text-sm text-black-500">
          Mobile No.
        </label>
        <input
         type={"number"}
          id="message"
          name="message"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          class="w-full bg-gray-100 bg-opacity-50 font-bold rounded border border-grey-500 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-black-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
    </div>
    <div class="p-2 w-full md:w-1/3">
        <div class="relative">
        <label for="message" class="leading-7 font-bold text-sm text-black-500">
            Password
          </label>
          <input
            id="message"
            name="message"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            class="w-full bg-gray-100 bg-opacity-50 font-bold rounded border border-grey-500 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-black-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div class="p-2 w-full">
      <button
        onClick={login}
          class="flex mx-auto text-white bg-yellow-500 border-0 mt-2 py-3 px-8 focus:outline-none hover:bg-yellow-600 rounded text-2xl font-bold">
          {loading ? <TailSpin height={25} color="white" /> : "Login"}
        </button>
      </div>
      <div>
        <p>Do not have account? <Link to={'/signup'}><span className="text-blue-500">Sign Up</span></Link></p>
      </div>
    </div>
  );
};

export default Login;
