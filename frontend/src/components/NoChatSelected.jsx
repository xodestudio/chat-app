import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 transition-all duration-500">
      {/* Icon */}
      <div className="relative group mb-8">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-transform duration-500"></div>
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-xl transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 animate-bounce-slow">
          <MessageSquare className="w-10 h-10" />
        </div>
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-6xl font-extrabold text-center tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
        Welcome to Chatty!
      </h1>

      {/* Subtitle */}
      <p className="text-lg sm:text-xl text-base-content/70 dark:text-gray-300 text-center max-w-xl leading-relaxed px-4">
        Select a conversation from the sidebar or start a new chat.
      </p>
    </div>
  );
};

export default NoChatSelected;
