"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TimelineForm from "./TimelineForm";

type TimelineProps = {
  id: string;
  title: string;
  date: Date;
  description: string;
};

const Timeline = ({ id, title, description, date }: TimelineProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "flex items-center justify-center w-full p-6",
            isOpen && "border-b-0 bg-accent rounded-bl-none rounded-br-none"
          )}
        >
          <h3 className="text-sm truncate text-left">{title}</h3>
          <p className="font-normal text-xs ml-auto">{format(date, "PP")}</p>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="border-2 border-t-0 p-6 rounded-bl-lg rounded-br-lg">
        <div className="grid grid-cols-10">
          <p className="text-sm text-left col-span-9 pr-1">{description}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Edit className="cursor-pointer ml-auto mt-auto bg-slate-200 rounded-xl bottom-2 right-2 text-green-500 p-2 w-8 h-8 md:w-10 md:h-10" />
            </DialogTrigger>
            <DialogContent>
              <TimelineForm
                formTitle="Add new Timeline"
                id={id}
                title={title}
                description={description}
                date={date}
                formButtonLabel="Edit"
              />
            </DialogContent>
          </Dialog>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Timeline;
