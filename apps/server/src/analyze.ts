import {
  analyseFingerprint,
  CONSISTENT,
  DetectionTest,
  FingerPrint,
  INCONSISTENT,
  UNSURE,
} from "fpscanner";
import * as nanoid from "nanoid";
import { IS_DEBUG } from "./config";

export const analyze = (fingerprint: FingerPrint) => {
  const analysis = analyseFingerprint(fingerprint);
  const tests = Object.values(analysis);

  const resultDraft = {
    id: nanoid.nanoid(),
    created_at: new Date(),
    ...(IS_DEBUG && { debug: analysis }),
  };

  const inconsistent = countInconsistencies(tests);
  const unsure = countUnsure(tests);

  if (inconsistent > 1 || (inconsistent >= 1 && unsure >= 1)) {
    return {
      ...resultDraft,
      result: "bad_bot",
    };
  }

  return {
    ...resultDraft,
    result: "human",
  };
};

export const countInconsistencies = (tests: DetectionTest[]) =>
  tests.filter((test) => test.consistent === INCONSISTENT).length;

export const countUnsure = (tests: DetectionTest[]) =>
  tests.filter((test) => test.consistent === UNSURE).length;
