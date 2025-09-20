"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { 
  Mic, 
  MicOff, 
  Download, 
  Users, 
  Settings,
  Copy,
  Share2
} from "lucide-react";
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

// Mock data for connected users
const mockUsers = [
  { id: "1", name: "Alice Johnson", color: "#FF6B6B", isActive: true },
  { id: "2", name: "Bob Smith", color: "#4ECDC4", isActive: true },
  { id: "3", name: "Charlie Brown", color: "#45B7D1", isActive: false },
  { id: "4", name: "Diana Prince", color: "#96CEB4", isActive: true },
];

export default function RoomClient({ params, searchParams }: RoomClientProps) {
  const roomId = params.id;
  const userName = searchParams.name || "Anonymous";
  const [muted, setMuted] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const excalidrawRef = useRef<any>(null);

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
  };

  const shareRoom = () => {
    const url = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(url);
  };

  const exportDrawing = async () => {
    if (!excalidrawRef.current) return;
    
    try {
      const { exportToCanvas } = await import("@excalidraw/excalidraw");
      const elements = excalidrawRef.current.getSceneElements();
      const appState = excalidrawRef.current.getAppState();
      
      const canvas = await exportToCanvas({
        elements,
        appState,
        files: excalidrawRef.current.getFiles(),
      });
      
      // Create download link
      const link = document.createElement("a");
      link.download = `excalidraw-${roomId}-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <div className="w-screen h-screen relative">
      {/* Full-screen Excalidraw canvas */}
      <div className="absolute inset-0">
        <Excalidraw 
          ref={excalidrawRef}
          theme="dark"
          UIOptions={{
            canvasActions: {
              loadScene: false,
              saveScene: false,
              export: false,
              toggleTheme: false
            }
          }}
        />
      </div>

      {/* Top overlay bar - positioned to not interfere with Excalidraw UI */}
      <div className="absolute top-2 left-2 z-10 pointer-events-none">
        <div className="flex items-center gap-3 bg-gray-900/70 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-500/30 pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium text-white text-sm">Room: {roomId}</span>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={copyRoomId}
              className="h-7 w-7 p-0 hover:bg-gray-700/50 text-gray-300"
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 border-l border-gray-500/30 pl-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-white text-sm">{userName}</span>
          </div>
        </div>
      </div>

      {/* Top right controls - positioned to not interfere */}
      <div className="absolute top-2 right-2 z-10 pointer-events-none">
        <div className="flex items-center gap-2 bg-gray-900/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-500/30 pointer-events-auto">
          {/* Users section */}
          <div className="relative">
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setShowUsers(!showUsers)}
              className="flex items-center gap-2 hover:bg-gray-700/50 text-gray-200 h-8 px-3"
            >
              <Users className="h-4 w-4" />
              <span className="text-sm">{mockUsers.filter(u => u.isActive).length}</span>
            </Button>
            
            {showUsers && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-gray-900/90 backdrop-blur-sm border border-gray-500/30 rounded-lg shadow-xl z-50">
                <div className="p-3 border-b border-gray-500/30">
                  <h3 className="font-semibold text-sm text-white">Users ({mockUsers.filter(u => u.isActive).length})</h3>
                </div>
                <div className="p-2 max-h-36 overflow-y-auto">
                  {mockUsers.map((user) => (
                    <div 
                      key={user.id} 
                      className="flex items-center gap-2 p-2 rounded text-sm hover:bg-gray-700/50"
                    >
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: user.color }}
                      ></div>
                      <span className="flex-1 text-gray-200">{user.name}</span>
                      <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button 
            size="sm" 
            variant={muted ? "destructive" : "ghost"}
            onClick={() => setMuted(!muted)}
            className="flex items-center gap-2 h-8 px-3 text-gray-200 hover:bg-gray-700/50"
          >
            {muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>

          <Button 
            size="sm" 
            variant="ghost"
            onClick={shareRoom}
            className="flex items-center hover:bg-gray-700/50 text-gray-200 h-8 px-3"
          >
            <Share2 className="h-4 w-4" />
          </Button>

          <Button 
            size="sm" 
            variant="ghost"
            className="flex items-center hover:bg-gray-700/50 text-gray-200 h-8 px-3"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bottom right export - positioned to not interfere with Excalidraw's bottom UI */}
      <div className="absolute bottom-16 right-2 z-10 pointer-events-none">
        <Button 
          size="sm" 
          variant="default"
          onClick={exportDrawing}
          className="flex items-center gap-2 bg-gray-900/70 hover:bg-gray-800/80 text-white border border-gray-500/30 backdrop-blur-sm pointer-events-auto px-3 py-2 h-8"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </div>

      {/* Click outside to close users dropdown */}
      {showUsers && (
        <div 
          className="fixed inset-0 z-20" 
          onClick={() => setShowUsers(false)}
        ></div>
      )}
    </div>
  );
}