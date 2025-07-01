import React from "react";
import InformationUnitPageContent from "~/components/learn-units/InformationUnitPageContent";
import useBackHandler from "~/hooks/useBackHandler";

function LearnInformationPage() {
  const handleBack = useBackHandler("/units");

  return <InformationUnitPageContent onPressOk={handleBack} />;
}

export default LearnInformationPage;
