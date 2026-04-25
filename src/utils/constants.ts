export const HEADER = {
  HEIGHT: 60,
  NAME: {
    SCROLL_RANGE: [0, 500] as [number, number],
    START: {
      X: 0,
      Y: 0 - 200,
    },
    SM_START: {
      X: -100,
      Y: -100 - 150,
    },
    END: (w: number, h: number) => ({
      X: 32 - w / 2,
      Y: 0 - h / 2,
    }),
    SM_END: (w: number, h: number) => ({
      X: -150,
      Y: 0 - h / 2,
    }),
    SCALE: {
      START: 1 as number,
      END: 0.4 as number,
    },
    SM_SCALE: {
      START: 0.6 as number,
      END: 0.4 as number,
    },
    TRANSITION: {
      duration: 0.5,
      ease: 'easeInOut' as const,
    },
  },
  NAV: {
    HEIGHT: 60,
    SM_HEIGHT: 60,
    SCROLL_RANGE: [0, 500] as [number, number],
    OPACITY_RANGE: [300, 500] as [number, number],
    START: {
      X: -12,
      Y: 100 + 100,
    },
    SM_START: {
      X: 50,
      Y: 25 + 125,
    },
    END: (w: number, h: number) => ({
      X: w / 2 - 225,
      Y: 25 - h / 2,
    }),
    SM_END: (w: number, h: number) => ({
      X: 60,
      Y: -200,
    }),
    SCALE: {
      START: 1 as number,
      END: 0.8 as number,
    },
    SM_SCALE: {
      START: 1 as number,
      END: 0 as number,
    },
    TRANSITION: {
      duration: 0.5,
      ease: 'easeInOut' as const,
      delay: 0.2,
    },
    BG_COLOR: 'rgba(0, 0, 0, 0.3)',
    BG_BLUR: 'blur(10px)',
    BTN_WIDTH: 100,
  },
  SPRING: {
    stiffness: 1000,
    damping: 100,
    restDelta: 0.001,
  },
} as const

export const SECTIONS = {
  SECTION_HEIGHT: 1000,
  HOME: {
    START: 0,
    END: 1000,
    NAME: 'home',
  },
  ABOUT: {
    START: 1000,
    END: 2000,
    NAME: 'about',
  },
  PROJECTS: {
    START: 2000,
    END: 3000,
    NAME: 'projects',
  },
  SKILLS: {
    START: 3000,
    END: 4000,
    NAME: 'skills',
  },
  CONTACT: {
    START: 4000,
    END: 5000,
    NAME: 'contact',
  },
} as const

export const CUBE = {
  POSITION: {
    X: 300,
    Y: 0,
    Z: 0,
  },
  SPRING: {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  },
  ANIMATION: {
    START_SCROLL: 200,
    FADE_RANGE: [200, 500] as [number, number],
    TRANSLATE_RANGE: [200, 500] as [number, number],
    TRANSLATE_VALUES: [1500, 500] as [number, number],
    ROTATION: {
      HOLD_ANGLE_ADJUST: -25,
      HOLD_ANGLE_PAN: 10,
      ANGLES: {
        START: 90,
        SECTION_1: 90,
        SECTION_2: 180,
        SECTION_3: 270,
        END: 270,
      },
    },
  },
  COLOR: 'emerald',
} as const

// Define cube faces with images
export const CUBE_FACES = [
  {
    title: 'Who',
    content: 'Learn more about my background and skills',
    image: 'chris.png',
  },
  {
    title: 'Projects',
    content: 'Explore my latest work and creations',
    image: 'chris.png',
  },
  {
    title: 'Contact',
    content: "Get in touch and let's work together",
    image: 'chris.png',
  },
  {
    title: 'Skills',
    content: 'Technologies and tools I work with',
    image: 'chris.png',
  },
  {
    title: 'Skills',
    content: 'Technologies and tools I work with',
    image: 'chris.png',
  },
  {
    title: 'Skills',
    content: 'Technologies and tools I work with',
    image: 'chris.png',
  },
]
