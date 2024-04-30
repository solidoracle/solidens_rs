import { colors } from './colors';
import { blogTextColor, primaryColor } from './colors';
import { components } from './components';
import { config } from './config';
import { color, extendTheme } from '@chakra-ui/react';

const styles = {
  global: (props: any) => ({
    h1: {
      fontSize: { base: '35px', md: '50px' },
      fontWeight: 'bold',
      marginBottom: 4,
      color: blogTextColor,
      lineHeight: 'shorter',
      marginTop: 10,
      a: {
        color: primaryColor,
      },
    },
    h2: {
      fontSize: { base: '30px', md: '40px' },
      fontWeight: 'bold',
      marginBottom: 4,
      color: blogTextColor,
      lineHeight: 'shorter',
      marginTop: 10,
      a: {
        color: primaryColor,
      },
    },
    h3: {
      fontSize: { base: '25px', md: '30px' },
      fontWeight: 'bold',
      marginBottom: 4,
      color: blogTextColor,
      lineHeight: 'shorter',
      marginTop: 10,
      a: {
        color: primaryColor,
      },
    },
    'ol, ul': {
      paddingInlineStart: 4,
    },
    li: {
      fontSize: 'xl',
      marginBottom: 2,
      color: blogTextColor,
    },
    p: {
      fontSize: 'xl',
      color: blogTextColor,
      marginBottom: 4,
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    tr: {
      borderBottomWidth: '1px',
      borderColor: 'inherit',
    },
    'tr:nth-of-type(odd)': {
      backgroundColor: 'white',
    },
    'tr:nth-of-type(even)': {
      backgroundColor: 'gray.100',
    },
    'td, th': {
      textAlign: 'left',
    },
  }),
};

const customTheme = extendTheme({
  colors,
  config,
  components,
  styles,
});

export default customTheme;
