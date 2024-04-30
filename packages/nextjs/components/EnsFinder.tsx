import { ChangeEvent, FormEvent, useState } from 'react';
import error from 'next/error';
import Image from 'next/image';
import PecCard from './EnsCard';
import EnsCard from './EnsCard';
import {
  Button,
  ButtonProps,
  Container,
  Flex,
  FormControl,
  Grid,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { RiHistoryFill } from 'react-icons/ri';
import { useAccount } from 'wagmi';
import { hardhat } from 'wagmi/chains';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { SwitchTheme } from '~~/components/SwitchTheme';
import { AddressInput, Faucet } from '~~/components/scaffold-eth';
import { useIsMobile } from '~~/hooks/other/useIsMobile';
import planes from '~~/public/planes.png';
import { useAppStore } from '~~/services/store/store';
import { getTargetNetwork } from '~~/utils/scaffold-eth';

type FinderHeadingProps = {
  ImageWidth: number | undefined;
};

const FinderHeading = ({ ImageWidth }: FinderHeadingProps) => {
  return (
    <>
      <Flex justify="center" pt="10">
        <Image src={planes} alt="Planes" width={ImageWidth} />
      </Flex>
      <Heading as="h1" fontSize={{ base: '30px', md: '45px' }} pt="5" mb="-5">
        Query blockchain
      </Heading>
      <Text fontSize={{ base: '12px', md: '14px' }} color="gray.500">
        Frontend for ENS JSON API & Cloudflare Worker written in Rust
      </Text>
    </>
  );
};

interface TabButtonProps extends ButtonProps {
  addressSearch: boolean;
  children?: React.ReactNode;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ children, addressSearch, onClick, ...buttonProps }) => {
  if (!addressSearch) {
    return (
      <Text
        as="b"
        color="black"
        cursor="pointer"
        onClick={onClick}
        style={{ marginBottom: '4px', display: 'block' }}
        mx="2">
        {children}
      </Text>
    );
  }

  return (
    <Button
      borderRadius="lg"
      bg={addressSearch ? 'gray.50' : 'white'}
      mb="1"
      _hover={{ bg: 'gray.50' }}
      color={addressSearch ? '#1326cd' : 'black'}
      as="b"
      cursor="pointer"
      onClick={onClick}
      {...buttonProps}>
      {children}
    </Button>
  );
};

export const EnsFinder = () => {
  const ImageWidth = useBreakpointValue({ base: 180, md: 200 });
  const [addressSearch, setAddressSearch] = useState(true);
  const isMobile = useIsMobile();
  const [addy, setAddy] = useState('');
  const [ensData, setEnsData] = useState('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address } = useAccount();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // if valid address, query endpoint that you save in local env variable
    if (/^(0x[a-fA-F0-9]{40}|.+\.eth)$/.test(addy)) {
      setIsLoading(true);
      try {
        console.log('process.env.ENDPOINT_URL', process.env.NEXT_PUBLIC_ENDPOINT_URL);
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT_URL}/${addy}`);
        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Received non-JSON response from the API');
        }
        const data = await response.json();
        setEnsData(data.name); // This line correctly sets the 'name' field from the JSON response
      } catch (error) {
        console.error('Failed to fetch ENS data:', error);
        // Optionally, update the UI to show an error message
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <FinderHeading ImageWidth={ImageWidth} />
      <Grid textAlign="center" mt="8" minW={{ base: '0', md: '600px' }}>
        <HStack ml="4" mb="-2">
          <TabButton addressSearch={addressSearch} onClick={() => setAddressSearch(true)}>
            ADDRESS
          </TabButton>
          <TabButton addressSearch={!addressSearch} onClick={() => setAddressSearch(false)}>
            {' '}
            ENS
          </TabButton>
        </HStack>
        <Container bg={'gray.50'} boxShadow={'xl'} rounded={'lg'} p={isMobile ? '5' : '10'}>
          <Flex justify="space-between" align="center" mb={6}>
            <Heading as={'h2'} fontSize={{ base: '20px', sm: 'xl' }} textAlign={'left'} my="0">
              Query the ENS API at the speed of light ⚡
            </Heading>
            {address && <RiHistoryFill size={isMobile ? '16px' : '23px'} onClick={() => null} cursor={'pointer'} />}
          </Flex>
          <Stack direction={{ base: 'column', md: 'row' }} as={'form'} spacing={'12px'} onSubmit={handleSubmit} mb="4">
            <FormControl>
              <AddressInput
                name="addy"
                placeholder="0x Address or ENS name"
                value={addy}
                onChange={(e: string) => setAddy(e)}
              />
            </FormControl>
            <FormControl w={{ base: '100%', md: '40%' }}>
              <Button
                variant="primary"
                bg="#1326cd"
                isLoading={isLoading}
                ml={'2'}
                type={'submit'}
                _hover={{
                  bg: isLoading ? 'brand.100' : undefined,
                }}
                _disabled={{
                  opacity: 0.7,
                  cursor: 'not-allowed',
                }}>
                Find ENS Data
              </Button>
            </FormControl>
          </Stack>

          {/** INSTRUCTIONS OR ERRORS */}
          {/* <ErrorOrInstructionsDisplay error={error} showInstructions={showInstructions} /> */}

          {ensData != '' && <EnsCard ensData={ensData} />}
        </Container>
        {/* <PecHistoryDrawer isOpen={isOpen} onClose={onClose} isMobile={isMobile} userStoredPecs={userStoredPecs} /> */}
      </Grid>
    </>
  );
};
