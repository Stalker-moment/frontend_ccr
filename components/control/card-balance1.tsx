import { Card, CardBody, Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

// Define API endpoints
const API_ENDPOINTS = {
  relay1: "https://curex.akti.cloud/api/internal/switch/relay1",
  relay2: "https://curex.akti.cloud/api/internal/switch/relay2",
  relay3: "https://curex.akti.cloud/api/internal/switch/relay3",
  relay4: "https://curex.akti.cloud/api/internal/switch/relay4",
};

// WebSocket URL
const WEBSOCKET_URL = "wss://curex.akti.cloud/relay";

export const CardBalance1 = () => {
  const [relayStates, setRelayStates] = useState({
    relay1: false,
    relay2: false,
    relay3: false,
    relay4: false,
  });

  useEffect(() => {
    // Create WebSocket connection
    const socket = new WebSocket(WEBSOCKET_URL);

    // Connection opened
    socket.addEventListener("open", () => {
      console.log("Connected to WebSocket");
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        setRelayStates({
          relay1: data.relay1,
          relay2: data.relay2,
          relay3: data.relay3,
          relay4: data.relay4,
        });
      } catch (error) {
        console.error("Error parsing WebSocket message", error);
      }
    });

    // Connection closed
    socket.addEventListener("close", () => {
      console.log("Disconnected from WebSocket");
    });

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []);

  const handleButtonClick = async (relay: keyof typeof relayStates) => {
    // Toggle the relay state
    const newState = !relayStates[relay];
    setRelayStates((prevState) => ({
      ...prevState,
      [relay]: newState,
    }));

    // Send API request with the new state
    try {
      const response = await fetch(API_ENDPOINTS[relay], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: newState }),
      });

      if (!response.ok) {
        throw new Error("Failed to update relay state");
      }
    } catch (error) {
      console.error("Error sending API request", error);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl shadow-lg px-6 py-6 w-full h-full flex flex-col">
      <CardBody className="flex flex-col gap-6">
        <div className="flex flex-wrap justify-around gap-4 mt-4">
          {Object.keys(relayStates).map((key) => (
            <Button
              key={key}
              className={`w-24 rounded-lg transition-transform transform hover:scale-105 ${
                relayStates[key as keyof typeof relayStates]
                  ? "bg-green-500"
                  : "bg-red-500"
              } text-white`}
              onPress={() => handleButtonClick(key as keyof typeof relayStates)}
            >
              {key.toUpperCase()}
            </Button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
