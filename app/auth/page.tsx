"use client"
import { UserContext, UserContextProps } from "@/context/userContext";
import { Button } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { FaGithub, FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import InputBox from "../ui/inputBox";

const Page = () => {
  const router = useRouter()
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setUser } = useContext<UserContextProps>(UserContext);

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const supabase = createClientComponentClient();

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          },
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        setError(null);
        const { user } = data;
        setUser(user);
        setMessage("Sign up successful");
        router.back()
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message);

        if (error.message === "Invalid login credentials") {
          throw new Error(
            "Invalid Credentials, please check your credentials or try Signing up"
          );
        }

        if (error.message === "Email not confirmed") {
          throw new Error("Email not verified");
        }
        return;
      }

      if (data) {
        setError(null);
        const { user } = data;
        setUser(user);
        setMessage("Sign in successful"); 
             router.back();
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGithubLogin = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      setError(error.message);
    }
  };
    return (
      <div className="pt-4 flex justify-center items-center h-full">
        <div className="relative sm:w-2/5 w-full">
          <p className="text-center mb-8 text-sm font-light text-red-500">
            {error}
          </p>
          <p className="text-center mb-8 text-sm font-light text-green-500">
            {message && message}
          </p>
          <form
            className="flex flex-col gap-6 sm:gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <InputBox
              id="name"
              content="Username"
              type="text"
              required={true}
              name="username"
              value={username}
              handleValue={handleUsername}
            />
            <InputBox
              id="email"
              content="Email"
              type="email"
              required={true}
              name="email"
              value={email}
              handleValue={handleEmail}
            />
            <div className="relative">
              <InputBox
                id="pass"
                content="Password"
                type={isVisible ? "text" : "password"}
                required={true}
                name="password"
                value={password}
                handleValue={handlePassword}
              />
              <button
                type="button"
                className="absolute top-[60%] right-5 text-white"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? <FaRegEyeSlash /> : <IoEyeOutline />}
              </button>
            </div>
            <Button type="button" colorScheme="gray" leftIcon={<FaGithub/>} onClick={handleGithubLogin}>Github</Button>
            <input
              type="submit"
              value="Sign in"
              className="bg-COMPONENT_BG text-MAIN font-bold sm:pt-1 p-2 rounded-md cursor-pointer"
              onClick={handleSignIn}
            />
            <input
              type="submit"
              value="Sign Up"
              className="bg-PRIMARY_BG text-white font-bold sm:pt-1 p-2 rounded-md cursor-pointer"
              onClick={handleSignUp}
            />
          </form>
        </div>
      </div>
    );
}
 
export default Page;