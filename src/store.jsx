import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// default vs named import Homework

export const selectedCategoryAtom = atom(null);
export const maxCharAtom = atom(30);
export const topicListAtom = atomWithStorage("topicsList", ["Coding"]);
