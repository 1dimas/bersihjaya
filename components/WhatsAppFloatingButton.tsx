import { buildWhatsAppLink, whatsappMessageForService } from "@/lib/whatsapp";

interface WhatsAppFloatingButtonProps {
  whatsappNumber?: string;
  businessName?: string;
}

export default function WhatsAppFloatingButton({
  whatsappNumber,
  businessName,
}: WhatsAppFloatingButtonProps) {
  const message = whatsappMessageForService(businessName);
  return (
    <a
      href={buildWhatsAppLink(whatsappNumber, message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat dengan kami di WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-pine-600 text-paper pl-4 pr-5 py-4 shadow-lg shadow-pine-700/30 hover:bg-pine-700 transition-colors duration-150 min-h-[3.25rem]"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0" aria-hidden="true">
        <path d="M17.6 14.06c-.29-.15-1.7-.84-1.96-.93-.27-.1-.46-.15-.65.15-.2.29-.76.93-.93 1.12-.17.2-.34.22-.63.07-1.71-.85-2.83-1.52-3.96-3.44-.3-.52.3-.48.86-1.6.1-.2.05-.37-.05-.52-.1-.15-.6-1.45-.82-1.93-.22-.46-.44-.4-.6-.41h-.51c-.17 0-.46.07-.7.32-.25.27-.95.93-.95 2.27 0 1.34.97 2.63 1.1 2.81.15.17 1.94 2.97 4.7 4.05 2.32.92 2.79.74 3.3.69.5-.05 1.6-.65 1.83-1.29.22-.63.22-1.17.15-1.29-.07-.12-.27-.2-.57-.34Z" />
        <path d="M12.04 2C6.58 2 2.13 6.41 2.13 11.83c0 1.95.57 3.76 1.55 5.3L2 22l5.05-1.61a9.9 9.9 0 0 0 4.99 1.34h.01c5.46 0 9.91-4.41 9.91-9.83C21.97 6.49 17.5 2 12.04 2Zm0 17.9h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3 .95.97-2.93-.2-.31a8.06 8.06 0 0 1-1.29-4.45c0-4.5 3.66-8.17 8.16-8.17 2.18 0 4.22.85 5.76 2.39a8.1 8.1 0 0 1 2.39 5.78c0 4.5-3.66 8.07-8.3 8.07Z" />
      </svg>
      <span className="hidden sm:inline font-display font-semibold">Chat WhatsApp</span>
    </a>
  );
}

