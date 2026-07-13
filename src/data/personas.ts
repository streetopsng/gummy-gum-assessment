import { Persona } from "./types";

export const PERSONAS: Record<string, Persona> = {
  "rep,imp": {name:"Trusted Professional", desc:"Reliable and principled — the person people hand the important thing to, knowing it will get done right."},
  "inf,imp": {name:"Driver", desc:"Persuasive and results-driven — moves people and outcomes together, especially under pressure."},
  "gro,imp": {name:"Builder", desc:"Learns fast while shipping fast — turns new information into visible progress quickly."},
  "rep,inf": {name:"Emerging Leader", desc:"Trusted and politically astute — the rare early-career combination that predicts leadership trajectory."},
  "gro,inf": {name:"Collaborator", desc:"Curious and relational — grows primarily through people, feedback and connection."},
  "rep,gro": {name:"Explorer", desc:"Principled and still discovering their edge — high integrity, still building proven track record."},
};
