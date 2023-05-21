import { GuessItem } from "@/types/home";
import { PageParams, PageResult } from "@/types/global";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { showToast } from "@tarojs/taro";
import { View, Navigator, Image, Text } from "@tarojs/components";
import { getGuessLike } from "@/api/modules/home";

import "./XtxGuess.scss";

export interface GuessExpose {
  getMore: () => Promise<void>;
  reset: () => void;
}
// 分页参数
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
};
const XtxGuess = forwardRef((_, ref) => {
  // 猜你喜欢列表
  const [guessList, setGuessList] = useState<GuessItem[]>([]);
  // 结束标识
  const [finish, setFinish] = useState(false);

  let [result, setResult] = useState<PageResult<GuessItem>>({
    items: [],
    counts: -1,
    page: -1,
    pages: -1,
    pageSize: -1,
  });

  // 获取猜你喜欢列表
  const getHomeGoodsGuessLikeData = async () => {
    if (finish) {
      return;
    }
    if (pageParams.page >= result.pages) {
      setFinish(true);
      showToast({
        title: "没有更多了~",
        icon: "none",
        duration: 2000,
      });
      return;
    } else {
      pageParams.page++;
      const result = await getGuessLike(pageParams);
      console.log("result: ", pageParams, result);
      setResult(result);

      setGuessList([...guessList, ...result.items]);
    }
  };

  // 组件挂载完毕
  useEffect(() => {
    async function fetchData() {
      const result = await getGuessLike(pageParams);
      setResult(result);
      setGuessList([...guessList, ...result.items]);
    }
    fetchData();
  }, []);

  // 重置数据
  const resetData = () => {
    pageParams.page = 1;
    setFinish(false);
    setGuessList([]);
  };

  // 暴露方法 - 通过 ref 调用
  useImperativeHandle(ref, () => ({
    getMore: getHomeGoodsGuessLikeData,
    reset: resetData,
  }));
  return (
    <>
      <View className="caption">
        <Text className="Text">猜你喜欢</Text>
      </View>

      <View className="guess">
        {guessList.map((item) => (
          <Navigator
            key={item.id}
            className="guess-item"
            hover-className="none"
            url={`/pages/goods/godds`}
          >
            <Image
              src={item.picture}
              mode="aspectFill"
              className="Image"
            ></Image>
            <View className="name">{item.name}</View>
            <View className="price">
              <Text className="small">¥</Text>
              {item.price}
            </View>
          </Navigator>
        ))}
      </View>
      <View className="loading-Text">
        {finish ? "没有更多了~" : "加载中..."}
      </View>
    </>
  );
});
export default XtxGuess;
