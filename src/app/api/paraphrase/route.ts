import { NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Credits } from "@/constants/credits";
import { paraphraseSchema, paraphraseTones } from "@/schemas/paraphraseSchema";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in inorder to perform this.",
        },
        { status: 401 },
      );
    }

    const {
      string,
      tone,
    }: { string: string; tone: (typeof paraphraseTones)[number] } =
      await request.json();

    const validate = paraphraseSchema.safeParse({ string, tone });
    if (!validate.success) {
      const errorMessages = validate.error.issues
        .map((issue) => `${issue.path.join(".")} field is ${issue.message}`)
        .join(", ");

      return NextResponse.json(
        {
          success: false,
          message: errorMessages,
        },
        { status: 400 },
      );
    }
    const response = await axios.post<ParaphraseResponse>(
      "https://api.zerogpt.com/api/transform/paraphrase",
      {
        string,
        maxWordsPercentage: 0.15,
        sample: true,
        earlyStopping: true,
        numBeams: 10,
        topK: 50,
        temperature: 1,
        topP: 1,
        wsId: "ceaea71c-e389-4072-81c7-ef3559f3f8a4",
        tone,
        style: "text",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
          Origin: "https://zerogpt.com",
          Host: "api.zerogpt.com",
        },
      },
    );

    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        credits: {
          decrement: Credits.Paraphraser,
        },
      },
    });
    /// a hotfix because apparently NextAuth doesn't update the session when we set the value to 0, so we need to manually update it
    /// IssueX#0

    if (updatedUser.credits === 0) {
      await db.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          credits: 1,
        },
      });
    }

    return NextResponse.json(
      {
        data: response.data.data,
        success: true,
        message: "Paraphrasing executed successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: error,
        success: false,
        message:
          "Internal Server Error, Please try again later, If issue persists please change the image.",
      },
      { status: 500 },
    );
  }
}
