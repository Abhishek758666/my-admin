"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex justify-center gap-5">
          <Avatar className="h-8 w-8 rounded-full grayscale">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="text-muted-foreground truncate text-xs">
              {user.email}
            </span>
          </div>
          <Button className="cursor-pointer">
            <LogOutIcon className="size-4" />
          </Button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
