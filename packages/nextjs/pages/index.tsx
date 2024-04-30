import Head from 'next/head';
import { Center, Text, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { EnsFinder } from '~~/components/EnsFinder';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>SolidENS_RS</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      <main>
        <VStack>
          <EnsFinder />
        </VStack>
      </main>
    </>
  );
};

export default Home;
