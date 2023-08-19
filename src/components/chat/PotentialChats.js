import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

  console.log(onlineUsers);
  return (
    <div className="all-users">
      {potentialChats &&
        potentialChats?.map((u, idx) => {
          console.log(onlineUsers?.map((user) => user));
          console.log(onlineUsers);
          return (
            <div
              className="single-user"
              key={idx}
              onClick={() => createChat(user?._id, u?._id)}
            >
              {u?.name}
              <span
                className={
                  onlineUsers?.some((user) => user?.userId === u?._id)
                    ? "user-online"
                    : ""
                }
              ></span>
            </div>
          );
        })}
    </div>
  );
};

export default PotentialChats;
