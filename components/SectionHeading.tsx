export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : ""}>
      {eyebrow && (
        <p className="font-mono text-sm tracking-widest uppercase text-pine-600 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-ink/70 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
