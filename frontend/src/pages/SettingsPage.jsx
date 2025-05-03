import { User2, Lock, Bell, LogOut, ArrowRight } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center">
      {/* Cover Photo */}
      <div className="relative w-full h-40 bg-gradient-to-r from-indigo-500 to-purple-500">
        {/* Profile Photo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-40px]">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Spacer under profile */}
      <div className="mt-16 w-full px-4 max-w-md">
        {/* Buttons */}
        <div className="space-y-4">
          <SettingButton icon={<User2 />} label="Edit Profile" />
          <SettingButton icon={<Lock />} label="Privacy & Security" />
          <SettingButton icon={<Bell />} label="Notifications" />
          <SettingButton icon={<LogOut />} label="Logout" />
        </div>
      </div>
    </div>
  );
};

const SettingButton = ({ icon, label }) => {
  return (
    <button className="w-full bg-white rounded-xl flex items-center justify-between p-4 shadow hover:bg-base-100 transition duration-200">
      <div className="flex items-center space-x-3">
        <span className="text-indigo-500">{icon}</span>
        <span className="font-medium text-base-content">{label}</span>
      </div>
      <ArrowRight className="text-base-content" />
    </button>
  );
};

export default SettingsPage;
