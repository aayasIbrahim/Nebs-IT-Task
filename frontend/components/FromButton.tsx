import { useFormStatus } from "react-dom";
import { Check, Loader2 } from "lucide-react";

export function FormButtons() {
  
  const { pending } = useFormStatus();

  return (
    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3">
      <button
        type="button"
        disabled={pending}
        onClick={() => window.history.back()}
        className="px-8 py-3 rounded-full border border-slate-300 text-sm font-bold text-slate-500 hover:bg-slate-50 disabled:opacity-50 transition-all cursor-pointer"
      >
        Cancel
      </button>

      {/* Save as Draft Button */}
      <button
        type="submit"
        name="status"
        value="Draft"
        disabled={pending}
        className="px-8 py-3 rounded-full border border-blue-200 bg-blue-50 text-sm font-bold text-blue-500 hover:bg-blue-100 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer transition-all"
      >
        {pending ? "Saving..." : "Save as Draft"}
      </button>

      {/* Publish Button */}
      <button
        type="submit"
        name="status"
        value="Published"
        disabled={pending}
        className="px-8 py-3 rounded-full bg-[#FF5722] text-sm font-bold text-white shadow-lg shadow-orange-100 hover:bg-[#E64A19] flex items-center justify-center gap-2 disabled:bg-orange-400 min-w-[180px] cursor-pointer transition-all"
      >
        {pending ? (
          <>
            <Loader2 className="animate-spin" size={18} strokeWidth={3} />
            Publishing
          </>
        ) : (
          <>
            <Check size={18} strokeWidth={3} />
            Publish Notice
          </>
        )}
      </button>
    </div>
  );
}