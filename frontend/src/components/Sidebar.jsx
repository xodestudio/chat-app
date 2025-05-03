import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Filter by online status
  const filteredByStatus = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  // Filter by search query
  const filteredUsers = filteredByStatus.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black border-r border-gray-200 dark:border-gray-800 transition-all duration-300 shadow-lg">
      {/* Search Bar Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-primary dark:focus:border-primary focus:ring-0 outline-none placeholder:text-gray-500 dark:placeholder:text-gray-500 transition"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={16}
          />
        </div>
      </div>

      {/* Online Only Toggle */}
      <div className="px-4 py-3 hidden lg:flex items-center justify-between bg-gray-50 dark:bg-gray-800/40">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors">
            Show online only
          </span>
        </label>
        <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          {onlineUsers.length - 1} online
        </span>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full flex items-center gap-3 p-3 transition-all duration-200
                ${
                  selectedUser?._id === user._id
                    ? "bg-gradient-to-r from-primary/20 to-secondary/10 dark:from-primary/40 dark:to-secondary/20 ring-1 ring-inset ring-gray-300 dark:ring-gray-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800/60"
                }
              `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm transition-transform transform hover:scale-105"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></span>
                )}
              </div>

              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate text-gray-800 dark:text-gray-100">
                  {user.fullName}
                </div>
                <div
                  className={`text-sm ${
                    onlineUsers.includes(user._id)
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                >
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-500 py-8">
            {searchQuery ? "No results found" : "No users found"}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
