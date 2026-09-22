import { BookOpen, Calendar, Home, Settings } from "lucide-react";
import { Link, useLocation } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { currentStudent } from "@/lib/mock-data";

const items = [
  { title: "หน้าแรก", url: "/", icon: Home },
  { title: "ลงทะเบียนเรียน", url: "/enrollment", icon: BookOpen },
  { title: "ตารางเรียน", url: "/schedule", icon: Calendar },
  { title: "ตั้งค่า", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-1 text-sm font-semibold">CPE & ISNE</div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    render={<Link to={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 5*/}
      <SidebarFooter className="p-3">
        <Separator className="mb-3" />
        <div className="flex items-center gap-3 px-1">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/pic_me.jpg" alt={currentStudent.firstName} />
            <AvatarFallback>
              {currentStudent.firstName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start gap-1">
            <span className="text-sm font-medium leading-none">
              {currentStudent.nickname || currentStudent.firstName}
            </span>
            <Badge
              variant="outline"
              className="h-5 rounded-full border-[1.5px] border-foreground/80 px-2 text-[10px] font-semibold tracking-wider text-foreground"
            >
              STUDENT
            </Badge>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
