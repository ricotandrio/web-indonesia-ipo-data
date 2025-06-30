import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Link } from "@heroui/link";

import "@src/assets/global.css";
import { useState } from "react";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";

import ChveronIcon from "@src/assets/icons/chevron.svg";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Navbar
        maxWidth="full"
        position="static"
        className="border px-7"
        isBordered
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarBrand
          className="hidden sm:flex cursor-pointer"
          onClick={() => navigate("/")}
        >
          <p className="font-bold text-inherit">IPO Data</p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent font-medium"
                  radius="sm"
                  endContent={<img src={ChveronIcon} className="w-5" />}
                  variant="light"
                >
                  Tentang Kami
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              variant="light"
              color="primary"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="disclaimer"
                onPress={() => navigate("/disclaimer")}
              >
                Disclaimer
              </DropdownItem>
              <DropdownItem
                key="terms-and-conditions"
                onPress={() => navigate("/terms-and-conditions")}
              >
                Terms and Conditions
              </DropdownItem>
              <DropdownItem
                key="privacy-policy"
                onPress={() => navigate("/privacy-policy")}
              >
                Privacy Policy
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>

        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand onClick={() => navigate("/")} className="cursor-pointer">
            <p className="font-bold text-inherit">IPO Data </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem className="px-8 flex flex-col gap-3">
            <Link
              className="w-full"
              onPress={() => navigate("/disclaimer")}
              size="lg"
              color="foreground"
            >
              Disclaimer
            </Link>
            <Link
              className="w-full"
              onPress={() => navigate("/terms-and-conditions")}
              size="lg"
              color="foreground"
            >
              Terms and Conditions
            </Link>
            <Link
              className="w-full"
              onPress={() => navigate("/privacy-policy")}
              size="lg"
              color="foreground"
            >
              Privacy Policy
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
