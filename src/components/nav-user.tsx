"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { successToast } from "@/lib/toastify";
import { Logout } from "@/redux/thunks/auth.thunk";

export function NavUser() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const authState = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(Logout());
    router.push("/");
    successToast("logged out successfully");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex justify-center gap-5">
          <Avatar className="h-8 w-8 rounded-full grayscale">
            <AvatarImage src={authState.userImage} alt={authState.username} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{authState.username}</span>
            <span className="text-muted-foreground truncate text-xs">
              {authState.email}
            </span>
          </div>
          <Button className="cursor-pointer" onClick={handleLogout}>
            <LogOutIcon className="size-4" />
          </Button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
