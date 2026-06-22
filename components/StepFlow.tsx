import { bookingSteps as defaultBookingSteps } from "@/lib/site-config";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

interface BookingStepItem {
  title: string;
  description: string;
}

interface StepFlowProps {
  bookingSteps?: readonly BookingStepItem[];
}

export default function StepFlow({ bookingSteps = defaultBookingSteps }: StepFlowProps) {
  return (
    <section className="py-16 sm:py-20 bg-mist border-y border-line">
      <Container>
        <SectionHeading eyebrow="Cara pesan" title="Empat langkah, selesai" align="center" />

        <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bookingSteps.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-2xl bg-paper border border-line p-6 pt-8"
            >
              <span className="font-mono text-3xl font-bold text-pine-100 absolute top-4 right-5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display font-semibold text-lg text-ink relative z-10">
                {step.title}
              </h3>
              <p className="mt-2 text-ink/70 leading-relaxed relative z-10">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

