"use client";

import { useToggle } from "@/hooks/useToggle";

const AddTimeline: React.FC = () => {
  const { isOpen, toggle } = useToggle();
  return (
    <div className="text-3xl">
      <p>State: {isOpen ? "Toggled On" : "Toggled Off"}</p>
      <button onClick={toggle}>Add Timeline</button>
    </div>
  );
};

export default AddTimeline;
