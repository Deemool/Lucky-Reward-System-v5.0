export enum TierType {
  INSTANT = 'INSTANT',   // 1-50
  IMMERSIVE = 'IMMERSIVE', // 51-80
  WISHLIST = 'WISHLIST', // 81-95
  LEGENDARY = 'LEGENDARY' // 96-100
}

export interface SubItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Mapping to Lucide icons string name
  flavorText: string; // Unique description for the result
}

export interface PrizeTier {
  type: TierType;
  name: string;
  probability: string;
  range: [number, number];
  color: string;
  items: SubItem[];
  borderColor: string;
  bgGradient: string;
}

export interface DrawResult {
  roll: number;
  tier: PrizeTier;
  selectedItem: SubItem;
  timestamp: number;
  comment?: string;
}

export interface HistoryItem extends DrawResult {
  id: string;
}