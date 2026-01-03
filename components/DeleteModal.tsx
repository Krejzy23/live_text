"use client";

import Image from "next/image";
import { useState } from "react";

import { deleteDocument } from "@/lib/actions/room.actions";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";

export const DeleteModal = ({ roomId }: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteDocumentHandler = async () => {
    setLoading(true);
    try {
      await deleteDocument(roomId);
      setOpen(false);
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="
            rounded-xl p-2
            bg-transparent
            hover:bg-transparent
            neumorph-button
          "
        >
          <Image
            src="/assets/icons/delete.svg"
            alt="delete"
            width={18}
            height={18}
            className="icon-danger"
          />
        </Button>
      </DialogTrigger>

      <DialogContent className="neumorph-dialog">
        <DialogHeader className="items-center text-center">
          <div className="neumorph-icon mb-4">
            <Image
              src="/assets/icons/delete-modal.svg"
              alt="delete"
              width={48}
              height={48}
            />
          </div>

          <DialogTitle className="text-lg">
            Delete document
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            Are you sure you want to delete this document?
            <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex gap-3">
          <DialogClose asChild>
            <Button
              variant="secondary"
              className="neumorph-button w-full"
              disabled={loading}
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={deleteDocumentHandler}
            disabled={loading}
            className="neumorph-danger w-full"
          >
            {loading ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
