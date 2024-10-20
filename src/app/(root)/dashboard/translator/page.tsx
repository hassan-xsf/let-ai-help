import { BookA, Circle, Sparkles } from 'lucide-react'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { languageCodes } from '@/constants/allLanguages'
import { Textarea } from '@/components/ui/textarea'
import CreditChart from '@/components/Credits'

const page = () => {
    return (
        <div className="flex flex-1 flex-col gap-4 p-8 min-h-[70vh]">
            <div className="flex flex-col">
                <div className="flex items-center gap-2 justify-between">
                    <div className="flex flex-col items-between gap-2">
                        <div className = "flex items-center gap-2">
                            <Circle className="size-7 mt-1 text-green-400 fill-green-400 mb-2" />
                            <span className="text-green-500 font-bold text-3xl dark:text-green-400">AI LANGUAGE TRANSLATOR</span>
                        </div>
                        <span className="text-black font-bold text-xl dark:text-white ml-8">NOTE: 2 CREDITS PER TRANSLATION</span>
                    </div>
                    <CreditChart />
                </div>
                <div className='pt-10 flex items-center gap-5'>
                    <Select>
                        <SelectTrigger className="w-[240px] border-green-400">
                            <SelectValue placeholder="Select source language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Source Language</SelectLabel>
                                {
                                    Object.entries(languageCodes).map(([key, value]) => (
                                        <SelectItem key = {key} value={value}>{key}</SelectItem>

                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[240px] border-green-400">
                            <SelectValue placeholder="Select target language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Resulting Language</SelectLabel>
                                {
                                    Object.entries(languageCodes).map(([key, value]) => (
                                        <SelectItem key = {key} value={value}>{key}</SelectItem>

                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-2 gap-4 my-10">
                    <div>

                        <Textarea
                            placeholder="Enter text to translate"
                            className="w-full h-96 p-2 text-md bg-white text-black dark:bg-zinc-900 dark:text-white border-green-400"
                        />
                    </div>
                    <Textarea
                        placeholder="Translation will appear here"
                        readOnly
                        className="w-full h-96 p-2 text-md bg-white text-black dark:bg-zinc-900 dark:text-white border-green-400"
                    />
                </div>
                <div className="w-1/6 mx-auto">
                    <button className="w-full px-6 py-3 flex items-center justify-center gap-3 bg-green-500 text-white rounded-lg font-semibold text-lg transition-all hover:bg-green-600 shadow-[6px_6px_0_0_#166534] hover:shadow-[2px_2px_0_0_#166534] hover:translate-x-1 hover:translate-y-1">
                        <Sparkles className="size-6 ml-2 text-black fill-green-600" />
                        AI TRANSLATE
                    </button>
                </div>
            </div>
        </div>
    )
}

export default page