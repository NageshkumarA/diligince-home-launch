
import React from "react";
import { GenericHeader } from "@/components/shared/layout/GenericHeader";
import { industryHeaderConfig } from "@/utils/navigationConfigs";

const IndustryHeader = () => {
  return <GenericHeader config={industryHeaderConfig} />;
};

export default IndustryHeader;
