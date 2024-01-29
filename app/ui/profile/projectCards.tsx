import { Button, Card, CardBody, CardHeader } from "@chakra-ui/react";
import { GoBellSlash } from "react-icons/go";
import { formatDate } from "../details/query/releases";
import { DataProps } from "./projectContainer";

const ProjectCards = (props: {
  data: DataProps;
  handler: (id: string) => void;
}) => {

  const { id, user_id, project_name, platform, create_at } = props.data;




const handleUnsubscription = async () => {
  props.handler(id);
};

  return (
    <Card size="sm" height={"fit-content"} variant={"outline"} background="none">
      <CardHeader>
        <h2 className="text-md sm:text-lg font-bold text-white">{project_name}</h2>
      </CardHeader>
      <CardBody display="flex" flexDirection={"column"} gap={2}>
        <p className="flex justify-between items-center text-white text-sm sm:text-md">
          Platform
          <span className="bg-MAIN_BG text-xs sm:text-md p-1 text-white sm:p-2 rounded-md">
            {platform}
          </span>
        </p>
        <p className="text-xs sm:text-sm mt-4 sm:mt-0 text-white">
          Subscribed At: <span className="text-yellow-500">{formatDate(create_at)}</span>
        </p>
        <Button
          leftIcon={<GoBellSlash />}
          background={"red"}
          textColor={"black"}
          onClick={handleUnsubscription}
          fontSize={".9rem"}
        >
          Unsubscribe
        </Button>
      </CardBody>
    </Card>
  );
};
 
export default ProjectCards;