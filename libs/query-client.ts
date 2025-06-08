import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

const queryClient = new QueryClient();

export const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
});

export default queryClient;
