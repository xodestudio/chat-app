import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen w-screen bg-base-100 overflow-hidden flex flex-col">
      {/* Spacer for ChatHeader (approx height: 3.5rem) */}
      <div className="shrink-0 h-16"></div>

      {/* Main Content Area (Sidebar + Chat) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="shrink-0">
          <Sidebar />
        </div>

        {/* Chat Content */}
        <div className="flex-1 flex flex-col bg-base-100 overflow-hidden">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
