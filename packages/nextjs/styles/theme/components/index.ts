import { Button } from './button';

export const components = {
    Button,
    Badge: {
        // Corrected structure: directly include Badge configuration
        baseStyle: {
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: 'full',
            px: '2.5',
            py: '0.5',
            fontSize: 'xs',
            fontWeight: 'semibold',
            transition: 'colors 0.2s',
            _focus: {
                outline: 'none',
                ring: '2',
                ringColor: 'ring',
                ringOffset: '2',
            },
        },
    },
};
