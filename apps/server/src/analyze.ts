import {
  analyseFingerprint,
  AnalysisResult,
  DetectionTest,
  FingerPrint,
  INCONSISTENT,
  UNSURE,
} from "fpscanner";
import * as nanoid from "nanoid";
import { IS_DEBUG } from "./config";
import { saveResult } from "./results-local-storage";

export const analyze = async (fingerprint: FingerPrint): Promise<Result> => {
  const analysis = analyseFingerprint(fingerprint);

  const result = {
    id: nanoid.nanoid(),
    created_at: new Date(),
    bot: checkBot(analysis),
    ...(IS_DEBUG && { analysis_details: analysis }),
  };
  await saveResult(result);

  return result;
};

const checkBot = (analysis: AnalysisResult): BotDetectionResult => {
  const tests = Object.values(analysis);
  const inconsistent = countInconsistencies(tests);
  const unsure = countUnsure(tests);
  if (inconsistent > 1 || (inconsistent >= 1 && unsure >= 1)) {
    return {
      result: "bad_bot",
    };
  }

  return {
    result: "not_detected",
  };
};

export const countInconsistencies = (tests: DetectionTest[]) =>
  tests.filter((test) => test.consistent === INCONSISTENT).length;

export const countUnsure = (tests: DetectionTest[]) =>
  tests.filter((test) => test.consistent === UNSURE).length;

export interface Result {
  id: string;
  created_at: Date;
  bot: BotDetectionResult;
  analysis_details?: AnalysisResult;
}

export interface BotDetectionResult {
  result: "not_detected" | "bad_bot" | "good_bot";
}
