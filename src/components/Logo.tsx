import { SparklesIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = ({ type = 1 }: { type?: number }) => {
  return (
    <Link
      className={`flex items-center justify-center ${
        type === 1 ? "flex-row" : "flex-col"
      }`}
      href="/"
    >
      <SparklesIcon
        className={`text-green-600 fill-green-500 dark:text-green-400 ${
          type === 1 ? "size-6" : "size-8"
        }`}
      />
      <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
        LetAIHelp
      </span>
    </Link>
  );
};

export default Logo;
