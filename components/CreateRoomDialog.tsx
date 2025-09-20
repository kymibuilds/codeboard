"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function CreateRoomDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [roomCode, setRoomCode] = useState("")

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setRoomCode(code)
  }

  const handleStart = () => {
    if (!name) return
    // redirect or initialize room logic
    window.location.href = `/room/${roomCode}?name=${encodeURIComponent(name)}`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(roomCode)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={generateRoomCode}>Create Room</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm w-full p-6">
        <DialogHeader>
          <DialogTitle className="text-lg">Create a Room</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            placeholder="Enter your name"
            className="h-9 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {roomCode && (
            <div className="flex gap-2">
              <Input value={roomCode} readOnly className="h-9 text-sm" />
              <Button onClick={handleCopy} className="h-9 text-sm">Copy</Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleStart} className="w-full h-9 text-sm">Start Room</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
