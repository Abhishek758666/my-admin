"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getNotes } from "@/redux/thunks/note.thunk";
import { TNoteSchema } from "@/schemas/note.schema";
import { IconTrash } from "@tabler/icons-react";
import { Check, CheckCircle, Copy, Cross, XCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

const handleCopyId = (id: string) => {
  navigator.clipboard
    .writeText(id)
    .then(() =>
      toast("ID copied to clipboard", {
        icon: <Check className="text-green-500" size={15} />,
      })
    )
    .catch(() =>
      toast("Failed to copy Id", {
        icon: <Cross className="text-red-500" />,
      })
    );
};

const NoteTableHeader = () => {
  return (
    <TableHeader className="bg-sidebar-accent overflow-hidden">
      <TableRow className="w-full">
        <TableHead>ID</TableHead>
        <TableHead>Created At</TableHead>
        <TableHead>Image</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Message</TableHead>
        <TableHead>Verified</TableHead>
        <TableHead className="text-right">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
};

const NoteTableBody = ({ notes }: { notes: TNoteSchema[] }) => {
  return (
    <TableBody>
      {notes?.map((note) => (
        <TableRow key={note.id}>
          <TableCell className="font-medium flex items-center gap-2 h-15">
            {note.id.slice(0, 12)}...
            <Copy size={14} onClick={() => handleCopyId(note.id)} />
          </TableCell>
          <TableCell>{note.createdAt}</TableCell>
          <TableCell>
            <Link href={`${note.image}`} target="_blank">
              <Image
                src={`${note.image}`}
                height={60}
                width={60}
                alt="note-image"
                className="rounded-md border-2"
              />
            </Link>
          </TableCell>
          <TableCell>{note.name}</TableCell>
          <TableCell>{note.message}</TableCell>
          <TableCell>
            <Button size={"sm"} variant={"secondary"}>
              {note.verified ? (
                <CheckCircle color="green" />
              ) : (
                <XCircleIcon color="red" />
              )}
            </Button>
          </TableCell>
          <TableCell className="text-right space-x-5">
            {!note.verified && (
              <Button variant={"outline"} size="icon">
                <Check />
              </Button>
            )}
            <Button variant={"outline"} size="icon">
              <IconTrash />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default function NotesTable() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes.data);
  console.log(notes);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <Table>
        <TableCaption>Notes visitors had left on your Portfolio.</TableCaption>
        <NoteTableHeader />
        <NoteTableBody notes={notes ?? []} />
      </Table>
    </div>
  );
}
