import LoadingSpinner from "@/components/LoadingSpinner";
import ToolsHeader from "@/components/ToolsHeader";
import { Credits } from "@/constants/credits";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicSummarizer = dynamic(
  () => import("@/components/pages/Summarizer"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);

const page = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-8 min-h-[70vh]">
      <div className="flex flex-col">
        <ToolsHeader
          name="AI SUMMARIZATION"
          credits={Credits.Summarizer.toString()}
        />
        <DynamicSummarizer />
      </div>
    </div>
  );
};

export default page;
