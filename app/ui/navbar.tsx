"use client"

import { UserContext, UserContextProps } from "@/context/userContext";
import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";



export const NavButton = ({ content, link }: { content: string, link: string | null }) => {
    return (
        <Button variant='solid' alignContent="center" color={content === "Logout" ? "red" : undefined} size="sm">
            {link ? <Link href={link}>
                {content}
            </Link> : content}
        </Button>
    )
} 


const Navbar = () => {
  const route = useRouter();
  const supabase = createClientComponentClient();  
  const { user,setUser } = useContext<UserContextProps>(UserContext);

  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error);
    }
    setUser(null)
    route.push('/')
  }


    return (
      <Flex
        minWidth="max-content"
        paddingInline={4}
        paddingBlock={2}
        alignItems="center"
        gap="2"
        width="full"
        position="fixed"
        height="inherit"
        className="bg-MAIN_BG"
      >
        <Box>
          <Heading size="md" color="white">
            <Link href="/">Notify</Link>
          </Heading>
        </Box>

        <Spacer />

        <ButtonGroup gap="2">
          {user ? (
            <>
            
              <Button
                colorScheme="red"
                size="sm"
                rightIcon={<IoLogOut />}
                onClick={handleLogout}
              >
                Logout
              </Button>
              <Button colorScheme="gray" size="sm" rightIcon={<CgProfile />}>
                <Link href={`/user/${user?.id}`}>Profile</Link>
              </Button>
            </>
          ) : (
            <Button colorScheme="gray" size="sm">
              <Link href="/auth">Sign In</Link>
            </Button>
          )}
        </ButtonGroup>
      </Flex>
    );
}
 
export default Navbar;