"use client";
import * as React from "react";
import {
  BookOpen,
  Bot,
  LifeBuoy,
  Send,
  Settings2,
  GraduationCap,
  Home,
  DollarSign,
} from "lucide-react";

import { NavMain } from "@/components/ui/nav-main";
import { NavSecondary } from "@/components/ui/nav-secondary";
import { NavUser } from "@/components/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "./Logo";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard/",
      icon: Home,
    },
    {
      title: "Paid Tools",
      url: "#",
      icon: DollarSign,
      items: [
        {
          title: "Chat GPT 4.0",
          url: "/dashboard/paid?type=gpt-4o",
        },
        {
          title: "Claude Sonnet 3.5",
          url: "/dashboard/paid?type=claude-sonnet-3.5",
        },
        {
          title: "Gemini PRO",
          url: "/dashboard/paid?type=gemini-pro",
        },
      ],
    },
    {
      title: "Chat Tools",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "AI Chatbot",
          url: "/dashboard/chat?type=default",
        },
        {
          title: "AI Personal Assistant",
          url: "/dashboard/chat?type=pa",
        },
        {
          title: "AI Explainer",
          url: "/dashboard/chat?type=explainer",
        },
        {
          title: "AI Coder",
          url: "/dashboard/chat?type=coder",
        },
      ],
    },
    {
      title: "Image Tools",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Text to Image",
          url: "/dashboard/text-to-image",
        },
      ],
    },
    {
      title: "Leaner Tools",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          title: "AI/GPT Detector",
          url: "/dashboard/ai-detector",
        },
        {
          title: "AI Study Buddy",
          url: "#",
        },
        {
          title: "AI MCQ Quiz",
          url: "#",
        },
        {
          title: "AI Quiz",
          url: "#",
        },
      ],
    },
    {
      title: "Other Tools",
      url: "",
      icon: Settings2,
      items: [
        {
          title: "AI Translation",
          url: "/dashboard/translator",
        },
        {
          title: "AI Summarizer",
          url: "/dashboard/summarizer",
        },
        {
          title: "Object Recognition",
          url: "/dashboard/object-recognition",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <React.Suspense
          fallback={
            <div className="h-screen w-full bg-gray-200 dark:bg-zinc-900 animate-pulse"></div>
          }
        >
          <>
            <NavMain items={data.navMain} />
            <NavSecondary items={data.navSecondary} className="mt-auto" />
          </>
        </React.Suspense>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
