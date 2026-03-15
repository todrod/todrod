import { cardiopaHref, cathBootcampHref, echoBootcampHref, festivalAppAdminHref, festivalAppHref, hablaHref, heartToHeartHref, tcaLabHref } from "@/lib/urls";

export type LabAccessKey =
  | "echo-bootcamp"
  | "cath-bootcamp"
  | "tca-lab"
  | "template-builder"
  | "heart-to-heart"
  | "festival-app"
  | "festival-admin"
  | "cardio-pa"
  | "habla";

type LabAccessConfig = {
  title: string;
  description: string;
  password: string;
  redirectTo: string;
};

const cookiePrefix = "lab_access_";

export const labAccessConfig: Record<LabAccessKey, LabAccessConfig> = {
  "echo-bootcamp": {
    title: "Echo Bootcamp Access",
    description: "Enter password to continue to Echo Bootcamp.",
    password: "echo",
    redirectTo: echoBootcampHref,
  },
  "cath-bootcamp": {
    title: "Cath Lab Bootcamp Access",
    description: "Enter password to continue to Cath Lab Bootcamp.",
    password: "echo",
    redirectTo: cathBootcampHref,
  },
  "tca-lab": {
    title: "TCA Lab Access",
    description: "Enter password to continue to TCA Lab.",
    password: "cardio",
    redirectTo: tcaLabHref,
  },
  "template-builder": {
    title: "Template Builder Access",
    description: "Enter password to open the Template Builder.",
    password: "build",
    redirectTo: "/lab/template-builder",
  },
  "heart-to-heart": {
    title: "Heart to Heart Access",
    description: "Enter password to open the Heart to Heart project.",
    password: "podcast",
    redirectTo: heartToHeartHref,
  },
  "festival-app": {
    title: "Festival App Access",
    description: "Enter password to continue to Festival App.",
    password: "strawberry",
    redirectTo: festivalAppHref,
  },
  "festival-admin": {
    title: "Festival Admin Access",
    description: "Enter password to continue to Festival Admin.",
    password: "strawberry",
    redirectTo: festivalAppAdminHref,
  },
  "cardio-pa": {
    title: "CardioAuth PA Assistant Access",
    description: "Enter password to open the CardioAuth Prior Authorization Assistant.",
    password: "cardio",
    redirectTo: cardiopaHref,
  },
  "habla": {
    title: "Habla Access",
    description: "Enter password to open Habla Spanish Trainer.",
    password: "habla",
    redirectTo: hablaHref,
  },
};

export function isLabAccessKey(value: string): value is LabAccessKey {
  return value in labAccessConfig;
}

export function getLabAccessCookieName(key: LabAccessKey): string {
  return `${cookiePrefix}${key}`;
}

export function getLabAccessPath(key: LabAccessKey): string {
  return `/lab/access/${key}`;
}
