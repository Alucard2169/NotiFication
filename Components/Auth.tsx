import { FC, useState, useContext } from "react";

import {
  AiFillCloseCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { authContext, AuthContextProps } from "@/context/AuthFormContext";
import { userContext, UserContextProps } from "@/context/UserContext";

const Auth: FC = () => {
  const contextValue = useContext(authContext) as AuthContextProps;
  const { state, setState } = contextValue;
  const userContextValue = useContext(userContext) as UserContextProps;
  const { setData } = userContextValue;

  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [formContent, setFormContent] = useState<string>("login");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading,setIsLoading] = useState<boolean>(false)

  const resetForm = () => {
    setError(null);
    setUsername("");
    setPassword("");
    setEmail("");
    setState(false);
    setFormContent("login");
    setIsLoading(false)
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFormContent = (): void => {
    setFormContent((prevFormContent) =>
      prevFormContent === "login" ? "sign" : "login"
    );
    setError(null);
  };

  const handleTogglePassword = (): void => {
    setTogglePassword(!togglePassword);
  };

  const handleAuthFormVisibility = (): void => {
 
    resetForm()
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
        resetForm();
      } else {
        // Handle login error
        const errorData = await response.json();
        setIsLoading(false)
        setError(errorData.error);
      }
    } catch (error) {
      setIsLoading(false)
      console.error("An error occurred during login:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
        resetForm();
      } else {
        // Handle login error
        const errorData = await response.json();
        setIsLoading(false)
        setError(errorData.error);
      }
    } catch (error) {
      setIsLoading(false)
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <div
      className={`fixed z-50 bg-black w-screen h-screen  flex justify-center items-center ${
        !state ? "hidden" : null
      }`}
    >
      <AiFillCloseCircle
        className="absolute text-COMPONENT_BG text-3xl  lg:top-1/4 top-28 right-1/3 cursor-pointer hover:text-white"
        onClick={handleAuthFormVisibility}
      />
      <form
        className="flex flex-col gap-8 items-center md:w-1/4 sm:w-80 border border-COMPONENT_PRIMARY_BG p-8 rounded-lg"
        onSubmit={(e) => {
          formContent === "sign" ? handleSignUp(e) : handleLogin(e);
        }}
      >
        {error && (
          <p className="rounded-full py-1 bg-red-700 w-full text-center text-white font-semibold">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-4 w-full">
          <label
            htmlFor="username"
            className="text-COMPONENT_BG font-semibold flex flex-col text-base bg-MAIN w-fit px-2 rounded-sm"
          >
            Username
          </label>

          <input
            type="text"
            id="username"
            name="username"
            onChange={handleUsernameChange}
            value={username}
            className="rounded-full border-none outline-none px-4 py-2"
            required
          />
        </div>

        <div className="flex flex-col gap-4 w-full relative">
          <label
            htmlFor="password"
            className="text-COMPONENT_BG font-semibold flex flex-col text-base bg-MAIN w-fit px-2 rounded-sm"
          >
            Password
          </label>

          <input
            type={togglePassword ? "text" : "password"}
            id="password"
            name="password"
            onChange={handlePasswordChange}
            value={password}
            className="rounded-full border-none outline-none px-4 py-2 pr-12"
            required
          />

          {togglePassword ? (
            <AiOutlineEyeInvisible
              className="eyeIcon"
              onClick={handleTogglePassword}
            />
          ) : (
            <AiOutlineEye className="eyeIcon" onClick={handleTogglePassword} />
          )}
        </div>

        {formContent === "sign" && (
          <div className={`flex flex-col gap-4 w-full overflow-hidden `}>
            <label
              htmlFor="email"
              className="text-COMPONENT_BG font-semibold flex flex-col text-base bg-MAIN w-fit px-2 rounded-sm"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              onChange={handleEmailChange}
              value={email}
              className="rounded-full border-none outline-none px-4 py-2"
              required
            />
          </div>
        )}

        <input
          type="submit"
          value="SUBMIT"
          className={`${
            isLoading ? "bg-opacity-50 pointer-events-none" : null
          } rounded-full bg-COMPONENT_BG px-8 py-2 font-semibold cursor-pointer`}
        />

        <p className="text-white mr-auto">
          {formContent === "sign" ? (
            <>
              Already a User -{" "}
              <button
                type="button"
                className="bg-blue-500 p-1 rounded-md text-black font-semibold"
                onClick={handleFormContent}
              >
                Login
              </button>
            </>
          ) : (
            <>
              New User -{" "}
              <button
                type="button"
                className="bg-blue-500 p-1 rounded-md text-black font-semibold"
                onClick={handleFormContent}
              >
                SignUp
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Auth;
