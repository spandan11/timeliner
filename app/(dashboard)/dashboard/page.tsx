import dynamic from "next/dynamic";

const TimelineForm = dynamic(
  () => import("@/components/dashboard/TimelineForm"),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TimelineLists from "@/components/dashboard/TimelineLists";

type DashboardProps = {};

const Dashboard = ({}: DashboardProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full pb-8">
      <div className="flex items-center justify-between gap-4 w-full">
        <h2 className="text-xl md:text-3xl font-semibold">Recent Timelines</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"lg"} className="p-4 gap-2">
              <Plus className="h-4 w-4" />
              Add Timeline
            </Button>
          </DialogTrigger>
          <DialogContent>
            <TimelineForm formTitle="Add new Timeline" formButtonLabel="Add" />
          </DialogContent>
        </Dialog>
      </div>
      <TimelineLists />
    </div>
  );
};

export default Dashboard;
