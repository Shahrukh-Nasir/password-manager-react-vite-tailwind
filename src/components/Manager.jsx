import React from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);
  const ShowPassword = () => {
    // alert("Show the Password");
    passwordRef.current.type = "text"; // to unhide password
    if (ref.current.src.includes("Icons/eyeslash.png")) {
      ref.current.src = "Icons/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "Icons/eyeslash.png";
      passwordRef.current.type = "password"; // we use this to hide password
    }
  };

  const SavePassowrd = () => {
if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3){

    
    toast("Password saved successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
          theme: "dark",
        });
        setPasswordArray([...passwordArray, {...form , id: uuidv4()}]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form , id: uuidv4()}]));
        console.log([...passwordArray, form]);
        setform({ site: "", username: "", password: "" })
    }
    else{
        toast("Length should be more then 3 letters", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
              theme: "dark",
            });
    }
        
    };
    
  const DeletePassowrd = (id) => {
      let c = confirm("Are you sure you want to delete this item?")
      
    console.log("Deleteing password with id" , id)
    if(c){
        toast("Password deleted!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
    setPasswordArray(passwordArray.filter(item => item.id!==id));
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id!==id)));
    // console.log([...passwordArray, form]);
  }
}

  const editpassword = (id) => {

    console.log("Editing password with id" , id)
    setform(passwordArray.filter(item=>item.id ===id)[0]);
    setPasswordArray(passwordArray.filter(item => item.id!==id))
    
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form , id: uuidv4()}]));
    // console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const Copytext = (Text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(Text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-screen w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      </div>

      <div className=" mx-auto md:mycontainer p-2 md:p-0 text-center">
        <h1 className=" text-white font-bold text-4xl">
          <span className="text-purple-800">&lt;</span>
          Pass
          <span className="text-purple-800">OP/&gt;</span>
        </h1>
        <p className="text-white">Your Own Password Manager</p>

        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            type="text"
            name="site"
            id="site"
            className=" border border-purple-800 md:flex-row flex-col rounded-full w-full py-1 px-4"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              type="text"
              name="username"
              id="username"
              className=" border border-purple-800 rounded-full w-full py-1 px-4"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                type="password"
                name="password"
                id="password"
                className=" border border-purple-800 rounded-full w-full py-1 px-4"
              />
              <span className="absolute right-[3px] top-[4px] cursor-pointer">
                <img
                  ref={ref}
                  className=" p-1"
                  width={26}
                  src="Icons/eye.png"
                  alt=""
                  onClick={ShowPassword}
                />
              </span>
            </div>
          </div>
          <button
            onClick={SavePassowrd}
            className="text-white hover:font-bold flex justify-center items-center bg-purple-800/50 w-fit rounded-full py-1 px-4 border border-purple-800"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#ffffff"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-white  text-xl py-4 font-bold flex ">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && (
            <div className="text-white">No passwords to show</div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full border border-white text-white overflow-hidden rounded-xl">
              <thead className="bg-purple-800/40">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          {" "}
                          <a href={item.site} target="_blank">
                            {" "}
                            {item.site}
                          </a>
                          <div
                            className=" lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              Copytext(item.site);
                            }}
                          >
                            {/* <script src="https://cdn.lordicon.com/lordicon.js"></script> */}
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                              colors="primary:#ffffff"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" justify-center py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="  lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              Copytext(item.username);
                            }}
                          >
                            {/* <script src="https://cdn.lordicon.com/lordicon.js"></script> */}
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                              colors="primary:#ffffff"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" justify-center py-2 border border-white text-center">
                        <div
                          className="flex items-center justify-center"
                          onClick={() => {
                            Copytext(item.password);
                          }}
                        >
                          <span>{item.password}</span>
                          <div className="lordiconcopy size-7 cursor-pointer">
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                              colors="primary:#ffffff"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" border items-center justify-center py-2 border-white text-center">
                        <span className="mx-1" onClick={()=>{editpassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#4030e8"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span className="max-1" onClick={()=>{DeletePassowrd(item.id)}}>
                          <script src="https://cdn.lordicon.com/lordicon.js"></script>
                          <lord-icon
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#ffffff"
                            style={{width:'25px', height: '25px'}}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
