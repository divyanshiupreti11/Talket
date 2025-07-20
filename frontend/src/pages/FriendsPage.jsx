import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { Loader2 } from "lucide-react";

export default function FriendsPage() {
  const {
    data: friends = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        <span className="ml-2 text-gray-300">Loading friends...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-4">
        Error fetching friends: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Friends</h2>
      {friends.length === 0 ? (
        <p className="text-center text-gray-400">You have no friends yet.</p>
      ) : (
        <ul className="space-y-4">
          {friends.map((friend) => (
            <li
              key={friend._id}
              className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition-all"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={friend.profilePic}
                  alt={friend.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-xl font-medium">{friend.fullName}</p>
                  <p className="text-sm text-gray-400">
                    Speaks: {friend.nativeLanguage} | Learning:{" "}
                    {friend.learningLanguage}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
