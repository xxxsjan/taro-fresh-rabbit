import { View, ScrollView } from "@tarojs/components";
import { useLoad, pxTransform, getSystemInfoSync } from "@tarojs/taro";

import XtxCarousel from "@/components/XtxCarousel";
import XtxGuess from "@/components/XtxGuess";

import "./index.scss";

import CategoryEntries from "./components/CategoryEntries/CategoryEntries";
import CustomNavbar from "./components/CustomNavbar/CustomNavbar";
import PageSkeleton from "./components/PageSkeleton/PageSkeleton";
import FreshPanel from "./components/FreshPanel/FreshPanel";
import HotPanel from "./components/HotPanel/HotPanel";
import { useData } from "./hooks/getData";

export default function Index() {
  const {
    guessRef,
    triggered,
    bannerList,
    categoryList,
    hotList,
    newList,
    handleRefresherrefresh,
    handleScrolltolower,
    loadData,
  } = useData();

  useLoad(() => {
    console.log("Page loaded.");
    loadData();
  });
  function getScrollHeight() {
    const { screenWidth, windowHeight } = getSystemInfoSync();

    return (750 / screenWidth) * windowHeight + "rpx";
  }
  const scrollStyle = {
    height: getScrollHeight(),
  };
  return (
    <View className="index">
      <CustomNavbar />
      <ScrollView
        className="scroll-view"
        scrollY
        enableBackToTop
        refresher-enabled
        showScrollbar
        enhanced
        lowerThreshold={150}
        refresherBackground="#f7f7f8"
        refresherTriggered={triggered}
        onRefresherRefresh={handleRefresherrefresh}
        onScrollToLower={handleScrolltolower}
        style={scrollStyle}
      >
        {/* <PageSkeleton /> */}
        {/* <!-- BUG: 设置高度用于解决H5端兼容问题 --> */}
        <XtxCarousel list={bannerList} />
        {/* <!-- 首页的分类展示 --> */}
        <CategoryEntries categoryList={categoryList} />
        {/* <!-- 推荐专区 --> */}
        <HotPanel hotList={hotList} />
        {/* <!-- 新鲜好物 --> */}
        <FreshPanel newList={newList} />
        {/* <!-- 猜你喜欢 --> */}
        <XtxGuess ref={guessRef} />
      </ScrollView>
    </View>
  );
}
