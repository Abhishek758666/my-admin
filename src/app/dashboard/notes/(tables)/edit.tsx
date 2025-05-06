import React, { Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  tagSchema,
  TTagResponseSchema,
  TTagSchema,
} from "@/schemas/tag.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

interface EditBlogProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleFormSubmit: (e: React.FormEvent) => void;
  currentTag: TTagResponseSchema | null;
}

const EditTag = (props: EditBlogProps) => {
  const form = useForm<TTagSchema>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      title: props.currentTag?.title || "",
    },
  });

  return (
    <Dialog
      open={props.isEditDialogOpen}
      onOpenChange={props.setIsEditDialogOpen}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Tag</DialogTitle>
          <DialogDescription>Edit tag below</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={props.handleFormSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <Label htmlFor="id" className="text-right">
                Tag Title
              </Label>
              <Input
                id="title"
                name="title"
                defaultValue={props.currentTag?.title}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTag;
