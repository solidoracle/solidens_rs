import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<Record<string, Theme['colors']['blackAlpha']>> = {
  brand: {
    100: '#6f58e3', // main brand color
    200: '#8868f6', // secondary brand color (hover)
    300: '#d3ddf7', // colore più chiaro del brand
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};

export const primaryColor = '#6f58e3';
export const secondaryColor = '#8868f6';
export const tertiaryColor = '#d3ddf7';
export const blogTextColor = '#364153';
export const indexBoxColor = '#f8fafc';
