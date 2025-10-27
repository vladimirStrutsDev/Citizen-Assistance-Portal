import { useMatches } from "react-router-dom";

export const useRouteMetadata = () => {
  const matches = useMatches();

  const currentMatch = matches[matches.length - 1];
  const handle = currentMatch?.handle as {
    title?: string;
    description?: string;
  };

  return {
    title: handle?.title || "Citizen Assistance Portal",
    description: handle?.description || "",
  };
};
