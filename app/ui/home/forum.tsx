"use client"


import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";
import { BiSearchAlt } from "react-icons/bi";

const SearchForum = () => {
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const query = e.currentTarget.elements.namedItem(
      "query"
    ) as HTMLInputElement;
    router.push(`/${query.value}`);
  };

  return (
    <form className="my-8 flex justify-center" onSubmit={handleSubmit}>
      <label htmlFor="query">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <BiSearchAlt color="#fff" />
          </InputLeftElement>
          <Input
            id="query"
            name="query"
            type="text"
            placeholder="Search here..."
            paddingLeft={10}
            width="100%"
            color="white"
            focusBorderColor="black"
            required
          />
        </InputGroup>
      </label>
    </form>
  );
};

export default SearchForum;
