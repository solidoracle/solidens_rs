import CopyElement from './copy-element';
import { HStack, Text } from '@chakra-ui/react';
import { RiCheckboxCircleFill, RiFileCopyLine } from 'react-icons/ri';

type EnsCardProps = {
  ensData: string;
};

const EnsCard = ({ ensData }: EnsCardProps) => {
  return (
    <HStack p="6" backgroundColor={'white'} borderRadius={'4'}>
      <RiCheckboxCircleFill size="15px" color={'green'} />
      <Text fontSize={'16px'} color={'gray.500'} mb="0.5">
        {ensData}
      </Text>
      <CopyElement valueToCopy={ensData}>
        <RiFileCopyLine size="12px" color={'#424242'} cursor="pointer" />
      </CopyElement>
    </HStack>
  );
};

export default EnsCard;
