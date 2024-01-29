import { Accordion } from "@chakra-ui/react";
import { promises as fs } from "fs";
import path from "path";
import SortCard from "./sortCard";

const Sort = async () => {
  try {
    const filePath = path.join(process.cwd(), "sortParam", "data.json");
    const file = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(file);
    const licenses = data.licenses;
    const languages = data.languages;
    const keywords = data.keywords;
    const platforms = data.platforms;

    return (
      <div className="pt-4">
        <Accordion allowToggle >
          <SortCard head="Licenses" data={licenses} />
          <SortCard head="Languages" data={languages} />
          <SortCard head="Keywords" data={keywords} />
          <SortCard head="Platforms" data={platforms} />
        </Accordion>
      </div>
    );
  } catch (error) {
    console.error("Error loading or processing data:", error);
    return <div>Error loading data. Please try again.</div>;
  }
};

export default Sort;
