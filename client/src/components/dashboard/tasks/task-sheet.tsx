import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit2, Trash2, CalendarDays, User, Tag } from "lucide-react";

export function TaskSheet({ open, onClose, task }: any) {
  if (!task) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md p-0">
        {/* HEADER */}
        <div className="p-6 border-b">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between gap-2 text-xl font-semibold">
              {task.title}
              <Badge
                className={
                  task.priority === "critical"
                    ? "bg-red-100 text-red-700"
                    : task.priority === "high"
                    ? "bg-orange-100 text-orange-700"
                    : task.priority === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }
              >
                {task.priority}
              </Badge>
            </SheetTitle>
          </SheetHeader>

          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {task.description}
          </p>
        </div>

        {/* DETAILS */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Status */}
          <div>
            <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              Status
            </h3>
            <Badge
              className={
                task.status === "done"
                  ? "bg-green-100 text-green-700"
                  : task.status === "in-progress"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }
            >
              {task.status === "in-progress" ? "In Progress" : task.status}
            </Badge>
          </div>

          <Separator />

          {/* Due Date */}
          <div>
            <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-muted-foreground" />
              Due Date
            </h3>
            <p className="text-sm">
              {new Date(task.dueDate).toLocaleDateString()}
            </p>
          </div>

          <Separator />

          {/* Assigned */}
          <div>
            <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              Assigned To
            </h3>
            <p className="text-sm">{task.assigned.join(", ")}</p>
          </div>

          <Separator />

          {/* Description Section */}
          <div>
            <h3 className="text-sm font-medium mb-2">Detailed Description</h3>
            <div className="rounded-md border p-3 bg-muted/20 text-sm leading-relaxed">
              {task.description}
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <SheetFooter className="border-t mt-4 p-4 flex justify-between">
          <Button variant="ghost" className="flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>

          <Button variant="destructive" className="flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>

          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
