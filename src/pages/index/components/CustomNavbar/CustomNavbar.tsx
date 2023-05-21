import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import "./CustomNavbar.scss";

export default function CustomNavbar() {
  const [safeArea, setSafeArea] = useState({});
  useEffect(() => {
    function getSystemInfo() {
      const systemInfo = Taro.getSystemInfoSync();
      console.log("systemInfo: ", systemInfo);
      setSafeArea(systemInfo.safeArea || {});
    }
    getSystemInfo();
  }, []);
  return (
    <View className="navbar" style={{ paddingTop: `${safeArea.top}px` }}>
      <View className="logo">
        <Image
          className="logo-image"
          src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/logo.png"
        ></Image>
        <Text className="logo-text">新鲜 · 亲民 · 快捷</Text>
      </View>
      <View className="search">
        <Text className="icon-search">搜索商品</Text>
        <Text className="icon-scan"></Text>
      </View>
    </View>
  );
}
