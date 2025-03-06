import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu, X, Trophy, Users, Newspaper, Gift } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">(
    "login",
  );
  const { isLoggedIn, user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenAuthModal = (tab: "login" | "register") => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  return (
    <>
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultTab={authModalTab}
      />
      <nav className="bg-gray-900 border-b border-gray-800 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Desktop Navigation */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Trophy className="h-8 w-8 text-primary mr-2" />
                <span className="font-bold text-xl">MobileGamersHub</span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-4">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link
                        to="/"
                        className="text-white hover:text-primary px-3 py-2 text-sm font-medium"
                      >
                        Home
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-gray-800 text-white">
                        Tournaments
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-gray-900 border border-gray-800">
                        <ul className="grid gap-3 p-4 w-[400px]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-gray-800/50 to-gray-900 p-6 no-underline outline-none focus:shadow-md"
                                href="/tournaments"
                              >
                                <Trophy className="h-6 w-6 text-primary mb-2" />
                                <div className="mb-2 mt-4 text-lg font-medium text-white">
                                  Featured Tournaments
                                </div>
                                <p className="text-sm leading-tight text-gray-400">
                                  Compete in our premier gaming events with the
                                  biggest prize pools
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <Link
                              to="/tournaments/open"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800 hover:text-primary focus:bg-gray-800 focus:text-primary"
                            >
                              <div className="text-sm font-medium leading-none">
                                Open Tournaments
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                                Browse tournaments that are currently accepting
                                registrations
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/tournaments/in-progress"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800 hover:text-primary focus:bg-gray-800 focus:text-primary"
                            >
                              <div className="text-sm font-medium leading-none">
                                In Progress
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                                Check out live tournaments and follow the action
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/tournaments/completed"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800 hover:text-primary focus:bg-gray-800 focus:text-primary"
                            >
                              <div className="text-sm font-medium leading-none">
                                Past Tournaments
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                                View results and highlights from previous
                                competitions
                              </p>
                            </Link>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link
                        to="/leaderboards"
                        className="text-white hover:text-primary px-3 py-2 text-sm font-medium"
                      >
                        Leaderboards
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link
                        to="/articles"
                        className="text-white hover:text-primary px-3 py-2 text-sm font-medium"
                      >
                        Articles
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-gray-300 hover:text-white"
                  >
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-900"></span>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || "gamer123"}`}
                            alt={user?.user_metadata?.username || "User"}
                          />
                          <AvatarFallback>
                            {user?.user_metadata?.username
                              ?.substring(0, 2)
                              .toUpperCase() || "GH"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56 bg-gray-900 border-gray-800 text-white"
                      align="end"
                    >
                      <DropdownMenuLabel>
                        {user?.user_metadata?.username || "My Account"}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-800" />
                      <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                        My Teams
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                        Tournament History
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-800" />
                      <DropdownMenuItem
                        className="hover:bg-gray-800 cursor-pointer"
                        onClick={signOut}
                      >
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-primary hover:bg-gray-800"
                    onClick={() => handleOpenAuthModal("login")}
                  >
                    Sign in
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => handleOpenAuthModal("register")}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 hover:text-primary"
              >
                Home
              </Link>
              <Link
                to="/tournaments"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 hover:text-primary"
              >
                Tournaments
              </Link>
              <Link
                to="/leaderboards"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 hover:text-primary"
              >
                Leaderboards
              </Link>
              <Link
                to="/articles"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 hover:text-primary"
              >
                Articles
              </Link>
            </div>

            {/* Mobile user menu */}
            <div className="pt-4 pb-3 border-t border-gray-800">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || "gamer123"}`}
                          alt={user?.user_metadata?.username || "User"}
                        />
                        <AvatarFallback>
                          {user?.user_metadata?.username
                            ?.substring(0, 2)
                            .toUpperCase() || "GH"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">
                        {user?.user_metadata?.username || "Gamer"}
                      </div>
                      <div className="text-sm font-medium text-gray-400">
                        {user?.email || "gamer@example.com"}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto text-gray-300 hover:text-white"
                    >
                      <Bell size={20} />
                    </Button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <Link
                      to="/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 hover:text-primary"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/teams"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 hover:text-primary"
                    >
                      My Teams
                    </Link>
                    <Link
                      to="/history"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 hover:text-primary"
                    >
                      Tournament History
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 hover:text-primary"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={signOut}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 hover:text-primary"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-5 py-3 flex flex-col space-y-2">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => handleOpenAuthModal("login")}
                  >
                    Sign in
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-white hover:bg-gray-800"
                    onClick={() => handleOpenAuthModal("register")}
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
