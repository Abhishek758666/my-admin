import React, { Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Order } from ".";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogSchema, TBlogSchema } from "@/schemas/blog.schema";
import TiptapEditor from "@/components/tiptap-editor";

interface InsertBlogProps {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleFormSubmit: (e: React.FormEvent) => void;
  data: Order[];
}

const InsertBlog = (props: InsertBlogProps) => {
  const form = useForm<TBlogSchema>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      heroImage: "",
      tags: [],
      description: "",
    },
  });

  return (
    <div>
      <Dialog
        open={props.isCreateDialogOpen}
        onOpenChange={props.setIsCreateDialogOpen}
      >
        <DialogContent className="sm:max-w-[1200px]">
          <DialogHeader>
            <DialogTitle>Create New Blog</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={props.handleFormSubmit}
              className="w-full grid grid-cols-[1fr_2fr] gap-6"
            >
              <div className="space-y-6 w-full">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Title</FormLabel>
                      <FormControl>
                        <Input placeholder="eg. hooks in motion" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg. Hooks in motion (framer motion) are ...."
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg. Hooks in motion (framer motion) are ...."
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-6 flex flex-col w-full">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <TiptapEditor
                          content={field.value}
                          onUpdate={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InsertBlog;
