"use client";

import { useEffect, useState } from "react";

import Timeline from "./Timeline";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

type TimelineLists = {
  id: string;
  title: string;
  date: Date;
  description: string;
};

const TimelineLists = () => {
  const [data, setData] = useState<TimelineLists[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(true);

  useEffect(() => {
    setisLoading(false);
    fetchData();
  }, [data]);

  const fetchData = () => {
    try {
      axios.get("/api/timeline").then((res) => setData(res.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <Skeleton className="w-full h-14" />
        <Skeleton className="w-full h-14" />
        <Skeleton className="w-full h-14" />
        <Skeleton className="w-full h-14" />
        <Skeleton className="w-full h-14" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-evenly gap-4 w-full">
      {data?.map((timeline, index) => {
        return (
          <Timeline
            key={index}
            id={timeline.id}
            title={timeline.title}
            date={timeline.date}
            description={timeline.description}
          />
        );
      })}
    </div>
  );
};

export default TimelineLists;
