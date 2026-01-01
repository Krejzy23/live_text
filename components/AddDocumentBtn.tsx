"use client";

import { createDocument } from "@/lib/actions/room.actions";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();

  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });
      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={addDocumentHandler}
      className="neu-button flex gap-2"
    >
      <Image src="/assets/icons/add.svg" alt="add" width={24} height={24}/>
      <p className="hidden sm:block relative z-10">Start a blank document</p>
    </Button>
  );
};

export default AddDocumentBtn;
