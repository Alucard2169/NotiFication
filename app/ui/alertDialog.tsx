import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';
import Link from 'next/link';


const AlertBox = ({
  status,
  title,
  description,
}: {
  status: "error" | "success" | "warning";
  title: string;
  description: string;
}) => {
  return (
    <div className='flex flex-col justify-center gap-4 w-[80%]'> 
      <Alert status={status}>
        <AlertIcon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
      <button className="rounded-md bg-MAIN_BG font-bold text-NEUTRAL py-2 px-4 hover:bg-COMPONENT_BG transition-colors">
        <Link href="/">Go Back</Link>
      </button>
    </div>
  );
};
 
export default AlertBox;