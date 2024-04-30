import type { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
    baseStyle: {
        borderRadius: 'full',
        fontSize: '14px',
    },
    variants: {
        primary: {
            bg: 'brand.100',
            color: 'white',
            _hover: {
                bg: 'brand.200',
            },
            _loading: {
                bg: 'brand.100',
                opacity: '1 !important',
            },
            borderRadius: '4',
            _disabled: {
                bg: 'brand.100', // Ensure the background color remains brand.100 even when disabled
                opacity: 1,
            },
        },
        secondary: {
            bg: 'white',
            color: 'brand.100',
            border: '1px solid',
            borderColor: 'gray.400',
            _hover: {
                border: '1.3px solid',
                borderColor: 'brand.100',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
            },
            _loading: { opacity: 1 },
            borderRadius: '4',
            boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
        },
    },
};
