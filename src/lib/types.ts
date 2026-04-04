export type DurationOption = {
  id: string;
  label: string;
  seconds: number;
  description: string;
  basePrice: number;
};

export type ScenarioType = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export type VoiceOption = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export type MusicOption = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export type VisualStyle = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export type PostProductionOption = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export type RevisionPackage = {
  id: string;
  label: string;
  count: number;
  price: number;
};

// Product photo types
export type ProductCountOption = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export type PhotoAngleOption = {
  id: string;
  label: string;
  description: string;
  angleCount: number;
  price: number;
};

export type PhotoModelOption = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export type ColorPackageOption = {
  id: string;
  label: string;
  description: string;
  includedColors: number;
  price: number;
};

export type PhotoVisualStyle = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export type BackgroundOption = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export type PhotoRetouchOption = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export type ConfigState = {
  // Video fields
  duration: DurationOption | null;
  scenario: ScenarioType | null;
  voice: VoiceOption | null;
  music: MusicOption | null;
  visualStyle: VisualStyle | null;
  postProduction: PostProductionOption[];
  revision: RevisionPackage | null;
  // Product photo fields
  productCount: ProductCountOption | null;
  photoAngle: PhotoAngleOption | null;
  photoModel: PhotoModelOption | null;
  colorPackage: ColorPackageOption | null;
  photoVisualStyle: PhotoVisualStyle | null;
  background: BackgroundOption | null;
  photoRetouch: PhotoRetouchOption | null;
};

export type ServicePackage = {
  id: string;
  name: string;
  badge?: string;
  badgeVariant?: "popular" | "value" | "anchor" | "new";
  tagline: string;
  price: number;
  highlighted: boolean;
  features: string[];
  presetIds: {
    duration?: string;
    scenario?: string;
    voice?: string;
    music?: string;
    visualStyle?: string;
    postProduction?: string[];
    revision?: string;
    productCount?: string;
    photoAngle?: string;
    photoModel?: string;
    colorPackage?: string;
    photoVisualStyle?: string;
    background?: string;
    photoRetouch?: string;
  };
};
