// "use client";

// import { useEffect, useState } from "react";

// import { Skeleton } from "@/components/ui/skeleton";

// type EditorProps = {
//   value: string | undefined;
//   onChange: (value: string) => void;
// };

// const Editor = ({ value, onChange }: EditorProps) => {
//   const [mounted, setMounted] = useState<boolean>(false);
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return <Skeleton className="w-full" />;
//   }

//   return (
//     <ReactQuill {...field} theme="snow" value={value} onChange={onChange} />
//   );
// };

// export default Editor;
