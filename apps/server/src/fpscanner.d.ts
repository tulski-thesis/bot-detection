declare module "fpscanner" {
  export function analyseFingerprint(fields: FingerPrint): AnalysisResult;

  export var INCONSISTENT: Consistency;
  export var UNSURE: Consistency;
  export var CONSISTENT: Consistency;

  export type FingerPrint = Record<string, any>;

  export type Consistency =
    | 1 // INCONSISTENT: The scanner considers that the attributes tested indicate the presence of a bot.
    | 2 // UNSURE: The scanner considers that the attributes tested could indicate the presence of a bot, but there is still a chance that it is a human.
    | 3; // CONSISTENT: The scanner did not detect any anomaly.

  export interface DetectionTest {
    name: string;
    consistent: Consistency;
    data: any;
  }

  export type Test =
    | "PHANTOM_UA"
    | "PHANTOM_PROPERTIES"
    | "PHANTOM_ETSL"
    | "PHANTOM_LANGUAGE"
    | "PHANTOM_WEBSOCKET"
    | "MQ_SCREEN"
    | "PHANTOM_OVERFLOW"
    | "PHANTOM_WINDOW_HEIGHT"
    | "HEADCHR_UA"
    | "WEBDRIVER"
    | "HEADCHR_CHROME_OBJ"
    | "HEADCHR_PERMISSIONS"
    | "HEADCHR_PLUGINS"
    | "HEADCHR_IFRAME"
    | "CHR_DEBUG_TOOLS"
    | "SELENIUM_DRIVER"
    | "CHR_BATTERY"
    | "CHR_MEMORY"
    | "TRANSPARENT_PIXEL";

  export type AnalysisResult = Record<Test, DetectionTest>;
}
