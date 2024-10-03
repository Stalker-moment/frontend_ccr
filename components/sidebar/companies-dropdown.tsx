"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { AcmeIcon } from "../icons/acme-icon";
import { AcmeLogo } from "../icons/acmelogo";
import { BottomIcon } from "../icons/sidebar/bottom-icon";
import { PiBuildingApartmentDuotone } from "react-icons/pi";

interface Machine {
  name: string;
  location: string;
  logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
  const [machine, setMachine] = useState<Machine>({
    name: "Power Monitoring",
    location: "Asrama AKTI",
    logo: <PiBuildingApartmentDuotone />,
  });

  return (
    <Dropdown
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center gap-2">
          {machine.logo}
          <div className="flex flex-col gap-1">
            <h3 className="text-l font-medium m-0 text-default-900 whitespace-nowrap">
              {machine.name}
            </h3>
            <span className="text-xs font-medium text-default-500">
              {machine.location}
            </span>
          </div>
          <BottomIcon />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(e) => {
          if (e === "1") {
            setMachine({
              name: "Power Monitoring",
              location: "Asrama AKTI",
              logo: <PiBuildingApartmentDuotone />,
            });
          }
        }}
        aria-label="Machine Actions"
      >
        <DropdownSection title="Location">
          <DropdownItem
            key="1"
            startContent={<PiBuildingApartmentDuotone />}
            description="Asrama AKTI"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Power Monitoring
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};