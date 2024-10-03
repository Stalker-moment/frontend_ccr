import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { RenderCell } from "./render-cell";

interface SensorLogData {
  id: number;
  timestamp: string;
  voltage1: number;
  current1: number;
  power1: number;
  energy1: number;
  frequency1: number;
  PF1: number;
  voltage2: number;
  current2: number;
  power2: number;
  energy2: number;
  frequency2: number;
  PF2: number;
  voltage3: number;
  current3: number;
  power3: number;
  energy3: number;
  frequency3: number;
  PF3: number;
  updatedAt: string;
}

export const TableWrapper = () => {
  const [sensorLogs, setSensorLogs] = useState<SensorLogData[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const reconnectInterval = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const columns = [
    { name: "Timestamp", uid: "timestamp" },
    { name: "Solar Panel", uid: "voltage1" },
    { name: "Turbine", uid: "current1" },
    { name: "Battery", uid: "power1" },
    // { name: "Energy 1", uid: "energy1" },
    // { name: "Frequency 1", uid: "frequency1" },
  ];

  const connectWebSocket = () => {
    if (reconnectAttempts.current >= maxReconnectAttempts) {
      console.log("Max reconnect attempts reached. Stopping further attempts.");
      return;
    }

    ws.current = new WebSocket("wss://curex.akti.cloud/sensor-logs");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      reconnectAttempts.current = 0;
      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current);
        reconnectInterval.current = null;
      }
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data) as SensorLogData[];
      setSensorLogs(data);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected. Attempting to reconnect...");
      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectInterval.current = setTimeout(() => {
          reconnectAttempts.current += 1;
          connectWebSocket();
        }, 5000); // Attempt to reconnect after 5 seconds
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      ws.current?.close();
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      if (reconnectInterval.current) {
        clearTimeout(reconnectInterval.current);
      }
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <Table
        aria-label="Sensor Logs Table"
        isHeaderSticky
        bottomContent={null}
        classNames={{
          base: "max-h-[520px] rounded-lg shadow-inner",
          table: "table-auto",
          tbody: "align-top",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align="start"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sensorLogs}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  <RenderCell user={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};