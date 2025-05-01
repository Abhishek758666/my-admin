"use client";

import type React from "react";

import type { Table } from "@tanstack/react-table";
import { CrossIcon, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: {
    id: string;
    title: string;
    options: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
  }[];
  searchableColumns?: {
    id: string;
    title: string;
  }[];
  onDelete?: () => void;
  onCreate?: () => void;
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
  onCreate,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const hasSearchableColumns = searchableColumns.length > 0;
  const hasFilterableColumns = filterableColumns.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {hasSearchableColumns && (
          <Input
            placeholder="Search..."
            value={
              (table
                .getColumn(searchableColumns[0]?.id)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(searchableColumns[0]?.id)
                ?.setFilterValue(event.target.value)
            }
            className="h-9 w-[150px] lg:w-[250px]"
          />
        )}
        {hasFilterableColumns && (
          <div className="flex items-center space-x-2">
            {filterableColumns.map((column) => {
              return table.getColumn(column.id) ? (
                <DataTableFacetedFilter
                  key={column.id}
                  column={table.getColumn(column.id)}
                  title={column.title}
                  options={column.options}
                />
              ) : null;
            })}
            {isFiltered && (
              <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="h-9 px-2 lg:px-3"
              >
                Reset
                <CrossIcon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {onCreate && (
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={onCreate}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New
          </Button>
        )}

        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
