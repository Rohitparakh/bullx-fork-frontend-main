import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowUpDown } from "lucide-react";
import { FaFilter } from "react-icons/fa";

export function SortedHeader({
  children,
  column,
  filter = true,
  filterInputType,
  customFilter,
}: {
  children: React.ReactNode;
  column: any;
  filter?: boolean;
  filterInputType?: string;
  customFilter?: React.ReactNode;
}) {
  return (
    <span className="flex gap-1 py-2 items-center">
      {children}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!h-6 !w-6 ml-2"
      >
        <ArrowUpDown className="h-4 w-4" />
      </Button>
      {filter && (
        <Popover>
          <PopoverTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-ton-blue-800 dark:hover:text-ton-blue-200 h-6 w-6">
            <FaFilter />
          </PopoverTrigger>
          <PopoverContent className="min-w-72 !w-fit">
            {customFilter ?? (filterInputType === "number" ? (
              <div className="flex flex-col gap-2">
                Filter {children} within range:
			<div className="flex gap-2">
                <Input
                  className="!bg-background/40 glass"
                  value={
                      (((column?.getFilterValue() as [number, number] | undefined) as [number, number]) ?? [null, null])[0]
		  }
                  onChange={(e) => {
                    let data: [number, number] = (column.getFilterValue() as [
                      number,
                      number,
                    ]) ?? [-Infinity, Infinity];
                    data[0] = parseFloat(e.target.value.trim());
                    column.setFilterValue(data);
                  }}
                  placeholder="Minimum"
                  type={filterInputType}
                />
                <Input
                  className="!bg-background/40 glass"
                  value={
                      (((column?.getFilterValue() as [number, number] | undefined) as [number, number]) ?? [null, null])[1]
		  }
                  onChange={(e) => {
                    let data: [number, number] = (column.getFilterValue() as [
                      number,
                      number,
                    ]) ?? [-Infinity, Infinity];
                    data[1] = parseFloat(e.target.value.trim());
                    column.setFilterValue(data);
                  }}
                  placeholder="Maximum"
                  type={filterInputType}
                />
              </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                Filter {children}:
                <Input
                  className="!bg-background/40 glass"
                  value={(column?.getFilterValue() as string) ?? ""}
                  onChange={(e) => {
                    column.setFilterValue(e.target.value);
                  }}
                  type={filterInputType}
                />
              </div>
            ))}
          </PopoverContent>
        </Popover>
      )}
    </span>
  );
}
