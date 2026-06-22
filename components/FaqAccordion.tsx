import { Plus } from "lucide-react";
import { FaqItem } from "@/lib/site-config";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line border border-line rounded-2xl bg-paper overflow-hidden">
      {items.map((item) => (
        <details key={item.question} className="group p-2">
          <summary className="flex items-center justify-between gap-4 px-4 sm:px-5 py-4 sm:py-5 rounded-xl hover:bg-mist">
            <span className="font-display font-medium text-lg text-ink">{item.question}</span>
            <Plus
              className="h-6 w-6 shrink-0 text-pine-600 transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="px-4 sm:px-5 pb-5 text-ink/75 leading-relaxed">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
