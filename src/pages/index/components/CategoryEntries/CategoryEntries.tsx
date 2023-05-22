import { View, Text, Image, Navigator, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState, useMemo } from "react";
import { CategoryItem } from "@/types/home";
import "./index.scss";

export default function CategoryEntries(props: {
  categoryList: CategoryItem[];
}) {
  const [currentLeft, setCurrentLeft] = useState<string>("");
  const [map, setMap] = useState(new Map());

  useEffect(() => {
    if (props.categoryList.length > 0) {
      console.log("props.categoryList.length : ", props.categoryList.length);
      const newMap = new Map();
      props.categoryList.forEach((item) => {
        if (newMap.has(item.page)) {
          newMap.set(item.page, [...newMap.get(item.page), item]);
        } else {
          newMap.set(item.page, [item]);
        }
      });
      setMap(newMap);
    }
  }, [props.categoryList]);
  /**
   * @description: navs容器的宽度 = map的key长度 * 100%
   * @return {*} %宽度
   */
  const navsWidth = useMemo(() => {
    // console.log("navsWidth", map.size * 100 + "%");
    return map.size * 100 + "%";
  }, [map]);

  /**
   * @description: 光标的宽度 = 100 / map的key长度的百分比
   * @return {*} %宽度
   */
  const cursorWidth = useMemo(() => {
    return 100 / map.size + "%";
  }, [map]);
  // 以 categoryList 的长度为基准，长度为 10 的倍数时， navs加1
  const navs = useMemo(() => {
    return Array(map.size).fill("");
  }, [map]);

  const handleScroll = (event) => {
    const { scrollLeft, scrollWidth } = event.detail;
    // scroll-bar移动的距离 = scrollLeft / scrollWidth * 100%
    setCurrentLeft(`${(scrollLeft / scrollWidth) * 100}%`);
  };

  return (
    <View className="category-entries">
      <ScrollView className="ScrollView" scrollX onScroll={handleScroll}>
        <View className="navs" style={{ width: navsWidth }}>
          {navs.map((_, i) => (
            <View key={i} className="navs-item">
              {map.get(i + 1).map((item) => (
                <Navigator
                  key={item.id}
                  url="/pages/goods/list/index"
                  className="navigator"
                  hover-className="none"
                >
                  <Image src={item.icon} className="icon" mode="aspectFill" />
                  <View className="title">{item.name}</View>
                </Navigator>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="scroll-bar">
        <View
          className="cursor"
          style={{ width: cursorWidth, left: currentLeft }}
        ></View>
      </View>
    </View>
  );
}
