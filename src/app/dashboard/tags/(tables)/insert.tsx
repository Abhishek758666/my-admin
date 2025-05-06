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

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  tagSchema,
  TTagResponseSchema,
  TTagSchema,
} from "@/schemas/tag.schema";
import { Label } from "@/components/ui/label";

interface InsertTagProps {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleFormSubmit: (e: React.FormEvent) => void;
  data: TTagResponseSchema[];
}

const InsertTag = (props: InsertTagProps) => {
  const form = useForm<TTagSchema>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      title: "",
    },
  });

  return (
    <Dialog
      open={props.isCreateDialogOpen}
      onOpenChange={props.setIsCreateDialogOpen}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Tag</DialogTitle>
          <DialogDescription>create tag below</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={props.handleFormSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <Label htmlFor="id" className="text-right">
                Tag Title
              </Label>
              <Input id="title" name="title" required />
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

export default InsertTag;
