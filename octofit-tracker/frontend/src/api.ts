export type AppConfig = {
  apiBaseUrl: string;
  codespaceName: string | null;
};

export const fetchConfig = async (): Promise<AppConfig> => {
  const response = await fetch("/config");
  if (!response.ok) {
    throw new Error(`Failed to load config: ${response.status}`);
  }
  return response.json();
};
