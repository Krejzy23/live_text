import Image from "next/image";
import React, { useState } from "react";
import UserTypeSelector from "./UserTypeSelector";
import { Button } from "./ui/button";
import {
  removeCollaborator,
  updateDocumentAccess,
} from "@/lib/actions/room.actions";

const Collaborator = ({
  roomId,
  creatorId,
  collaborator,
  email,
  user,
}: CollaboratorProps) => {
  const [userType, setUserType] = useState(
    collaborator.userType || "viewer"
  );
  const [loading, setLoading] = useState(false);

  const shareDocumentHandler = async (type: string) => {
    setLoading(true);

    await updateDocumentAccess({
      roomId,
      email,
      userType: type as UserType,
      updatedBy: user,
    });

    setLoading(false);
  };

  const removeCollaboratorHandler = async (email: string) => {
    setLoading(true);
    await removeCollaborator({ roomId, email });
    setLoading(false);
  };

  return (
    <li
      className="
        flex items-center justify-between gap-3 px-4 py-3
        rounded-2xl bg-[#ecf0f3]
        shadow-[8px_8px_16px_rgba(0,0,0,0.12),-8px_-8px_16px_#ffffff]
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 min-w-0">
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className="
            size-9 rounded-full
            shadow-[4px_4px_8px_rgba(0,0,0,0.15),-4px_-4px_8px_#ffffff]
          "
        />

        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 leading-tight truncate">
            {collaborator.name}
            {loading && (
              <span className="pl-2 text-xs text-gray-500">
                updating…
              </span>
            )}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {collaborator.email}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      {creatorId === collaborator.id ? (
        <span className="text-xs font-medium text-gray-500">
          Owner
        </span>
      ) : (
        <div className="flex items-center gap-2">
          <UserTypeSelector
            userType={userType as UserType}
            setUserType={setUserType}
            onClickHandler={shareDocumentHandler}
          />

          <Button
            type="button"
            onClick={() =>
              removeCollaboratorHandler(collaborator.email)
            }
            className="
              h-8 px-3 text-xs font-medium text-gray-700
              bg-[#ecf0f3] rounded-xl
              shadow-[4px_4px_8px_rgba(0,0,0,0.15),-4px_-4px_8px_#ffffff]
              hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15),inset_-4px_-4px_8px_#ffffff]
              transition
            "
          >
            Remove
          </Button>
        </div>
      )}
    </li>
  );
};

export default Collaborator;
