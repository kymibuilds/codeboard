import { CreateRoomDialog } from "@/components/CreateRoomDialog";
import { JoinRoomDialog } from "@/components/JoinRoomDialog";

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-2 text-white mb-8">
          <h1 className="text-5xl font-bold">codeboard.</h1>
          <p className="text-muted-foreground">
            Collaborate your way through hackathons.
          </p>
        </div>
        
        <div className="flex gap-4">
          <CreateRoomDialog />
          <JoinRoomDialog />
        </div>
      </div>
      
      <div className="pb-4 flex justify-center">
        <p className="text-white/50">built with love by kymi</p>
      </div>
    </div>
  );
}