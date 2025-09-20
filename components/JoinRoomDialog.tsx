import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function JoinRoomDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Join Room</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm w-full p-6">
        <DialogHeader>
          <DialogTitle>Join a Room</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Enter your name" />
          <Input placeholder="Meeting code" />
        </div>
        <DialogFooter>
          <Button variant="default" className="w-full">
            Join
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
