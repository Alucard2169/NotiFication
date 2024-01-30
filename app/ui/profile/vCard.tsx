import { Card, CardBody, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react';

const VCard = ({
  name,
  version,
  days,
  hours,
  platform,
}: {
  name: string;
  version: string;
  days: string | null;
  hours : string | null;
  platform: string;
  }) => {
  

  return (
    <Card size="sm" backgroundColor={"#131313"}>
      <CardHeader
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading size="md" textColor={"white"}>
          {name}
        </Heading>
        <span className="bg-MAIN text-white p-1 rounded-sm text-sm">
          {platform}
        </span>
      </CardHeader>
      <CardBody>
        <Text
          textColor={"white"}
          backgroundColor={"black"}
          padding={".5rem"}
          rounded={"10px"}
        >
          Version: <span className="font-bold text-blue-500">{version}</span>
        </Text>
      </CardBody>
      <CardFooter
        fontSize=".8rem"
        display={"flex"}
        textColor={"white"}
        alignItems={"baseline"}
      >
        <span className="text-blue-500 mr-2 text-lg font-bold">{days || hours}</span>
      </CardFooter>
    </Card>
  );
};
 
export default VCard;