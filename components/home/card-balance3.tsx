import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { MdBatteryChargingFull, MdFlashOn, MdPower, MdEnergySavingsLeaf, MdSpeed, MdEqualizer } from "react-icons/md";

export const CardBalance3 = () => {
  const [data, setData] = useState({
    voltage1: 0,
    voltage2: 0,
    voltage3: 0,
    current1: 0,
    current2: 0,
    current3: 0,
    power1: 0,
    power2: 0,
    power3: 0,
    energy1: 0,
    energy2: 0,
    energy3: 0,
    frequency1: 0,
    frequency2: 0,
    frequency3: 0,
    PF1: 0,
    PF2: 0,
    PF3: 0,
    timestamp: "",
  });

  useEffect(() => {
    const ws = new WebSocket("wss://curex.akti.cloud/sensor");

    ws.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    // Cleanup WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <Card className="bg-gradient-to-r from-indigo-800 to-purple-900 rounded-xl shadow-lg px-6 py-6 w-full h-full flex flex-col">
      <CardBody className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col">
            <span className="text-white text-4xl md:text-7xl font-bold">Load</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 gap-6">
          <div className="flex flex-col items-center gap-4 bg-gradient-to-b from-gray-700 to-gray-900 text-white rounded-lg px-4 py-4 shadow-lg transition-transform transform hover:scale-105">
            <MdBatteryChargingFull className="text-4xl text-blue-400" />
            <span className="font-semibold text-blue-400 text-lg">Voltage</span>
            <span className="text-white text-lg font-semibold">{data.voltage3} V</span>
          </div>

          <div className="flex flex-col items-center gap-4 bg-gradient-to-b from-gray-700 to-gray-900 text-white rounded-lg px-4 py-4 shadow-lg transition-transform transform hover:scale-105">
            <MdFlashOn className="text-4xl text-red-400" />
            <span className="font-semibold text-red-400 text-lg">Current</span>
            <span className="text-white text-lg font-semibold">{data.current3} A</span>
          </div>

          <div className="flex flex-col items-center gap-4 bg-gradient-to-b from-gray-700 to-gray-900 text-white rounded-lg px-4 py-4 shadow-lg transition-transform transform hover:scale-105">
            <MdPower className="text-4xl text-yellow-400" />
            <span className="font-semibold text-yellow-400 text-lg">Power</span>
            <span className="text-white text-lg font-semibold">{data.power3} W</span>
          </div>

          <div className="flex flex-col items-center gap-4 bg-gradient-to-b from-gray-700 to-gray-900 text-white rounded-lg px-4 py-4 shadow-lg transition-transform transform hover:scale-105">
            <MdEnergySavingsLeaf className="text-4xl text-green-400" />
            <span className="font-semibold text-green-400 text-lg">Energy</span>
            <span className="text-white text-lg font-semibold">{data.energy3} Wh</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};