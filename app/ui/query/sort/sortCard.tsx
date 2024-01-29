import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import Options from "./options";

interface SortDataParams {
    id: number;
    name: string;
}

const SortCard = ({ head, data }: { head: string; data: SortDataParams[] }) => {
  
    return (
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "lightgreen", color: "black" }}>
            <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
              {head}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <Options data={data} head={head} />
        </AccordionPanel>
      </AccordionItem>
    );
}
 
export default SortCard;