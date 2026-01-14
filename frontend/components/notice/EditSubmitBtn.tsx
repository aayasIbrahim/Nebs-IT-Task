import { useFormStatus } from "react-dom";
import { CheckCircle2 } from "lucide-react";
export function EditSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:flex-1 h-16 bg-yellow-500 text-white rounded-2xl font-bold text-[12px] uppercase tracking-[0.2em] hover:bg-[#FF5722] transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200 active:scale-[0.98] disabled:bg-slate-400 disabled:cursor-wait"
    >
      {pending ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Synchronizing...</span>
        </>
      ) : (
        <>
          <CheckCircle2 size={18} />
          <span>Push Updates to Notice</span>
        </>
      )}
    </button>
  );
}
