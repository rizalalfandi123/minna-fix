import React from "react";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import useSyncLetterProgress from "@/hooks/useSyncLetterProgress";
import queryClient, { asyncStoragePersister } from "~/libs/query-client";
import { isWeb } from "~/helpers/platform";

const ServiceProvider = (props: React.PropsWithChildren) => {
    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
            <SyncService />

            {props.children}

            {isWeb && <ReactQueryDevtools />}
        </PersistQueryClientProvider>
    );
};

const SyncService = () => {
    // useSyncLetterProgress();

    return null;
};

export default ServiceProvider;
