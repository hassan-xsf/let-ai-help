"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  LifeBuoy,
  Send,
  Settings2,
  GraduationCap,
  Home,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Logo from "./ui/Logo"
import { useSession } from "next-auth/react"

const data = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard/home",
      icon: Home,
    },
    {
      title: "Chat Tools",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "AI Chatbot",
          url: "/chatbot",
        },
        {
          title: "AI Personal Assistant",
          url: "#",
        },
        {
          title: "AI Explainer",
          url: "#",
        },
        {
          title: "AI Coder",
          url: "#",
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
          url: "#",
        },
        {
          title: "Image to Text",
          url: "#",
        },
        {
          title: "Image to Image",
          url: "#",
        },
      ],
    },
    {
      title: "Student Tools",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          title: "AI Writing Assistants",
          url: "#",
        },
        {
          title: "AI Presentation Maker",
          url: "#",
        },
        {
          title: "AI Career Guidance",
          url: "#",
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
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Object Recognition",
          url: "#",
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
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  if(!session?.user) return null;
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
                <Logo/>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className = "py-4">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
