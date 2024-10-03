import React, { useEffect, useState, useRef } from "react";
import { Tooltip, Chip } from "@nextui-org/react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";

interface UserData {
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

interface Props {
  user: UserData;
  columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  const cellValue = (user as Record<string, any>)[columnKey as string];

  switch (columnKey) {
    case "status":
      const statusColor =
        cellValue === "L40"
          ? "success"
          : cellValue === "L30"
          ? "danger"
          : "warning";

      return (
        <Chip size="sm" variant="flat" color={statusColor}>
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );

    case "time":
      return <span>{user.timestamp.split('T')[1]}</span>; // Extract time from timestamp

    case "date":
      return <span>{user.timestamp.split('T')[0]}</span>; // Extract date from timestamp

    case "actions":
      return (
        <div className="flex items-center gap-4">
          <Tooltip content="Details">
            <button onClick={() => console.log("View user", user.id)}>
              <EyeIcon size={20} fill="#979797" />
            </button>
          </Tooltip>
          <Tooltip content="Edit user" color="secondary">
            <button onClick={() => console.log("Edit user", user.id)}>
              <EditIcon size={20} fill="#979797" />
            </button>
          </Tooltip>
          <Tooltip content="Delete user" color="danger">
            <button onClick={() => console.log("Delete user", user.id)}>
              <DeleteIcon size={20} fill="#FF0080" />
            </button>
          </Tooltip>
        </div>
      );

    default:
      return <span>{cellValue}</span>;
  }
};

export const UserTable = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const reconnectInterval = useRef<NodeJS.Timeout | null>(null);

  const connectWebSocket = () => {
    ws.current = new WebSocket("wss://curex.akti.cloud/sensor-logs");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current);
        reconnectInterval.current = null;
      }
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data) as UserData[];
      setUsers(data);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected. Attempting to reconnect...");
      reconnectInterval.current = setInterval(() => {
        connectWebSocket();
      }, 5000); // Attempt to reconnect every 5 seconds
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
        clearInterval(reconnectInterval.current);
      }
    };
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Voltage 1</th>
            <th>Current 1</th>
            <th>Power 1</th>
            <th>Energy 1</th>
            <th>Frequency 1</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><RenderCell user={user} columnKey="date" /></td>
              <td><RenderCell user={user} columnKey="time" /></td>
              <td><RenderCell user={user} columnKey="voltage1" /></td>
              <td><RenderCell user={user} columnKey="current1" /></td>
              <td><RenderCell user={user} columnKey="power1" /></td>
              <td><RenderCell user={user} columnKey="energy1" /></td>
              <td><RenderCell user={user} columnKey="frequency1" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};