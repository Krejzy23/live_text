'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useSelf } from '@liveblocks/react/suspense'
import React, { useState } from 'react'
import { Button } from "./ui/button"
import Image from "next/image"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import UserTypeSelector from "./UserTypeSelector"
import Collaborator from "./Collaborator"
import { updateDocumentAccess } from "@/lib/actions/room.actions"

const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const user = useSelf()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState<UserType>('viewer')

  const shareDocumentHandler = async () => {
    setLoading(true)
    await updateDocumentAccess({
      roomId,
      email,
      userType,
      updatedBy: user.info,
    })
    setLoading(false)
    setEmail('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={currentUserType !== 'editor'}
          className="neu-btn h-9 px-4 gap-2"
        >
          <Image
            src="/assets/icons/share.svg"
            alt="share"
            width={18}
            height={18}
          />
          <span className="hidden sm:block">Share</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="neu-modal">
        <DialogHeader>
          <DialogTitle className="text-gray-800">
            Share document
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Invite people to view or edit this document
          </DialogDescription>
        </DialogHeader>

        {/* INVITE */}
        <div className="mt-6 space-y-2">
          <Label htmlFor="email" className="text-gray-600">
            Email address
          </Label>

          <div className="flex gap-3">
            <div className="flex flex-1 neu-inset rounded-lg">
              <Input
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="neu-input flex-1"
              />
              <UserTypeSelector
                userType={userType}
                setUserType={setUserType}
              />
            </div>

            <Button
              onClick={shareDocumentHandler}
              disabled={loading || !email}
              className="neu-btn px-5"
            >
              {loading ? 'Sending…' : 'Invite'}
            </Button>
          </div>
        </div>

        {/* COLLABORATORS */}
        <ul className="mt-4 space-y-2">
          {collaborators.map((collaborator) => (
            <Collaborator
              key={collaborator.id}
              roomId={roomId}
              creatorId={creatorId}
              email={collaborator.email}
              collaborator={collaborator}
              user={user.info}
            />
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}

export default ShareModal
