"use client";
import React from "react";
import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { CardBalance3 } from "./card-balance3";
import { DataLogger } from "./DataLogger"; // Import the new DataLogger component
import { TableWrapper } from "@/components/tableHome/table";

export const Content = () => (
  <div className="h-full px-2 py-6">
    <div className="flex flex-col gap-2 w-full">
      {/* Card Section Top */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sd:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
          <CardBalance1 />
        </div>
      </div>
      {/* Data Logger Section */}
      {/* <div className="mt-6">
        <TableWrapper />
      </div> */}
    </div>
  </div>
);
