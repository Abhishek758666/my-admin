"use client";

import type React from "react";

import { Dispatch, SetStateAction, useState } from "react";
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

import {
  CircleCheck,
  CircleDashed,
  CircleX,
  CreditCard,
  Package,
  User,
} from "lucide-react";
import { toast } from "sonner";
import InsertBlog from "./insert";
import EditBlog from "./edit";

// Define the data type
export interface Order {
  id: string;
  customer: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  product: string;
  amount: number;
  paymentMethod: "credit_card" | "paypal" | "bank_transfer";
  date: string;
}

// Sample data
const initialData: Order[] = Array.from({ length: 50 }, (_, index) => ({
  id: `ORD-${(index + 1).toString().padStart(3, "0")}`,
  customer: `Customer ${index + 1}`,
  status: ["pending", "processing", "completed", "cancelled"][
    Math.floor(Math.random() * 4)
  ] as "pending" | "processing" | "completed" | "cancelled",
  product: `Product ${index + 1}`,
  amount: parseFloat((Math.random() * 500).toFixed(2)),
  paymentMethod: ["credit_card", "paypal", "bank_transfer"][
    Math.floor(Math.random() * 3)
  ] as "credit_card" | "paypal" | "bank_transfer",
  date: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
    .toISOString()
    .split("T")[0],
}));

interface DeleteDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleConfirmDelete: () => void;
  currentOrder: Order;
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
            {`Are you sure you want to delete order ${props.currentOrder?.id}?`}
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

export default function BlogDataTable() {
  const [data, setData] = useState<Order[]>(initialData);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [selectedRows, setSelectedRows] = useState<Order[]>([]);

  // Define base columns
  const baseColumns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "customer",
      header: "Customer",
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div className="flex items-center">
            {status === "completed" && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <CircleCheck className="mr-1 h-3 w-3" />
                Completed
              </Badge>
            )}
            {status === "processing" && (
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                <CircleDashed className="mr-1 h-3 w-3" />
                Processing
              </Badge>
            )}
            {status === "pending" && (
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                <CircleDashed className="mr-1 h-3 w-3" />
                Pending
              </Badge>
            )}
            {status === "cancelled" && (
              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                <CircleX className="mr-1 h-3 w-3" />
                Cancelled
              </Badge>
            )}
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "product",
      header: "Product",
      enableSorting: true,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      enableSorting: true,
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment Method",
      enableSorting: true,
      cell: ({ row }) => {
        const paymentMethod = row.getValue("paymentMethod") as string;
        return (
          <div className="flex items-center">
            {paymentMethod === "credit_card" && (
              <div className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Credit Card
              </div>
            )}
            {paymentMethod === "paypal" && (
              <div className="flex items-center">
                <Package className="mr-2 h-4 w-4" />
                PayPal
              </div>
            )}
            {paymentMethod === "bank_transfer" && (
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Bank Transfer
              </div>
            )}
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      enableSorting: true,
    },
  ];

  // Create columns with selection and actions
  const columns = createColumns<Order>(
    baseColumns,
    (row) => {
      setCurrentOrder(row);
      setIsEditDialogOpen(true);
    },
    (row) => {
      setCurrentOrder(row);
      setIsDeleteDialogOpen(true);
    },
    false // Don't include selection checkboxes
  );

  // Define filterable columns
  const filterableColumns = [
    {
      id: "status",
      title: "Status",
      options: [
        { label: "Completed", value: "completed" },
        { label: "Processing", value: "processing" },
        { label: "Pending", value: "pending" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
    {
      id: "paymentMethod",
      title: "Payment Method",
      options: [
        { label: "Credit Card", value: "credit_card" },
        { label: "PayPal", value: "paypal" },
        { label: "Bank Transfer", value: "bank_transfer" },
      ],
    },
  ];

  // Define searchable columns
  const searchableColumns = [
    {
      id: "customer",
      title: "Customer",
    },
    {
      id: "product",
      title: "Product",
    },
  ];

  // Handle create
  const handleCreate = () => {
    setCurrentOrder(null);
    setIsCreateDialogOpen(true);
  };

  // Handle delete
  const handleDelete = (selectedRows: Order[]) => {
    setSelectedRows(selectedRows);
    setIsDeleteDialogOpen(true);
  };

  // Handle form submission for create/edit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const newOrder: Order = {
      id: formData.get("id") as string,
      customer: formData.get("customer") as string,
      status: formData.get("status") as
        | "pending"
        | "processing"
        | "completed"
        | "cancelled",
      product: formData.get("product") as string,
      amount: Number.parseFloat(formData.get("amount") as string),
      paymentMethod: formData.get("paymentMethod") as
        | "credit_card"
        | "paypal"
        | "bank_transfer",
      date: formData.get("date") as string,
    };

    if (currentOrder) {
      // Edit existing order
      setData(
        data.map((order) => (order.id === currentOrder.id ? newOrder : order))
      );
      toast("Order Updated", {
        description: `Order ${newOrder.id} has been updated successfully.`,
      });
      setIsEditDialogOpen(false);
    } else {
      // Create new order
      setData([...data, newOrder]);
      toast("Order Created", {
        description: `Order ${newOrder.id} has been created successfully.`,
      });
      setIsCreateDialogOpen(false);
    }
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (currentOrder) {
      // Delete single order
      setData(data.filter((order) => order.id !== currentOrder.id));
      toast("Order Deleted", {
        description: `Order ${currentOrder.id} has been deleted successfully.`,
      });
    } else if (selectedRows.length > 0) {
      // Delete multiple orders
      const selectedIds = selectedRows.map((row) => row.id);
      setData(data.filter((order) => !selectedIds.includes(order.id)));
      toast("Orders Deleted", {
        description: `${selectedRows.length} orders have been deleted successfully.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setCurrentOrder(null);
    setSelectedRows([]);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Orders Management</h1>

      <DataTable
        columns={columns}
        data={data}
        filterableColumns={filterableColumns}
        searchableColumns={searchableColumns}
        onDelete={handleDelete}
        onCreate={handleCreate}
      />

      {/* Create Dialog */}
      <InsertBlog
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
        handleFormSubmit={handleFormSubmit}
        data={data}
      />

      {/* Edit Dialog */}
      <EditBlog
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        handleFormSubmit={handleFormSubmit}
        currentOrder={currentOrder}
      />

      {/* Delete Dialog */}
      <DeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        handleConfirmDelete={handleConfirmDelete}
        currentOrder={currentOrder!}
      />
    </div>
  );
}
