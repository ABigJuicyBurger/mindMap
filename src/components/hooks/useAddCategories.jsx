import { v4 as uuidv4 } from "uuid";
import { atom, useAtom } from "jotai";
import { useCallback } from "react";
import { atomWithStorage } from "jotai/utils";
import { selectedCategoryAtom } from "../../store";
