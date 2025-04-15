"use client"
import { useUser } from '@clerk/nextjs';
import { Button } from "~/components/ui/button"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar"

export function NavUser({

}) {
  const { isMobile } = useSidebar()
  const { isSignedIn, user, isLoaded } = useUser()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        
              <SignedIn>
                <div className='flex pl-3 pb-3'>
              <UserButton />
                <p className='pl-3'>{user?.username}</p>
              
              </div>
              </SignedIn>        
          <SignedOut>
           
            <SignInButton mode='modal'>

            <Button className=' p-5 mr-3'>
              Sign In
            </Button>
            </SignInButton>

            <SignUpButton mode='modal'>
            <Button className=' p-5'>
              Sign Up
            </Button>
            </SignUpButton>
            
          </SignedOut>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
