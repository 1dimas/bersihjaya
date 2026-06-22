import { ShieldCheck, Leaf, Users, Receipt, LucideIcon } from "lucide-react";
import { valueProps as defaultValueProps } from "@/lib/site-config";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  Users,
  Leaf,
  ShieldCheck,
  Receipt,
};

interface ValuePropItem {
  iconName: string;
  title: string;
  description: string;
}

interface ValuePropsProps {
  valueProps?: readonly ValuePropItem[];
}

export default function ValueProps({ valueProps = defaultValueProps }: ValuePropsProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Kenapa pilih kami"
          title="Bersih yang bisa Anda percaya"
          align="center"
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map(({ iconName, title, description }) => {
            const Icon = iconMap[iconName] || ShieldCheck;
            return (
              <div
                key={title}
                className="rounded-2xl border border-line bg-paper p-6 hover:border-pine-400 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pine-50 text-pine-600 mb-4">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-lg text-ink">{title}</h3>
                <p className="mt-2 text-ink/70 leading-relaxed">{description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

