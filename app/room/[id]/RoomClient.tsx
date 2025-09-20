"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import '@excalidraw/excalidraw/index.css';

// Dynamic import to avoid SSR issues
const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false }
);

interface RoomClientProps {
  params: { id: string };
  searchParams: { name?: string };
}

export default function RoomClient({ params, searchParams }: RoomClientProps) {
  const roomId = params.id;
  const userName = searchParams.name || "Anonymous";
  const [muted, setMuted] = useState(false);

  return (
    <div className="w-screen h-screen bg-black flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 text-white">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Room: {roomId}</span>
          <span>User: {userName}</span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setMuted(!muted)}>
            {muted ? "Unmute" : "Mute"}
          </Button>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 relative">
        <Excalidraw />
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-end px-4 py-2 bg-gray-900 text-white gap-2">
        <Button size="sm" variant="outline">
          Export Board
        </Button>
      </div>
    </div>
  );
}
