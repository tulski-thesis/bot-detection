// @ts-ignore
import fpCollect from "fpcollect/src/fpCollect.js";

export class BotClient {
  public static async load(baseUrl: string): Promise<BotClient> {
    return new BotClient(baseUrl);
  }

  constructor(private readonly baseUrl: string) {}

  public async analyze(): Promise<AnalysisResult> {
    const fingerprint = await this.collectFingerprint();
    return this.analyseFingerprint(fingerprint);
  }

  private async collectFingerprint(): Promise<FingerPrint> {
    return fpCollect.generateFingerprint();
  }

  private async analyseFingerprint(
    fingerprint: FingerPrint,
  ): Promise<AnalysisResult> {
    const url = new URL("/analyze", this.baseUrl).href;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(fingerprint),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
}

export type FingerPrint = Record<string, any>;

export interface AnalysisResult {
  id: string;
  created_at: Date;
  result: "human" | "bad_bot" | "good_bot";
  debug?: Record<string, any>;
}
