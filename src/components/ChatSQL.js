import { useEffect, useRef, useState } from "react";
let cont = 0; //!this is for testing
const queries = [
  "SELECT column1, column2, column3 FROM my_table;",
  "SELECT DISTINCT column1 FROM my_table;",
  "SELECT * FROM my_table WHERE column1 = 'value';",
  "SELECT t1.column1, t2.column2 FROM table1 t1 JOIN table2 t2 ON t1.column3 = t2.column4;",
]; //  !this is for testing
const ChatSQL = () => {
  const chatContainerRef = useRef(null);

  const [chatHistory, setChatHistory] = useState([
    { text: `Hello what can i help you with?`, isUser: false },
    { text: "want to get all users from users table", isUser: true },
    { text: "SELECT * FROM users;", isUser: false },
  ]);

  const [userInput, setUserInput] = useState("");
  const addMsg = (e) => {
    e.preventDefault();
    console.log(userInput);
    setChatHistory([
      ...chatHistory,
      { text: userInput, isUser: true },
      { text: queries[cont], isUser: false },
    ]);
    setUserInput("");
    cont += 1;
    console.log(cont);
  };
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatHistory]);

  return (
    <div className="mt-10">
      <div ref={chatContainerRef} className="h-[350px] overflow-y-auto">
        {chatHistory.map((chat, key) => (
          <div
            key={key}
            className={`chat ${chat.isUser ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="xd"
                  src={
                    chat.isUser
                      ? "https://w7.pngwing.com/pngs/529/832/png-transparent-computer-icons-avatar-user-profile-avatar.png"
                      : "https://cdn0.iconfinder.com/data/icons/robot-avatar/512/Robot_Avatars_1-512.png"
                  }
                />
              </div>
            </div>
            {/* <div className="chat-header">
                {chat.isUser ? "User Name" : "SQL bot"}
                <time className="text-xs opacity-50">12:45</time>
              </div> */}
            <div className="chat-bubble">
              {chat.text}
              {/* <span className="text-white"> test</span> */}
            </div>
            {/* <div className="chat-footer opacity-50">Delivered</div> */}
          </div>
        ))}
      </div>

      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0 mt-10">
        <form onSubmit={(e) => addMsg(e)}>
          <div className="relative flex">
            <input
              type="text"
              name="input-user"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Write your message!"
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3"
            />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button
                type="submit"
                // onClick={addMsg}
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              >
                <span className="font-bold">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatSQL;
