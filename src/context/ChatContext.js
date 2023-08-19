import React, { createContext } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/service";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = React.useState(null);
  const [isChatLoading, setIsChatLoading] = React.useState(false);
  const [chatError, setChatError] = React.useState(null);
  const [potentialChats, setPotentialChats] = React.useState([]);
  const [currentChat, setCurrentChat] = React.useState(null);
  const [mess, setMess] = React.useState(null);
  const [isMessLoading, setIsMessLoading] = React.useState(false);
  const [messError, setMessError] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [newMessage, setNewMessage] = React.useState(null);
  const [onlineUsers, setOnlineUsers] = React.useState([]);

  const [socket, setSocket] = React.useState(null);
  // const []

  React.useEffect(() => {
    if (user) {
      const newSocket = io("http://localhost:3033");
      setSocket(newSocket);
      return () => {
        newSocket?.disconnect();
      };
    }
  }, [user]);

  React.useEffect(() => {
    if (socket === null) return;

    if (user) {
      socket?.emit("addNewUser", user?._id);
      socket?.on("getOnlienUsers", (res) => {
        setOnlineUsers(res);
      });
    }
  }, [socket, user]);

  // send mess
  React.useEffect(() => {
    if (socket === null) return;
    const recipientId = currentChat?.member.find((id) => id !== user?._id);
    socket.emit("sendMess", { data: newMessage, recipientId });
  }, [user, socket, newMessage, currentChat?.member]);

  //receive messages
  React.useEffect(() => {
    if (socket === null) return;
    socket?.on("getMess", (res) => {
      console.log(res);
      res && setMess((prev) => [...prev, res]);
      if (currentChat?._id !== res?.chatId) return;
    });

    return () => {
      socket.off("getMess");
    };
  }, [currentChat, socket]);

  React.useEffect(() => {
    const getUser = async () => {
      const res = await getRequest(`${baseUrl}/api/users`);

      if (res.error) {
        return console.log("Error fetching user", res);
      }

      const pCharts = res?.filter((u) => {
        let isChatCreated = false;
        if (user?._id === u?._id) return false;
        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.member[0] === u?._id || chat.member[1] === u?._id;
          });
        }
        return !isChatCreated;
      });
      setPotentialChats(pCharts?.filter((i) => i?._id !== user?._id));
    };
    getUser();
  }, [user]);

  const updateCurrentUser = React.useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  React.useEffect(() => {
    const getUserChat = async () => {
      if (user?._id) {
        setIsChatLoading(true);
        setChatError(null);
        const res = await getRequest(`${baseUrl}/api/chats/${user._id}`);
        setIsChatLoading(false);
        if (res?.error) return setChatError(res);
        setUserChats(res);
      }
    };
    getUserChat();
  }, [user]);

  React.useEffect(() => {
    const getMess = async () => {
      setIsMessLoading(true);
      setMessError(null);
      let res;
      if (!currentChat?._id) {
        return null;
      } else {
        res = await getRequest(`${baseUrl}/api/mess/${currentChat?._id}`);
        setIsMessLoading(false);
        if (res?.error) return setMessError(res);
        setMess(res);
      }
    };
    getMess();
  }, [currentChat]);

  const createChat = React.useCallback(async (firstId, secondId) => {
    const res = await postRequest(
      `${baseUrl}/api/chats`,
      JSON.stringify({ firstId, secondId })
    );

    if (res.error) {
      return console.log("error creating chat", res);
    }
    setUserChats((prev) => [...prev, res]);
  }, []);

  const handleSendChat = React.useCallback(
    async (textMess, sender, currentChatId, setTextMess) => {
      if (!textMess) return console.log("you must tyoe somrthing....");

      const res = await postRequest(
        `${baseUrl}/api/mess`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender?._id,
          text: textMess,
        })
      );

      if (res.error) {
        return setError(res);
      }

      setNewMessage(res);
      setMess((prev) => [...prev, res]);
      setTextMess("");
    },
    []
  );

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isChatLoading,
        chatError,
        potentialChats,
        createChat,
        updateCurrentUser,
        mess,
        isMessLoading,
        messError,
        currentChat,
        error,
        newMessage,
        handleSendChat,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
