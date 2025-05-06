"use client";

import type React from "react";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table/data-table";
import { createColumns } from "@/components/ui/data-table/columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { TTagResponseSchema, TTagSchema } from "@/schemas/tag.schema";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addTag, deleteTag, editTag, getTags } from "@/redux/thunks/tag.thunk";
import InsertTag from "./insert";
import EditTag from "./edit";
import { copyToClipboard } from "@/utils/helpers";

interface DeleteDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleConfirmDelete: () => void;
  currentTag: TTagResponseSchema;
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
            {`Are you sure you want to delete Tag ${props.currentTag?.title}?`}
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

export default function TagDataTable() {
  const dispatch = useAppDispatch();

  const tags = useAppSelector((state) => state.tags.data);

  const [data] = useState<TTagResponseSchema[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState<TTagResponseSchema | null>(null);

  // Define base columns
  const baseColumns: ColumnDef<TTagResponseSchema>[] = [
    {
      accessorKey: "id",
      header: "Tag ID",
      cell: ({ row }) => (
        <span
          className="font-medium hover:underline cursor-pointer"
          onClick={() => copyToClipboard(row.getValue("id"))}
        >
          {(row.getValue("id") as string).slice(0, 13)}...
        </span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "title",
      header: "Title",
      enableSorting: true,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      enableSorting: true,
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      enableSorting: true,
    },
  ];

  // Create columns with selection and actions
  const columns = createColumns<TTagResponseSchema>(
    baseColumns,
    (row) => {
      setCurrentTag(row);
      setIsEditDialogOpen(true);
    },
    (row) => {
      setCurrentTag(row);
      setIsDeleteDialogOpen(true);
    },
    false // Don't include selection checkboxes
  );

  // Define searchable columns
  const searchableColumns = [
    {
      id: "title",
      title: "Title",
    },
  ];

  // Handle create
  const handleCreate = () => {
    setCurrentTag(null);
    setIsCreateDialogOpen(true);
  };

  // Handle delete
  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  // Handle form submission for create/edit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const newTag: TTagSchema = {
      title: formData.get("title") as string,
    };

    if (currentTag) {
      // Edit existing order
      dispatch(
        editTag({
          updatedTag: { title: newTag.title },
          tagId: currentTag.id,
        })
      );
      setIsEditDialogOpen(false);
    } else {
      // Create new order
      dispatch(addTag({ tag: { title: newTag.title } }));
      setIsCreateDialogOpen(false);
    }
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    dispatch(deleteTag({ tagId: currentTag?.id ?? "" }));
    setIsDeleteDialogOpen(false);
    setCurrentTag(null);
  };

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Tags Management</h1>

      <DataTable
        columns={columns}
        data={tags ?? []}
        searchableColumns={searchableColumns}
        onDelete={handleDelete}
        onCreate={handleCreate}
      />

      {/* Create Dialog */}
      <InsertTag
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
        handleFormSubmit={handleFormSubmit}
        data={data}
      />

      {/* Edit Dialog */}
      <EditTag
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        handleFormSubmit={handleFormSubmit}
        currentTag={currentTag}
      />

      {/* Delete Dialog */}
      <DeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        handleConfirmDelete={handleConfirmDelete}
        currentTag={currentTag!}
      />
    </div>
  );
}
