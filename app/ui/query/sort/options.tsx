"use client"

import { SortContext, SortContextProps } from "@/context/sortContext";
import { Button, Grid } from "@chakra-ui/react";
import { useContext } from "react";

interface SortDataParams {
  id: number;
  name: string;
}

const Options = ({ data, head }: { data: SortDataParams[]; head: string }) => {
  const { sort, setSort } = useContext<SortContextProps>(SortContext);

  const handleSorting = (sortValue: string) => {
    setSort((prevObject : any) => {
      const newValue = prevObject[head] === sortValue ? "" : sortValue;
      return { ...prevObject, [head]: newValue };
    });
  };

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap={6}
      maxHeight={"15rem"}
      overflow={"scroll"}
    >
      {data.map((option) => (
        <Button
          title={option.name}
          w="100%"
          h="10"
          bg={sort[head] === option.name ? "green.400" : "red.400"}
          textColor={sort[head] === option.name ? "white" : "black"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          rounded="10px"
          key={option.id}
          onClick={() => handleSorting(option.name)}
        >
          <span className="text-sm font-bold">
            {option.name.length > 10
              ? option.name.slice(0, 10) + "..."
              : option.name}
          </span>
        </Button>
      ))}
    </Grid>
  );
};

export default Options;
