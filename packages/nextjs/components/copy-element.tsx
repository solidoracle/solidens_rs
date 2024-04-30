import React from 'react';
import { LoadingDots } from './loading-dots';
import { Button, ButtonProps, Center, useClipboard, useToast } from '@chakra-ui/react';

const CopyElement = ({
  valueToCopy,
  children,
  light,
  isDisabled,
  ...overrides
}: { valueToCopy: string; children: JSX.Element; light?: boolean; isDisabled?: boolean } & ButtonProps) => {
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(valueToCopy, 1000);

  return (
    <Button
      variant={'ghost'}
      borderRadius="full"
      p="0"
      minW="20px"
      isDisabled={isDisabled}
      color={light ? 'white' : 'accent'}
      onClick={() => {
        onCopy();
        setTimeout(
          () =>
            toast({
              description: (
                <Center textAlign={'center'}>
                  {valueToCopy} <br /> copiato nella clipboard
                </Center>
              ),
              duration: 5000,
              status: 'success',
              position: 'top',
              isClosable: true,
            }),
          500,
        );
      }}
      aria-label={`Copy ${valueToCopy}`}
      {...overrides}>
      {hasCopied ? <LoadingDots color={light ? 'white' : 'accent'} /> : children}
    </Button>
  );
};

export default CopyElement;
