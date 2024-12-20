"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Credits } from "@/constants/credits";
import { Textarea } from "../ui/textarea";
import { Blend, Download, ImageIcon, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { imageFormType, imageSchema } from "@/schemas/imageSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageService } from "@/services/image";
import { textLimits } from "@/constants/textLimits";
import { imageModels, imageTypes } from "@/constants/image";
import Image from "next/image";

export default function TextToImage() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<imageFormType>({
    defaultValues: {
      text: "",
      model: imageModels[0],
      type: imageTypes[0],
    },
    resolver: zodResolver(imageSchema),
  });
  const styleType = watch("type");
  const imageGeneration = useMutation({
    mutationFn: imageService,
    onSuccess: (res) => {
      if (!session.data) return null;

      toast.success("Your image is ready");
      console.log(getValues("model"));
      if (getValues("model") === "@cf/black-forest-labs/flux-1-schnell") {
        setGeneratedImage(
          "data:image/png;base64," + res.data.data.result.image,
        );
      } else {
        const url = URL.createObjectURL(res.data);
        setGeneratedImage(url);
      }
      const newCredits = session.data.user.credits - Credits.TextToImage;
      session.update({
        credits: newCredits === 0 ? 1 : newCredits,
      });
    },
    onError: (error) => {
      toast.error(
        "There was a problem, Error code: 500\nPlease try with another prompt/model.",
      );
    },
  });
  const session = useSession();
  if (!session.data) return null;

  const onSubmit = async (data: imageFormType) => {
    if (session.data.user.credits < Credits.TextToImage)
      return toast.error(
        "You don't have enough credits to perform this action",
      );

    if (imageGeneration.isPending) return;
    imageGeneration.mutate(data);
    toast.info("Generating image, Please wait...");
  };

  return (
    <div className="mt-5 min-h-[60vh] rounded-md bg-white p-6 tracking-tighter text-white dark:bg-zinc-950/50">
      <div className="flex items-center justify-center gap-3"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-6xl">
        <div className="flex flex-col">
          <h1 className="text-sm text-black dark:text-white sm:text-base">
            <Blend className="mr-2 inline size-6 rounded-full bg-green-400 p-1" />
            SELECT MODEL
          </h1>
          <Select
            defaultValue={imageModels[0]}
            onValueChange={(value: (typeof imageModels)[number]) =>
              setValue("model", value)
            }
          >
            <SelectTrigger
              aria-label="Select Model"
              className="my-2 w-[180px] border-2 border-green-400/30 text-black dark:text-white sm:w-[300px]"
            >
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {imageModels.map((value, index) => (
                  <SelectItem key={index} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="flex flex-col rounded-lg border-2 border-zinc-800 bg-white p-6 dark:bg-zinc-800">
            <Textarea
              placeholder="Write your desired text, make sure to refine your prompt using our AI tools for better results"
              {...register("text")}
              maxLength={textLimits.TextToImage}
              className="mb-6 min-h-16 w-full border-green-400/30 bg-white text-black placeholder-zinc-400 dark:bg-zinc-900 dark:text-white sm:min-h-20 sm:text-xs md:min-h-32"
            />

            {errors.text ? (
              <p className="text-xs text-red-500">{errors.text.message}</p>
            ) : (
              <p className="text-xs text-green-500">
                Minimum input prompt is 5
              </p>
            )}

            <div className="mb-6">
              <h2 className="text-md mb-3 font-semibold text-black dark:text-white sm:text-xl">
                Styles
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {imageTypes.map((image) => (
                  <div
                    key={image.toLowerCase()}
                    onClick={() => setValue("type", image)}
                    className={`relative cursor-pointer overflow-hidden rounded-lg border ${
                      styleType.toLowerCase() === image.toLowerCase()
                        ? "border-2 border-green-400/50"
                        : "border-zinc-800 dark:border-white"
                    }`}
                  >
                    <Image
                      src={`/${image.toLowerCase()}.png`}
                      alt={image}
                      className="min-h-36 w-full object-cover lg:h-16"
                      width={200}
                      height={200}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <div className="text-center text-sm font-medium text-white">
                        {image}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              aria-label="Generate Image"
              type="submit"
              className="mt-auto w-full bg-green-500 text-white hover:bg-green-700"
            >
              {imageGeneration.isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="ml-2 size-7 animate-spin text-white" />
                  GENERATE IMAGING..
                </div>
              ) : (
                "GENERATE IMAGE"
              )}
            </Button>
          </div>

          <div className="flex flex-col rounded-lg border-2 border-zinc-800 bg-white p-6 dark:bg-zinc-800">
            <div className="items-c enter mb-4 flex justify-between">
              <h2 className="text-xs font-semibold md:text-lg xl:text-xl">
                GENERATED IMAGE
              </h2>
              <a
                target="_blank"
                href={generatedImage || "#"}
                download={
                  generatedImage ? `letaihelp.me${Date.now()}.png` : undefined
                }
                className={`flex items-center rounded bg-green-500 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700 ${
                  generatedImage ? "cursor-pointer" : "pointer-events-none"
                }`}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            </div>
            {generatedImage ? (
              <Image
                src={generatedImage}
                alt="Generated"
                className="h-auto w-full flex-grow rounded-lg object-cover"
                width={400}
                height={400}
              />
            ) : (
              <div className="flex flex-grow items-center justify-center rounded-lg border-2 border-dashed border-green-400/30">
                <div className="text-center">
                  {!imageGeneration.isPending ? (
                    <>
                      <ImageIcon className="mx-auto mb-4 min-h-24 w-16 text-zinc-600" />
                      <p className="text-zinc-400">
                        Your generated image will appear here
                      </p>
                    </>
                  ) : (
                    <>
                      <Loader2 className="mx-auto mb-4 min-h-24 w-16 animate-spin text-zinc-600" />
                      <p className="text-zinc-400">
                        Your image is being generated...
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
