export interface TarotCard {
  id: number;
  name: string;
  symbol: string;
  keywords: string[];
  meaning: string;
  reversed: string;
  element: string;
}

export const majorArcana: TarotCard[] = [
  {
    id: 0,
    name: "The Fool",
    symbol: "🌟",
    keywords: ["Beginnings", "Spontaneity", "Freedom"],
    meaning:
      "A leap of faith awaits you. The Fool signals fresh starts and boundless possibility. Trust the journey, even without a map. Your innocence is your greatest strength right now.",
    reversed: "Recklessness and poor judgement. Pause before leaping — look where you're stepping.",
    element: "Air",
  },
  {
    id: 1,
    name: "The Magician",
    symbol: "⚡",
    keywords: ["Willpower", "Manifestation", "Skill"],
    meaning:
      "All the tools you need are already in your hands. The Magician says: you have the power to create your reality. Act with intention and focus — the universe is listening.",
    reversed: "Manipulation or untapped potential. Are you using your gifts wisely?",
    element: "Air",
  },
  {
    id: 2,
    name: "The High Priestess",
    symbol: "☽",
    keywords: ["Intuition", "Mystery", "Inner knowing"],
    meaning:
      "The answers you seek lie within. The High Priestess asks you to be still, listen to your gut, and trust what you cannot yet explain. Not everything needs to be spoken aloud.",
    reversed: "Secrets, disconnection from intuition. You may be ignoring what you already know.",
    element: "Water",
  },
  {
    id: 3,
    name: "The Empress",
    symbol: "🌿",
    keywords: ["Abundance", "Nurture", "Creation"],
    meaning:
      "A season of growth and abundance. The Empress calls you to nurture yourself and your creative projects. Nature, beauty, and love surround you — receive them fully.",
    reversed: "Creative block or neglect of self-care. You may be giving too much without replenishing.",
    element: "Earth",
  },
  {
    id: 4,
    name: "The Emperor",
    symbol: "♦",
    keywords: ["Authority", "Structure", "Stability"],
    meaning:
      "Build on solid ground. The Emperor urges you to take charge, set clear boundaries, and lead with discipline. Stability is created — not found.",
    reversed: "Rigidity, control issues, or lack of discipline. Examine where power is being misused.",
    element: "Fire",
  },
  {
    id: 5,
    name: "The Hierophant",
    symbol: "✦",
    keywords: ["Tradition", "Guidance", "Belief"],
    meaning:
      "Seek wisdom from established paths or a trusted mentor. The Hierophant encourages you to align with your values and find community in shared belief.",
    reversed: "Rebellion or dogma. Are you following rules that no longer serve you?",
    element: "Earth",
  },
  {
    id: 6,
    name: "The Lovers",
    symbol: "♡",
    keywords: ["Love", "Choice", "Harmony"],
    meaning:
      "A significant choice lies ahead — one rooted in values, not just desire. The Lovers represent deep connection and alignment. Lead with your heart, but choose wisely.",
    reversed: "Misalignment, indecision, or imbalance in a relationship.",
    element: "Air",
  },
  {
    id: 7,
    name: "The Chariot",
    symbol: "🏆",
    keywords: ["Victory", "Determination", "Control"],
    meaning:
      "Push forward with confidence. The Chariot is the card of willpower and triumph over obstacles. Your determination will carry you through. Focus and momentum are everything.",
    reversed: "Lack of control or aggression. Are you forcing outcomes instead of steering toward them?",
    element: "Water",
  },
  {
    id: 8,
    name: "Strength",
    symbol: "∞",
    keywords: ["Courage", "Patience", "Compassion"],
    meaning:
      "True strength is gentle. This card asks you to face challenges not with force, but with grace and quiet confidence. You have more courage than you know — use it with kindness.",
    reversed: "Self-doubt or losing control of emotions. Inner work is needed.",
    element: "Fire",
  },
  {
    id: 9,
    name: "The Hermit",
    symbol: "🕯️",
    keywords: ["Solitude", "Introspection", "Wisdom"],
    meaning:
      "Step back from the noise. The Hermit calls for solitude and inner reflection. Answers will come from within, not without. This is your time to go inward and find your light.",
    reversed: "Isolation or refusal to seek help. Are you withdrawing too much?",
    element: "Earth",
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    symbol: "⊕",
    keywords: ["Cycles", "Fate", "Change"],
    meaning:
      "The wheel always turns. Change is coming — and often for the better. The Wheel of Fortune reminds you that nothing is permanent, and luck favors those who stay adaptable.",
    reversed: "Bad luck or resistance to change. You may be fighting the inevitable.",
    element: "Fire",
  },
  {
    id: 11,
    name: "Justice",
    symbol: "⚖",
    keywords: ["Truth", "Fairness", "Accountability"],
    meaning:
      "The truth will come to light. Justice calls for honesty, both with yourself and others. Cause and effect are at play — what you've put out is returning to you.",
    reversed: "Unfairness or avoiding accountability. Face what you've been avoiding.",
    element: "Air",
  },
  {
    id: 12,
    name: "The Hanged Man",
    symbol: "✤",
    keywords: ["Pause", "Surrender", "New perspective"],
    meaning:
      "Release the need to control. The Hanged Man asks you to pause, surrender, and see things from a completely new angle. The delay is the gift. Wait — clarity is coming.",
    reversed: "Stalling, martyrdom, or refusing to let go.",
    element: "Water",
  },
  {
    id: 13,
    name: "Death",
    symbol: "🌑",
    keywords: ["Transformation", "Endings", "Rebirth"],
    meaning:
      "Something must end for something new to begin. Death is not loss — it is transformation. Release what no longer serves you with grace. The door closing leads to a better one.",
    reversed: "Resistance to change. You may be clinging to what's already gone.",
    element: "Water",
  },
  {
    id: 14,
    name: "Temperance",
    symbol: "◈",
    keywords: ["Balance", "Patience", "Moderation"],
    meaning:
      "Find your middle path. Temperance calls for balance, flow, and gentle patience. Don't rush. Blend opposites with care — this is how harmony is created.",
    reversed: "Imbalance or excess. Something in your life needs recalibration.",
    element: "Fire",
  },
  {
    id: 15,
    name: "The Devil",
    symbol: "⛓",
    keywords: ["Shadow", "Bondage", "Materialism"],
    meaning:
      "Examine what holds you captive. The Devil reveals patterns, addictions, or beliefs that bind you. But the chains are looser than they look — freedom begins with awareness.",
    reversed: "Breaking free. You are ready to release what once controlled you.",
    element: "Earth",
  },
  {
    id: 16,
    name: "The Tower",
    symbol: "⚡",
    keywords: ["Disruption", "Revelation", "Upheaval"],
    meaning:
      "What was built on shaky ground will fall. The Tower brings sudden change — shocking, but necessary. It clears what was false to make room for what is real. Trust the rubble.",
    reversed: "Avoiding disaster or fear of necessary change.",
    element: "Fire",
  },
  {
    id: 17,
    name: "The Star",
    symbol: "★",
    keywords: ["Hope", "Healing", "Renewal"],
    meaning:
      "After the storm, the stars appear. The Star brings hope, healing, and calm. You are on the right path. Trust the universe's timing. Rest, renew, and let yourself be guided.",
    reversed: "Despair or lack of faith. The hope is there — you just can't see it yet.",
    element: "Air",
  },
  {
    id: 18,
    name: "The Moon",
    symbol: "🌙",
    keywords: ["Illusion", "Fear", "Subconscious"],
    meaning:
      "Not everything is as it seems. The Moon illuminates the subconscious — fears, illusions, and hidden truths. Pay attention to dreams. Feel your way through the fog. Clarity will come.",
    reversed: "Confusion lifting. What was hidden is finally becoming clear.",
    element: "Water",
  },
  {
    id: 19,
    name: "The Sun",
    symbol: "☀",
    keywords: ["Joy", "Success", "Vitality"],
    meaning:
      "Radiance is yours. The Sun is the most joyful card in the deck — a time of clarity, success, and genuine happiness. Step into the light. Let yourself shine without apology.",
    reversed: "Temporary setback or struggling to find joy. The sun will return.",
    element: "Fire",
  },
  {
    id: 20,
    name: "Judgement",
    symbol: "◎",
    keywords: ["Awakening", "Reflection", "Renewal"],
    meaning:
      "A powerful call to rise. Judgement signals a moment of reckoning and rebirth. Release the past, forgive yourself and others, and step into who you are truly meant to become.",
    reversed: "Self-doubt or refusing to move on. You are your own harshest judge.",
    element: "Fire",
  },
  {
    id: 21,
    name: "The World",
    symbol: "🌍",
    keywords: ["Completion", "Achievement", "Integration"],
    meaning:
      "You have arrived. The World marks the end of a cycle — a moment of wholeness, achievement, and integration. Celebrate how far you've come. A new cycle begins from this place of fulfillment.",
    reversed: "Incompletion or carrying old baggage into a new chapter.",
    element: "Earth",
  },
];

export function shuffleDeck(): TarotCard[] {
  const deck = [...majorArcana];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function drawCards(count: number): TarotCard[] {
  return shuffleDeck().slice(0, count);
}
