"use client";

import type React from "react";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table/data-table";
import { createColumns } from "@/components/ui/data-table/columns";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { CircleCheck, CircleX } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { deleteNote, getNotes, toggleNote } from "@/redux/thunks/note.thunk";
import { TNoteSchema } from "@/schemas/note.schema";
import Image from "next/image";
import Link from "next/link";

// delete dialog
interface DeleteDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleConfirmDelete: () => void;
  currentNote: TNoteSchema;
}
const DeleteDialog = (props: DeleteDialogProps) => {
  return (
    <Dialog
      open={props.isDeleteDialogOpen}
      onOpenChange={props.setIsDeleteDialogOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            {`Are you sure you want to delete Note by ${props.currentNote?.name.toUpperCase()}?`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => props.setIsDeleteDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={props.handleConfirmDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// main table
export default function NotesDataTable() {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.notes.data);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<TNoteSchema | null>(null);

  const verifyNote = (id: string) => {
    dispatch(toggleNote({ id }));
  };

  // Define base columns
  const baseColumns: ColumnDef<TNoteSchema>[] = [
    {
      accessorKey: "id",
      header: "Note ID",
      cell: ({ row }) => {
        const id = row.getValue("id") as string;
        return <span>{id.slice(0, 8)}...</span>;
      },
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
      cell: ({ row }) => {
        const Name = row.getValue("name") as string;
        return <span className="uppercase">{Name}</span>;
      },
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const image = row.getValue("image") as string;
        return (
          <Link href={image} target="_blank" className="flex items-center">
            <Image src={image} alt="note image" width={50} height={50} />
          </Link>
        );
      },
    },
    {
      accessorKey: "message",
      header: "Message",
      enableSorting: true,
    },
    {
      accessorKey: "verified",
      header: "Verified",
      enableSorting: true,
      cell: ({ row }) => {
        const isVerified = row.getValue("verified") as string;
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => verifyNote(row.getValue("id"))}
          >
            {isVerified && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <CircleCheck className="mr-1 h-3 w-3" />
                Verified
              </Badge>
            )}
            {!isVerified && (
              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                <CircleX className="mr-1 h-3 w-3" />
                Not Verified
              </Badge>
            )}
          </div>
        );
      },
      filterFn: (row, id, value) => {
        const cellValue = row.getValue(id);
        return Array.isArray(value) && value.includes(cellValue);
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      enableSorting: true,
    },
  ];

  // Create columns with selection and actions
  const columns = createColumns<TNoteSchema>(
    baseColumns,
    undefined,
    (row) => {
      setCurrentNote(row);
      setIsDeleteDialogOpen(true);
    },
    false // Don't include selection checkboxes
  );

  // Define searchable columns
  const searchableColumns = [
    {
      id: "name",
      title: "Name",
    },
  ];

  // Handle delete
  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  // Handle form submission for create/edit

  // Handle confirm delete
  const handleConfirmDelete = () => {
    dispatch(deleteNote({ id: currentNote?.id ?? "" }));
    setIsDeleteDialogOpen(false);
    setCurrentNote(null);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Notes Management</h1>

      <DataTable
        columns={columns}
        data={data ?? []}
        searchableColumns={searchableColumns}
        onDelete={handleDelete}
      />

      {/* Delete Dialog */}
      <DeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        handleConfirmDelete={handleConfirmDelete}
        currentNote={currentNote!}
      />
    </div>
  );
}
