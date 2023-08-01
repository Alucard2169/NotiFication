import { UserContextProps, userContext } from "@/context/UserContext";
import { Dispatch, FC, SetStateAction, useContext, useState } from "react";

import {
  Alert,
  AlertIcon,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";

interface AuthFormStateProps {
  state: StateProps;
}

interface StateProps {
  formState: boolean;
  setFormState: Dispatch<SetStateAction<boolean>>;
}

const AuthForm: FC<AuthFormStateProps> = ({ state }) => {
  const { formState, setFormState } = state;
  const userContextValue = useContext(userContext) as UserContextProps;
  const { setData } = userContextValue;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [formContent, setFormContent] = useState<string>("login");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setError(null);
    setUsername("");
    setPassword("");
    setEmail("");
    setFormState(false);
    setFormContent("login");
    setIsLoading(false);
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

 const handleAuthFormVisibility = (
   e: React.MouseEvent<HTMLDivElement>
 ): void => {
   const target = e.target as HTMLDivElement;

   if (target.getAttribute("data-set") === "backdrop") {
     resetForm();
   }
 };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
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
        // Handle signup error
        const errorData = await response.json();
        setIsLoading(false);
        setError(errorData.error);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("An error occurred during signup:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);

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
        setIsLoading(false);
        setError(errorData.error);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("An error occurred during login:", error);
    }
  };



  return (
    <div
      className={`fixed z-50 bg-black w-screen h-screen  flex justify-center items-center ${
        !formState ? "hidden" : null
        }`}
      onClick={(e) => handleAuthFormVisibility(e)}
      data-set="backdrop"
    >
    
      <form
        className="flex flex-col gap-8 items-center md:w-1/4 sm:w-80 sm:border sm:border-COMPONENT_PRIMARY_BG p-8 rounded-lg"
        onSubmit={formContent === "sign" ? handleSignUp : handleLogin}
      >
        {error && (
          <Alert status="error" borderRadius="full" w="full">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Stack spacing={4} w="full">
          <FormLabel
            htmlFor="username"
            className="text-COMPONENT_BG font-semibold flex flex-col text-base bg-MAIN w-fit px-2 rounded-sm"
          >
            Username
          </FormLabel>
          <Input
            type="text"
            className="text-PRIMARY font-semibold text-xl"
            id="username"
            name="username"
            onChange={handleUsernameChange}
            value={username}
            rounded="full"
            px={5}
            py={6}
            fontSize={20}
            required
          />

          <FormLabel
            htmlFor="password"
            className="relative text-COMPONENT_BG font-semibold flex flex-col text-base bg-MAIN w-fit px-2 rounded-sm"
          >
            Password
          </FormLabel>

          <InputGroup size="md">
            <Input
              id="password"
              type={togglePassword ? "text" : "password"}
              name="password"
              onChange={handlePasswordChange}
              value={password}
              rounded="full"
              className="text-PRIMARY font-semibold"
              pr="4.5rem"
              px={5}
              py={6}
              fontSize={20}
              required
            />
            <InputRightElement width="3rem" mr={4} mt={1}>
              <Button h="1.50rem" size="sm" onClick={handleTogglePassword}>
                {togglePassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Stack>

        {formContent === "sign" && (
          <Stack spacing={4} w="full">
            <FormLabel
              htmlFor="email"
              className="text-COMPONENT_BG font-semibold flex flex-col text-base bg-MAIN w-fit px-2 rounded-sm"
            >
              Email
            </FormLabel>
            
            <Input
              type="email"
              className="text-PRIMARY font-semibold text-xl"
              id="email"
              name="email"
              onChange={handleEmailChange}
              value={email}
              rounded="full"
              px={5}
              py={6}
              fontSize={20}
              required
            />
          </Stack>
        )}

        <Button
          type="submit"
          isLoading={isLoading}
          rounded="full"
          className="text-PRIMARY hover:bg-PRIMARY hover:text-MAIN"
       
          px={8}
          py={2}
          fontWeight="semibold"
          cursor="pointer"
         
          _disabled={{
            opacity: 0.5,
            cursor: "not-allowed",
          }}
        >
          SUBMIT
        </Button>

        <p className="text-white mr-auto">
          {formContent === "sign" ? (
            <>
              Already a User -{" "}
              <Button
                type="button"
                bg="blue.500"
                p={1}
                rounded="md"
                color="black"
                fontWeight="semibold"
                onClick={handleFormContent}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              New User -{" "}
              <Button
                type="button"
                bg="blue.500"
                p={1}
                rounded="md"
                color="black"
                fontWeight="semibold"
                onClick={handleFormContent}
              >
                SignUp
              </Button>
            </>
          )}
        </p>
      </form>
    </div>
  );
};


export default AuthForm;
