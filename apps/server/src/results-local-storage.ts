import { Result } from "./analyze";

const results = new Map<string, Result>();

export const saveResult = async (result: Result): Promise<void> => {
  results.set(result.id, result);
};

export const getResult = async (id: string): Promise<Result | undefined> => {
  return results.get(id);
};
