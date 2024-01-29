import { Card, CardBody, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react';

const VCard = ({ name, version, days, platform }: { name: string; version: string; days: number; platform: string}) => {
    return (
      <Card size="sm">
        <CardHeader display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
          <Heading size="md" textColor={"white"}>{name}</Heading>
          <span className='bg-MAIN text-white p-1 rounded-sm text-sm' >NPM</span>
        </CardHeader>
        <CardBody>
          <Text textColor={"black"}>
            Version: <span className='font-bold text-white'>{version}</span>
          </Text>
        </CardBody>
        <CardFooter fontSize=".8rem" display={"flex"} alignItems={"baseline"}>
          <span className='text-blue-500 mr-2 text-lg font-bold'>{days}</span> days ago
        </CardFooter>
      </Card>
    );
}
 
export default VCard;