import React from "react";
import ChatBotEl from "../components/ChatBotEl";
import NavBFarmer from "../extras/NavBFarmer";
import Sidebar from "../components/Sidebar";

function ChatBotPage() {
  return (
    <div>
      <NavBFarmer />
      <Sidebar />
      <ChatBotEl />
    </div>
  );
}

export default ChatBotPage;
