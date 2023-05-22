import { Text, Navigator, Image, ScrollView, View } from "@tarojs/components";
import {
  getSystemInfoSync,
  useLoad,
  setNavigationBarTitle,
  
} from "@tarojs/taro";
import { useState, useMemo } from "react";
import XtxCarousel from "@/components/XtxCarousel";
import { BannerItem } from "@/types/home";
import { CategoryTopItem } from "@/types/category";
import { getHomeBanner } from "@/api/modules/home";
import { getCategoryList } from "@/api/modules/category";
import "./index.scss";

function Category() {
  // 轮播图数据
  const [bannerData, setBannerData] = useState<BannerItem[]>([]);
  // 一级分类数据
  const [categoryTopList, setCategoryTopList] = useState<CategoryTopItem[]>([]);
  // 高亮下标
  const [activeIndex, setActiveIndex] = useState(0);

  // 获取轮播图数据
  const getBannerList = async () => {
    const res = await getHomeBanner(2);
    setBannerData(res);
  };

  // 获取一级分类数据
  const getCategoryTopList = async () => {
    const res = await getCategoryList();
    console.log(res, "ellipsis");
    setCategoryTopList(res);
  };

  const categorySubList = useMemo(() => {
    return categoryTopList[activeIndex]?.children || [];
  }, [categoryTopList, activeIndex]);

  useLoad(() => {
    // setNavigationBarTitle({
    //   title: "分类",
    // });
    getBannerList();
    getCategoryTopList();
  });
  return (
    <View className="viewport">
      {/* <!-- 搜索框 --> */}
      <View className="search">
        <View className="input">
          <Text className="icon-search">篮球</Text>
        </View>
      </View>
      {/* <!-- 分类 --> */}
      <View className="categories">
        {/* <!-- 主分类（一级类目） --> */}
        <ScrollView scroll-y enhanced className="primary" showScrollbar={false}>
          {categoryTopList.map((item, index) => (
            <View
              key={item.id}
              className={`${activeIndex === index ? "item active" : "item"}`}
              onTap={() => setActiveIndex(index)}
            >
              {item.name}
            </View>
          ))}
        </ScrollView>
        {/* <!-- 二级类目 --> */}
        <ScrollView
          scroll-y
          enhanced
          className="secondary"
          showScrollbar={false}
        >
          {/* <!-- 轮播图 --> */}
          <XtxCarousel list={bannerData} className="carousel" />
          {/* <!-- 二级类目列表 --> */}
          {categorySubList.map((item) => (
            <View key={item.id} className="panel">
              <View className="title">
                {item.name}
                <Navigator
                  className="more"
                  hover-className="none"
                  url="/pages/goods/list"
                >
                  全部
                </Navigator>
              </View>
              <View className="section">
                {item.goods.map((good) => (
                  <Navigator
                    key={good.id}
                    hover-className="none"
                    className="navigator"
                    url={`/pages/goods/index?id=${good.id}`}
                  >
                    <Image src={good.picture} className="image"></Image>
                    <View className="name ellipsis">{good.name}</View>
                    <View className="price">
                      <Text className="symbol">¥</Text>
                      <Text className="number">{good.price}</Text>
                    </View>
                  </Navigator>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
Category.config = {
  navigationBarTitleText: "分类",
};
export default Category;
