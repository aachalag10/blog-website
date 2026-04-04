import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProviderProps, ReactNode } from "react";

interface providerProps {
  children: ReactNode;
}
const queryClient = new QueryClient();

export default function Providers({ children }: providerProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
