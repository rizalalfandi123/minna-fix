import React from "react";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import queryClient, { asyncStoragePersister } from "~/instances/query-client";

const ServiceProvider = (props: React.PropsWithChildren) => {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
      <SyncService />

      {props.children}
    </PersistQueryClientProvider>
  );
};

const SyncService = () => {
  // useSyncLetterProgress();

  return null;
};

export default ServiceProvider;
