"use client";

import NavItem from "@/src/components/ui/layout/NavItem";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@components/shadcn-custom/navigation-menu";
import { Switch } from "@components/shadcn-custom/switch-custom";

const navItems = [
  { name: "Home", image: "/assets/navigations/home.png", link: "/" },
  {
    name: "Products",
    image: "/assets/navigations/products.png",
    link: "/products",
  },
  { name: "Orders", image: "/assets/navigations/orders.png", link: "/orders" },
  {
    name: "Customers",
    image: "/assets/navigations/customers.png",
    link: "/customers",
  },
  {
    name: "Settings",
    image: "/assets/navigations/settings.png",
    link: "/settings",
  },
];

const SideBar = () => {
  return (
    <nav className="w-[20%] h-fit my-6 pr-6 border-r flex flex-col gap-4 justify-start items-start">
      <div className="w-full h-fit">
        <NavigationMenu>
          <NavigationMenuList className="flex-col gap-2">
            {navItems.map((item) => (
              <NavigationMenuItem>
                <NavigationMenuLink href={item.link}>
                  <NavItem
                    name={item.name}
                    image={item.image}
                    isTrigger={false}
                  ></NavItem>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <NavItem
                  name="Options"
                  image="/assets/navigations/products.png"
                  isTrigger={true}
                ></NavItem>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-40 px-3 py-1 flex flex-col overflow-hidden">
                  <a href="/opt1">Option 1</a>
                  <a href="/opt2">Option 2</a>
                  <a href="/opt3">Option 3</a>
                  <a href="/opt4">Option 4</a>
                  <a href="/opt5">Option 5</a>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <NavItem
                  name="Options"
                  image="/assets/navigations/products.png"
                  isTrigger={true}
                ></NavItem>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-40 px-3 py-1 flex flex-col overflow-hidden">
                  <a href="/opt1">Option 1</a>
                  <a href="/opt2">Option 2</a>
                  <a href="/opt3">Option 3</a>
                  <a href="/opt4">Option 4</a>
                  <a href="/opt5">Option 5</a>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="w-full h-32 px-4 border-t border-b py-5 flex flex-col justify-center gap-2 text-[whitesmoke] text-sm font-extralight">
        <div className="flex items-center justify-start gap-2">
          <Switch />
          <span className="text-sm">Dark Mode</span>
        </div>
        <div className="flex items-center justify-start gap-2">
          <Switch />
          <span className="text-sm">Notification</span>
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-2 px-2 justify-end pt-20">
        <NavItem
          name="Support"
          image="/assets/navigations/settings.png"
          isTrigger={false}
        />
        <NavItem
          name="Contact Us"
          image="/assets/navigations/settings.png"
          isTrigger={false}
        />
      </div>
    </nav>
  );
};

export default SideBar;
