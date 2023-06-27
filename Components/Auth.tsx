import { authContext, AuthContextProps} from "@/context/AuthContext";
import { FC, useState, useContext } from "react";
import {AiFillCloseCircle, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const Auth: FC = () => {
  const contextValue = useContext(authContext) ?? ({} as AuthContextProps);
  const { state, setState } = contextValue;

    const [togglePassword, setTogglePassword] = useState<boolean>(false);
const [formContent, setFormContent] = useState<string>('login');

   const handleFormContent = (): void => {
  setFormContent((prevFormContent) => (prevFormContent === 'login' ? 'sign' : 'login'));
};


  const handleTogglePassword = ():void => {
    setTogglePassword(!togglePassword);
    };
    

    const handleAuthFormVisibility = ():void => {
        setState(false)
    }


    return ( 
        <div className={`fixed  bg-black w-screen h-screen z-100 opacity-70 flex justify-center items-center ${!state ? "hidden" : null}`}>
            <AiFillCloseCircle className="absolute text-COMPONENT_BG text-3xl top-1/4 right-1/4 cursor-pointer hover:text-white" onClick={handleAuthFormVisibility}/>
            <form className="flex flex-col gap-8 items-center w-1/4 ">
                <div className="flex flex-col gap-4 w-full">
                    <label htmlFor="username" className="text-COMPONENT_BG font-semibold flex flex-col text-base bg-MAIN w-fit px-2 rounded-sm">
                    Username
                </label>
                <input type="text" id="username" name="username" className="rounded-full border-none outline-none px-4 py-2"  required/>
                </div>
                  <div className="flex flex-col gap-4 w-full relative">
                    <label htmlFor="Password" className="text-COMPONENT_BG font-semibold flex flex-col text-base bg-MAIN w-fit px-2 rounded-sm">
                    Password
                </label>
                    <input type={togglePassword ? 'text' : "password"} id="password" name="password" className="rounded-full border-none outline-none px-4 py-2 pr-12" required />
                    {togglePassword ? <AiOutlineEyeInvisible className="eyeIcon" onClick={handleTogglePassword}/> : <AiOutlineEye className="eyeIcon" onClick={handleTogglePassword}/>}
                </div>

                <div className={`flex flex-col gap-4 w-full h-0 w-0 overflow-hidden ${formContent === 'sign' ? 'h-full !w-full overflow-visible' : null} transition-all duration-400 `}>
                    <label htmlFor="email" className="text-COMPONENT_BG font-semibold flex flex-col text-base bg-MAIN w-fit px-2 rounded-sm">
                    Email
                </label>
                <input type="email" id="email" name="email"  className="rounded-full border-none outline-none px-4 py-2" required/>
                </div>

                 <input type="submit" value='SUBMIT' className="rounded-full bg-COMPONENT_BG px-8 py-2 font-semibold cursor-pointer" />
                 <p className="text-white mr-auto">
  {formContent === 'sign' ? (
    <>
      Already a User -{' '}
      <button type="button" className="bg-blue-500 p-1 rounded-md text-black font-semibold" onClick={handleFormContent}>
        Login
      </button>
    </>
  ) : (
    <>
      New User -{' '}
      <button type="button" className="bg-blue-500 p-1 rounded-md text-black font-semibold" onClick={handleFormContent}>
        SignUp
      </button>
    </>
  )}
</p>

            </form>


       
        </div>
     );
}
 
export default Auth;