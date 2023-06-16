import { Text, Navigator, Image, ScrollView, View } from "@tarojs/components";
import { getSystemInfoSync, useLoad } from "@tarojs/taro";
import { useState } from "react";

import "./index.scss";

export default function My() {
  const systemInfo = getSystemInfoSync();
  console.log("systemInfo: ", systemInfo);
  const safeAreaInsets = systemInfo.safeArea || {};
  const { windowHeight } = systemInfo;

  const profile = {
    avatar:
      "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/avatar/2023-02-24/f8130ca2-4d4d-43b8-a0b2-48881511c91f.jpeg",
    nickname: "ikun",
  };

  // const memberStore = useMemberStore();
  // const { isLogin, profile } = storeToRefs(memberStore);
  const isLogin = true;
  const tabs = ["我的收藏", "猜你喜欢", "我的足迹"];
  const orderTypes = [
    { text: "待付款", icon: "icon-currency", type: 1 },
    { text: "待发货", icon: "icon-gift", type: 2 },
    { text: "待收货", icon: "icon-check", type: 3 },
    { text: "待评价", icon: "icon-comment", type: 4 },
  ];

  /**
   * 初始化动画 - (可以实现用户指引蒙层)
   * 以 scrollSource 为参考滚动源，timeRange 为动画时间范围，startScrollOffset 为开始滚动偏移量，endScrollOffset 为结束滚动偏移量
   * 当滚动源滚动到 startScrollOffset 时，动画开始执行，当滚动源滚动到 endScrollOffset 时，动画结束执行
   */
  useLoad(() => {
    // proxy?.$scope.animate(".profile", [{ opacity: 1 }, { opacity: 0 }], 500, {
    //   scrollSource: "#scrollView",
    //   timeRange: 500,
    //   startScrollOffset: 0,
    //   endScrollOffset: 150,
    // });
    // proxy?.$scope.animate(".navbar", [{ top: "0" }, { top: "-30px" }], 500, {
    //   scrollSource: "#scrollView",
    //   timeRange: 500,
    //   startScrollOffset: 0,
    //   endScrollOffset: 150,
    // });
    // proxy?.$scope.animate(
    //   ".navbar .title",
    //   [{ opacity: 0 }, { opacity: 1 }],
    //   500,
    //   {
    //     scrollSource: "#scrollView",
    //     timeRange: 500,
    //     startScrollOffset: 85,
    //     endScrollOffset: 100,
    //   }
    // );
  });

  const [tabIndex, setTabIndex] = useState(0);

  const changeTab = (index: number) => {
    setTabIndex(index);
  };

  const goToProfile = () => {};

  return (
    <ScrollView id="scrollView" scrollY enhanced showScrollbar={false}>
      <View
        className="viewport"
        style={{ paddingTop: safeAreaInsets!.top + 40 + "px" }}
      >
        <View
          className="navbar"
          style={{
            paddingTop: safeAreaInsets!.top + 30 + "px",
          }}
        >
          <View className="title">我的</View>
        </View>
        {/* <!-- 个人资料 --> */}
        <View className="profile">
          <View className="overview">
            {isLogin && (
              <Navigator url="./profile" hover-className="none">
                <Image
                  mode="aspectFill"
                  className="avatar"
                  src={profile.avatar}
                ></Image>
              </Navigator>
            )}
            {/* <!-- 未登录：点击头像跳转登录页 --> */}
            {!isLogin && (
              <Navigator url="/pages/login/index" hover-className="none">
                {/* <!-- src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/avatar_3.jpg" --> */}
                <Image
                  className="avatar"
                  src="https://raw.githubusercontent.com/zengzjie/picgo-image/main/static_files/IMG_6247.JPG"
                ></Image>
              </Navigator>
            )}

            <View className="meta">
              {isLogin && (
                <View className="nickname" onTap={goToProfile}>
                  {profile.nickname}
                </View>
              )}

              {/* <!-- 未登录：点击文字跳转登录页 --> */}
              {!isLogin && (
                <Navigator
                  url="/pages/login/index"
                  hover-className="none"
                  className="nickname"
                >
                  未登录
                </Navigator>
              )}

              <View className="extra">
                {!isLogin && <Text className="tips">点击登录账号</Text>}
                {isLogin && (
                  <>
                    <Text className="update">更新头像昵称</Text>
                    <Text className="relogin">切换账号</Text>
                  </>
                )}
              </View>
            </View>
          </View>
          <Navigator
            className="settings"
            url="./settings"
            hover-className="none"
          >
            设置
          </Navigator>
        </View>
        {/* <!-- 订单块 - 粘性固定在按钮下方 --> */}
        <View
          className="orders"
          style={{ top: safeAreaInsets!.top + 78 + "px" }}
        >
          <View className="title">
            我的订单
            <Navigator url="/pages/order/index?type=0" hover-className="none">
              查看全部订单
              <Text className="icon-right"></Text>
            </Navigator>
          </View>
          <View className="section">
            {orderTypes.map((item) => {
              return (
                <Navigator
                  key={item.text}
                  className={item.icon}
                  url={"/pages/order/index?type=" + item.type}
                  hover-className="none"
                >
                  {item.text}
                </Navigator>
              );
            })}

            <Navigator className="icon-handset" url=" " hover-className="none">
              售后
            </Navigator>
          </View>
        </View>
        {/* <!-- 部件 --> */}
        <View className="widgets">
          <View className="tabs">
            {tabs.map((item, index) => (
              <Text
                key={item}
                className={`${tabIndex === index ? "active" : ""}`}
                onClick={() => changeTab(index)}
              >
                {item}
              </Text>
            ))}
          </View>
          <View className="masonry">
            {tabIndex === 0 && (
              <>
                <View className="column">
                  <View className="card topic">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/topic_1.jpg"
                    ></Image>
                    <View className="name">忙里忙外，回家吃饭</View>
                    <View className="price">
                      19.9元
                      <Text>起</Text>
                    </View>
                    <View className="extra">
                      <Text className="icon-heart">1220</Text>
                      <Text className="icon-preView">1000</Text>
                    </View>
                  </View>
                  <View className="card brand">
                    <View className="locate">
                      <Text className="icon-locate"></Text>
                      中国
                    </View>
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_6.jpg"
                    ></Image>
                    <View className="name">小米优购</View>
                    <View className="alt">小米优购闪购嗨购</View>
                  </View>
                  <View className="card goods">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_6.jpg"
                    ></Image>
                    <View className="name">
                      彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                      鹅软石桌布yg056
                    </View>
                    <View className="price">¥899</View>
                  </View>
                  <View className="card brand">
                    <View className="locate">
                      <Text className="icon-locate"></Text>
                      中国
                    </View>
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_8.jpg"
                    ></Image>
                    <View className="name">小米优购</View>
                    <View className="alt">小米优购闪购嗨购</View>
                  </View>
                  <View className="card goods">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_7.jpg"
                    ></Image>
                    <View className="name">
                      彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                      鹅软石桌布yg056
                    </View>
                    <View className="price">¥899</View>
                  </View>
                </View>
                <View className="column">
                  <View className="card goods">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_5.jpg"
                    ></Image>
                    <View className="name">
                      彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                      鹅软石桌布yg056
                    </View>
                    <View className="price">¥899</View>
                  </View>
                  <View className="card brand">
                    <View className="locate">
                      <Text className="icon-locate"></Text>
                      中国
                    </View>
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_7.jpg"
                    ></Image>
                    <View className="name">小米优购</View>
                    <View className="alt">小米优购闪购嗨购</View>
                  </View>
                  <View className="card topic">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/topic_2.jpg"
                    ></Image>
                    <View className="name">忙里忙外，回家吃饭</View>
                    <View className="price">
                      19.9元
                      <Text>起</Text>
                    </View>
                    <View className="extra">
                      <Text className="icon-heart">1220</Text>
                      <Text className="icon-preView">1000</Text>
                    </View>
                  </View>
                  <View className="card brand">
                    <View className="locate">
                      <Text className="icon-locate"></Text>
                      中国
                    </View>
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_5.jpg"
                    ></Image>
                    <View className="name">小米优购</View>
                    <View className="alt">小米优购闪购嗨购</View>
                  </View>
                  <View className="card goods">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_3.jpg"
                    ></Image>
                    <View className="name">
                      彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                      鹅软石桌布yg056
                    </View>
                    <View className="price">¥899</View>
                  </View>
                </View>
              </>
            )}
            {tabIndex === 1 && (
              <>
                <View className="column">
                  <View className="card goods">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_7.jpg"
                    ></Image>
                    <View className="name">
                      彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                      鹅软石桌布yg056
                    </View>
                    <View className="price">¥899</View>
                  </View>
                  <View className="card brand">
                    <View className="locate">
                      <Text className="icon-locate"></Text>
                      中国
                    </View>
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_8.jpg"
                    ></Image>
                    <View className="name">小米优购</View>
                    <View className="alt">小米优购闪购嗨购</View>
                  </View>
                  <View className="card topic">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/topic_1.jpg"
                    ></Image>
                    <View className="name">忙里忙外，回家吃饭</View>
                    <View className="price">
                      19.9元
                      <Text>起</Text>
                    </View>
                    <View className="extra">
                      <Text className="icon-heart">1220</Text>
                      <Text className="icon-preView">1000</Text>
                    </View>
                  </View>
                  <View className="card brand">
                    <View className="locate">
                      <Text className="icon-locate"></Text>
                      中国
                    </View>
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_6.jpg"
                    ></Image>
                    <View className="name">小米优购</View>
                    <View className="alt">小米优购闪购嗨购</View>
                  </View>
                  <View className="card goods">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_6.jpg"
                    ></Image>
                    <View className="name">
                      彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                      鹅软石桌布yg056
                    </View>
                    <View className="price">¥899</View>
                  </View>
                </View>
                <View className="column">
                  <View className="card topic">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/topic_2.jpg"
                    ></Image>
                    <View className="name">忙里忙外，回家吃饭</View>
                    <View className="price">
                      19.9元
                      <Text>起</Text>
                    </View>
                    <View className="extra">
                      <Text className="icon-heart">1220</Text>
                      <Text className="icon-preView">1000</Text>
                    </View>
                  </View>
                  <View className="card brand">
                    <View className="locate">
                      <Text className="icon-locate"></Text>
                      中国
                    </View>
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_5.jpg"
                    ></Image>
                    <View className="name">小米优购</View>
                    <View className="alt">小米优购闪购嗨购</View>
                  </View>
                  <View className="card goods">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_5.jpg"
                    ></Image>
                    <View className="name">
                      彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                      鹅软石桌布yg056
                    </View>
                    <View className="price">¥899</View>
                  </View>
                  <View className="card brand">
                    <View className="locate">
                      <Text className="icon-locate"></Text>
                      中国
                    </View>
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_7.jpg"
                    ></Image>
                    <View className="name">小米优购</View>
                    <View className="alt">小米优购闪购嗨购</View>
                  </View>
                  <View className="card goods">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_3.jpg"
                    ></Image>
                    <View className="name">
                      彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                      鹅软石桌布yg056
                    </View>
                    <View className="price">¥899</View>
                  </View>
                </View>
              </>
            )}
            {tabIndex === 2 && (
              <>
                <View className="column">
                  <View className="card goods">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_6.jpg"
                    ></Image>
                    <View className="name">
                      彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                      鹅软石桌布yg056
                    </View>
                    <View className="price">¥899</View>
                  </View>
                  <View className="card brand">
                    <View className="locate">
                      <Text className="icon-locate"></Text>
                      中国
                    </View>
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_8.jpg"
                    ></Image>
                    <View className="name">小米优购</View>
                    <View className="alt">小米优购闪购嗨购</View>
                  </View>
                  <View className="card topic">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/topic_1.jpg"
                    ></Image>
                    <View className="name">忙里忙外，回家吃饭</View>
                    <View className="price">
                      19.9元
                      <Text>起</Text>
                    </View>
                    <View className="extra">
                      <Text className="icon-heart">1220</Text>
                      <Text className="icon-preView">1000</Text>
                    </View>
                  </View>
                  <View className="card brand">
                    <View className="locate">
                      <Text className="icon-locate"></Text>
                      中国
                    </View>
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_6.jpg"
                    ></Image>
                    <View className="name">小米优购</View>
                    <View className="alt">小米优购闪购嗨购</View>
                  </View>
                  <View className="card goods">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_7.jpg"
                    ></Image>
                    <View className="name">
                      彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                      鹅软石桌布yg056
                    </View>
                    <View className="price">¥899</View>
                  </View>
                </View>
                <View className="column">
                  <View className="card brand">
                    <View className="locate">
                      <Text className="icon-locate"></Text>
                      中国
                    </View>
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_7.jpg"
                    ></Image>
                    <View className="name">小米优购</View>
                    <View className="alt">小米优购闪购嗨购</View>
                  </View>
                  <View className="card topic">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/topic_2.jpg"
                    ></Image>
                    <View className="name">忙里忙外，回家吃饭</View>
                    <View className="price">
                      19.9元
                      <Text>起</Text>
                    </View>
                    <View className="extra">
                      <Text className="icon-heart">1220</Text>
                      <Text className="icon-preView">1000</Text>
                    </View>
                  </View>
                  <View className="card goods">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_5.jpg"
                    ></Image>
                    <View className="name">
                      彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                      鹅软石桌布yg056
                    </View>
                    <View className="price">¥899</View>
                  </View>
                  <View className="card brand">
                    <View className="locate">
                      <Text className="icon-locate"></Text>
                      中国
                    </View>
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_5.jpg"
                    ></Image>
                    <View className="name">小米优购</View>
                    <View className="alt">小米优购闪购嗨购</View>
                  </View>
                  <View className="card goods">
                    <Image
                      mode="widthFix"
                      src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_3.jpg"
                    ></Image>
                    <View className="name">
                      彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                      鹅软石桌布yg056
                    </View>
                    <View className="price">¥899</View>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
