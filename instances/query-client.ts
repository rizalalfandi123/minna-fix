import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { day } from "~/lib/constants/sizes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: day,
    },
  },
});

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export default queryClient;
