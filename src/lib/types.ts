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

export type ConfigState = {
  duration: DurationOption | null;
  scenario: ScenarioType | null;
  voice: VoiceOption | null;
  music: MusicOption | null;
  visualStyle: VisualStyle | null;
  postProduction: PostProductionOption[];
  revision: RevisionPackage | null;
};
