import { useState } from "react";
import ChatbotApp from "./Chatbot";
import { MessageCircle } from "lucide-react";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-sky-500 hover:bg-sky-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center"
      >
        <MessageCircle size={26} />
      </button>

      {/* Chatbot Popup */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 transition-all duration-300">
          <ChatbotApp onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
