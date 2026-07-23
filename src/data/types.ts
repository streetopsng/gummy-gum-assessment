export type Meters = {
  rep: number;
  inf: number;
  gro: number;
  imp: number;
};

export type Option = {
  label: string;
  text: string;
  skill: string;
  meters: Meters;
  quality: "Best" | "Good" | "Weak" | "Poor";
  reaction: string;
};

export type Card = {
  num: number;
  title: string;
  act: string;
  day: string;
  connector: string;
  prompt: string;
  options: Option[];
  transition: string;
};

export type Persona = {
  name: string;
  desc: string;
};

export type SkillLogEntry = {
  skill: string;
  quality: "Best" | "Good" | "Weak" | "Poor";
  points: number;
};
