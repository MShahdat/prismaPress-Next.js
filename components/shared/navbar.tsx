"use client"

import Link from "next/link"
import {
  Command,
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Users,
  User,
  Settings,
  CreditCard,
  LifeBuoy,
  LogOut,
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/service/logout"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const navLinks = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Team", href: "/team", icon: Users },
] as const

const userMenuItems = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Billing", href: "/billing", icon: CreditCard },
  { label: "Support", href: "/support", icon: LifeBuoy },
] as const

type TUser = {
  success: boolean
  message: string
  data: {
    id: string
    name: string
    email: string
    activeStatus: string
    role: string
    createdAt: string
    updatedAt: string
    profile: {
      id: string
      userId: string
      profilePhoto: string
      bio: string
      createdAt: string
      updatedAt: string
    }
  }
}

type Navbarprops = {
  user: TUser
}


export function Navbar({ user }: Navbarprops) {

  const router = useRouter()

  const handleLogout = async (action: string) => {
    if (action === 'logout') {
      await logout();
      toast.success('Logout successfully!')
      router.push('/login')
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Command className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Press</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <Button
                key={link.href}
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={<Link href={link.href} />}
              >
                <Icon data-icon="inline-start" />
                {link.label}
              </Button>
            )
          })}
        </nav>

        {/* Right side: mobile menu + user dropdown */}
        {
          user.success ?
            <div className="flex items-center gap-2">
              {/* Mobile nav */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                      <Menu />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuGroup>
                    {navLinks.map((link) => {
                      const Icon = link.icon
                      return (
                        <DropdownMenuItem key={link.href} render={<Link href={link.href} />}>
                          <Icon />
                          {link.label}
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                      <Avatar className="size-8">
                        <AvatarImage src={user?.data?.profile?.profilePhoto} alt="profileImge" />
                        <AvatarFallback>👦🏻</AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-56 bg-white text-neutral-900">
                  <div className="flex flex-col px-1.5 py-1.5">
                    <span className="text-sm font-medium text-neutral-900">
                      {user?.data?.name}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {user?.data?.email}
                    </span>
                  </div>
                  <DropdownMenuSeparator className="bg-neutral-200" />
                  <DropdownMenuGroup>
                    {userMenuItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <DropdownMenuItem
                          key={item.href}
                          render={<Link href={item.href} />}
                          className="text-neutral-900 focus:bg-neutral-300 focus:text-neutral-900 [&_svg]:!text-neutral-900 [&_svg_*]:!text-neutral-900"
                        >
                          <Icon />
                          {item.label}
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-neutral-200" />
                  <DropdownMenuItem
                    onClick={async () => {
                      console.log("[v0] Sign out clicked");
                      await handleLogout('logout')
                    }}
                    className="!text-red-600 focus:bg-red-50 focus:!text-red-600 [&_svg]:!text-red-600 [&_svg_*]:!text-red-600"
                  >
                    <LogOut />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            :
            <Link href={"/login"}>
              <Button>Login</Button>
            </Link>

        }
      </div>
    </header>
  )
}
