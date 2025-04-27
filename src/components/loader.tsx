import { cn } from "@/lib/utils";

export const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

export default function Loader() {
  return (
    <div className="bg-[#00000089] flex justify-center items-center w-full h-screen fixed top-0 left-0 z-50">
      <LoadingSpinner />
    </div>
  );
}
