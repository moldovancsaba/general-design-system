import { createTheme } from '@mantine/core';

export const gdsTheme = createTheme({
  primaryColor: 'violet',
  fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  fontSmoothing: true,
  headings: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    sizes: {
      h1: { fontSize: '2.5rem', fontWeight: '800' },
      h2: { fontSize: '1.75rem', fontWeight: '700' },
      h3: { fontSize: '1.25rem', fontWeight: '600' },
    },
  },
  defaultRadius: 'md',
  shadows: {
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
        size: 'sm',
        fw: 600,
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'sm',
        withBorder: true,
      },
      styles: {
        root: {
          transition: 'transform 200ms ease, box-shadow 200ms ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          }
        }
      }
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    Paper: {
      defaultProps: {
        radius: 'lg',
      },
    }
  },
});
