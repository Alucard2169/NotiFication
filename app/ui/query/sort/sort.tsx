

import { Accordion } from "@chakra-ui/react";
import { promises as fs } from "fs";
import SortCard from "./sortCard";

const Sort = async () => {

  const file = await fs.readFile(
    process.cwd() + "/sortParam/data.json",
    "utf8"
  );
    const data= JSON.parse(file)
  const licenses = data.licenses;
  const languages = data.languages;
  const keywords = data.keywords;
  const platforms = data.platforms;


    return (
      <div className="pt-4">
        <Accordion allowToggle>
          <SortCard head="Licenses" data={licenses} />
          <SortCard head="Languages" data={languages} />
          <SortCard head="Keywords" data={keywords} />
          <SortCard head="Platforms" data={platforms}/>
        </Accordion>
      </div>
    );
}
 
export default Sort;