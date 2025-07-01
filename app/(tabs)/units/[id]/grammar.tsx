import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import StepsPageContent from "~/components/units/StepsPageContent";
import useUnitBlocks from "~/hooks/useUnitBlocks";

const GrammarPage = () => {
  const params = useLocalSearchParams<{ id: string }>();

  const router = useRouter();

  const data = useUnitBlocks({ unitId: params.id, type: "vocabulary" });

  const handlePressBlock = (data: { id: string; type: "BLOCK" | "INFORMATION" }) => {
    if (data.type === "BLOCK") {
      router.navigate({ pathname: "/learn/vocabulary/[id]", params: { id: data.id } });
    }

    if (data.type === "INFORMATION") {
      router.navigate({ pathname: "/learn/information" });
    }
  };

  return <StepsPageContent onPressItem={handlePressBlock} levels={data} />;
};

export default GrammarPage;
