"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ActiveCollaborators from "./ActiveCollaborators";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { updateDocument } from "@/lib/actions/room.actions";
import Loader from "./Loader";
import ShareModal from "./ShareModal";

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) => {
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setLoading(true);
      if (documentTitle !== roomMetadata.title) {
        await updateDocument(roomId, documentTitle);
      }
      setEditing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        updateDocument(roomId, documentTitle);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [roomId, documentTitle]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room bg-[#ecf0f3]">
          <Header className="header-neu">
            {/* LEFT – TITLE */}
            <div
              ref={containerRef}
              className="flex items-center gap-3 rounded-xl px-3 py-2
                         bg-[#ecf0f3]
                         shadow-[6px_6px_12px_rgba(0,0,0,0.12),-6px_-6px_12px_#ffffff]"
            >
              {editing ? (
                <Input
                  ref={inputRef}
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  className="title-input-neu"
                />
              ) : (
                <p className="title-text-neu">{documentTitle}</p>
              )}

              {currentUserType === "editor" && !editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="icon-btn-neu"
                >
                  <Image
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={18}
                    height={18}
                  />
                </button>
              )}

              {currentUserType !== "editor" && (
                <span className="view-only-neu">View only</span>
              )}

              {loading && (
                <span className="text-xs text-gray-500">saving…</span>
              )}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <ActiveCollaborators />
              <ShareModal
                roomId={roomId}
                collaborators={users}
                creatorId={roomMetadata.creatorId}
                currentUserType={currentUserType}
              />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>

          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
