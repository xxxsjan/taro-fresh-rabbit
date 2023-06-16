import { useContext, createContext } from "react";

type DataType = {
  profile?: any;
  isLogin: boolean;
};

export const UserContext = createContext<{ data: DataType; setData: any }>({
  data: { isLogin: false },
  setData: undefined,
});

export function useUserContext() {
  const context = useContext(UserContext);
  return context;
}
