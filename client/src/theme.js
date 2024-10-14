import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    'cool-yellow': '#ffc857',
    'space-cadet': '#1a1a2e',
    'cool-teal': '#4ecdc4',
    'light-teal': '#92ded9'
  },
  styles: {
    global: {
      body: {
        bg: 'space-cadet'
      },
    }
  },
  components: {
    Button: {
      variants: {
        ghost: {
          color: 'cool-teal',
          _hover: {
            bg: 'light-teal',
            color: 'space-cadet'
          },
          _active: {
            bg: 'light-teal'
          },
        }
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          w: '3vw',
					h: '3vw',
        },
        label: {
          _disabled: {
            opacity: 1,
          },
        },
      },
    },

    Box: {
      variants: {
        legend: {
          baseStyle: {
            display: 'inline-flex',
            gap: '0.5vw',
            p: '0.5vw',
          }
          
        }
      }
    }
  }
});

export default customTheme;
