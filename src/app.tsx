import { PropsWithChildren, useReducer, createContext, useState } from "react";
import { useLaunch } from "@tarojs/taro";
import "./app.scss";
import { UserContext } from "./store/user";

function App({ children }: PropsWithChildren<{}>) {
  useLaunch(() => {
    console.log("App launched.");
  });
  const [state, setState] = useState({
    isLogin: false,
  });
  // children 是将要会渲染的页面
  return (
    <UserContext.Provider value={{ data: state, setData: setState }}>
      {children}
    </UserContext.Provider>
  );
}

export default App;
