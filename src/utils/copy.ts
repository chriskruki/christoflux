export const SKILLS = {
  REC: {
    HOBBY_TECH: [
      { name: '3D Printing', tier: 2 },
      { name: 'LED Lighting', tier: 2 },
      { name: 'Soldering', tier: 3 },
      { name: 'Electronics', tier: 3 },
    ],
    PHYSICAL: [
      { name: 'Ripsticking', tier: 1, since: '1/1/2012', content: 'ripsticking' },
      { name: 'Sand Balls', tier: 1, since: '8/1/2017', content: 'sandball' },
      { name: 'Flowstar', tier: 2, since: '3/10/2025', content: 'flowstar' },
      { name: 'Shuffling', tier: 2, since: '2012' },
      { name: 'Snowboarding', tier: 3, since: '1/15/2014' },
      { name: 'Surfing', tier: 4, since: '1/1/2020' },
      { name: 'Skydiving', tier: 4, since: '1/1/2019' },
    ],
    MUSIC: [
      { name: 'Whistling', tier: 1 },
      { name: 'Piano', tier: 2 },
      { name: 'Beatboxing', tier: 3 },
      { name: 'Singing', tier: 3 },
      { name: 'Alto Saxophone', tier: 3 },
      { name: 'Ableton', tier: 4 },
    ],
    GAMES: [
      { name: 'CS2', tier: 1 },
      { name: 'Minecraft', tier: 1 },
      { name: 'Halo', tier: 2 },
      { name: 'Roblox', tier: 2 },
    ],
  },
}

export const TIER_CONFIG = {
  1: {
    label: 'Expert',
    color: '#FFD700', // Gold
    bgGradient: 'from-yellow-500/20 via-amber-500/10 to-orange-500/20',
    borderColor: 'border-yellow-400/50',
    textColor: 'text-yellow-400',
    stars: 5,
  },
  2: {
    label: 'Advanced',
    color: '#00BFFF', // Deep Sky Blue
    bgGradient: 'from-emerald-500/20 via-green-500/10 to-emerald-600/20',
    borderColor: 'border-emerald-400/50',
    textColor: 'text-emerald-400',
    stars: 4,
  },
  3: {
    label: 'Intermediate',
    color: '#C0C0C0', // Silver
    bgGradient: 'from-gray-400/20 via-slate-500/10 to-gray-600/20',
    borderColor: 'border-gray-400/50',
    textColor: 'text-gray-300',
    stars: 3,
  },
  4: {
    label: 'Familiar',
    color: '#808080', // Gray
    bgGradient: 'from-gray-400/20 via-slate-500/10 to-gray-600/20',
    borderColor: 'border-gray-400/50',
    textColor: 'text-gray-300',
    stars: 2,
  },
  5: {
    label: 'Learning',
    color: '#666666', // Darker gray
    bgGradient: 'from-gray-400/20 via-slate-500/10 to-gray-600/20',
    borderColor: 'border-gray-400/50',
    textColor: 'text-gray-300',
    stars: 1,
  },
}

export const SOCIALS = {
  EMAIL: 'chriskruki@gmail.com',
  INSTAGRAM: 'https://www.instagram.com/christoflux/',
}
