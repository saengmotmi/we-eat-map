// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Welcome {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: FeatureType;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: GeometryType;
  coordinates: number[];
}

export enum GeometryType {
  Point = "Point",
}

export interface Properties {
  name: string;
  styleUrl: StyleURL;
  styleHash: StyleHash;
  styleMapHash: StyleMapHash;
  description?: string;
}

export enum StyleHash {
  The42Bf1609 = "-42bf1609",
  The5496230C = "5496230c",
  The5E9Ca4Fa = "5e9ca4fa",
}

export interface StyleMapHash {
  normal: Normal;
  highlight: Highlight;
}

export enum Highlight {
  Icon18990288D1Highlight = "#icon-1899-0288D1-highlight",
  Icon18990288D1NodescHighlight = "#icon-1899-0288D1-nodesc-highlight",
  Icon1899F57C00NodescHighlight = "#icon-1899-F57C00-nodesc-highlight",
}

export enum Normal {
  Icon18990288D1NodescNormal = "#icon-1899-0288D1-nodesc-normal",
  Icon18990288D1Normal = "#icon-1899-0288D1-normal",
  Icon1899F57C00NodescNormal = "#icon-1899-F57C00-nodesc-normal",
}

export enum StyleURL {
  Icon18990288D1 = "#icon-1899-0288D1",
  Icon18990288D1Nodesc = "#icon-1899-0288D1-nodesc",
  Icon1899F57C00Nodesc = "#icon-1899-F57C00-nodesc",
}

export enum FeatureType {
  Feature = "Feature",
}
