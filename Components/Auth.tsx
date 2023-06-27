import { FC, useState } from "react";
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'


const Auth: FC = () => {

    const [togglePassword, setTogglePassword] = useState(false)
    
    const handleTogglePassword = () => {
        setTogglePassword(!togglePassword)
    }


    return ( 
        <div className={`fixed  bg-black w-screen h-screen z-100 opacity-70 flex justify-center items-center`}>
            <form className="flex flex-col gap-8 items-center w-1/4">
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

                  <div className="flex flex-col gap-4 w-full">
                    <label htmlFor="email" className="text-COMPONENT_BG font-semibold flex flex-col text-base bg-MAIN w-fit px-2 rounded-sm">
                    Email
                </label>
                <input type="email" id="email" name="email"  className="rounded-full border-none outline-none px-4 py-2" required/>
                </div>

                <input type="submit" value='SUBMIT' className="rounded-full bg-COMPONENT_BG px-8 py-2 font-semibold cursor-pointer"/>
            </form>
        </div>
     );
}
 
export default Auth;