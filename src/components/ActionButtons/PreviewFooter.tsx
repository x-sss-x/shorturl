"use client";
import React from "react";
import { Button } from "../ui/button";
import { Check, Clipboard, Share } from "lucide-react";

import CustomLinkDialog from "./CustomLinkDialog";

function PreviewFooter({
  MyLink,
  inputLink,
}: {
  MyLink: any;
  inputLink: string;
}) {
  const [hasCopied, setHasCopied] = React.useState<boolean>(false);
  const copyToClipboard = React.useCallback(() => {
    const url = `${window.location.origin}/1?data=${inputLink}`;
    navigator.clipboard.writeText(url);
    return url;
  }, [inputLink]);

  return (
    <div className=" absolute z-50 bottom-0 left-0 right-0 m-auto w-fit flex flex-row gap-2 items-center justify-center mb-4 p-1 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-bounce">
      <div className="bg-white rounded-full shadow-lg p-1">
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            className="rounded-full hover:bg-gray-100 transition-colors duration-200"
            onClick={() => {
              navigator.share({
                title: `${MyLink.n} - ShortURL`,
                text: `Find all of ${MyLink.n}'s links in one place.`,
                url: `${inputLink}`,
              });
            }}
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            variant="ghost"
            className="rounded-full hover:bg-gray-100 transition-colors duration-200"
            onClick={() => {
              copyToClipboard();
              setHasCopied(true);
            }}
          >
            {hasCopied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Clipboard className="w-4 h-4 mr-2" /> Local URL
              </>
            )}
          </Button>
          <CustomLinkDialog localLink={inputLink} />
        </div>
      </div>
    </div>
  );
}

export default PreviewFooter;
