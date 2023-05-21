import {
  View,
  Text,
  Navigator,
  Swiper,
  ScrollView,
  Image,
} from "@tarojs/components";
import "./PageSkeleton.scss";

export default function PageSkeleton() {
  return (
    <View className="sk-container">
      <View className="Viewport" refresher-background="#f7f7f8">
        {/* <!-- vue3.x写法 -->
          <!-- is="vue:components/XtxCarousel" 直接复用渲染 XtxCarousel 的组件, 类名一致的话样式也可复用 --> 
        */}
        <View is="vue:components/XtxCarousel" style="height: 280rpx">
          <View className="carousel XtxCarousel--carousel">
            <Swiper></Swiper>
            <View className="indicator XtxCarousel--indicator">
              <Text className="dot XtxCarousel--dot"></Text>
              <Text className="dot XtxCarousel--dot"></Text>
              <Text className="dot XtxCarousel--dot"></Text>
              <Text className="dot XtxCarousel--dot active XtxCarousel--active"></Text>
              <Text className="dot XtxCarousel--dot"></Text>
            </View>
          </View>
        </View>
        <View is="vue:pages/index/components/CategoryEntries">
          <View className="category-entries CategoryEntries--category-entries">
            <ScrollView className="ScrollView CategoryEntries--ScrollView">
              <View
                className="navs CategoryEntries--navs"
                style="scroll-snap-align: none"
              >
                <View className="navs-item CategoryEntries--navs-item">
                  <Navigator
                    className="Navigator CategoryEntries--Navigator"
                    hover-className="none"
                  >
                    <Image className="icon CategoryEntries--icon sk-Image"></Image>
                    <Text
                      className="Text CategoryEntries--Text sk-transparent sk-Text-14-2857-160 sk-Text"
                      style="background-position-x: 50%"
                    >
                      居家
                    </Text>
                  </Navigator>
                  <Navigator
                    className="Navigator CategoryEntries--Navigator"
                    hover-className="none"
                  >
                    <Image className="icon CategoryEntries--icon sk-Image"></Image>
                    <Text
                      className="Text CategoryEntries--Text sk-transparent sk-Text-14-2857-491 sk-Text"
                      style="background-position-x: 50%"
                    >
                      美食
                    </Text>
                  </Navigator>
                  <Navigator
                    className="Navigator CategoryEntries--Navigator"
                    hover-className="none"
                  >
                    <Image className="icon CategoryEntries--icon sk-Image"></Image>
                    <Text
                      className="Text CategoryEntries--Text sk-transparent sk-Text-14-2857-157 sk-Text"
                      style="background-position-x: 50%"
                    >
                      服饰
                    </Text>
                  </Navigator>
                  <Navigator
                    className="Navigator CategoryEntries--Navigator"
                    hover-className="none"
                  >
                    <Image className="icon CategoryEntries--icon sk-Image"></Image>
                    <Text
                      className="Text CategoryEntries--Text sk-transparent sk-Text-14-2857-104 sk-Text"
                      style="background-position-x: 50%"
                    >
                      母婴
                    </Text>
                  </Navigator>
                  <Navigator
                    className="Navigator CategoryEntries--Navigator"
                    hover-className="none"
                  >
                    <Image className="icon CategoryEntries--icon sk-Image"></Image>
                    <Text
                      className="Text CategoryEntries--Text sk-transparent sk-Text-14-2857-826 sk-Text"
                      style="background-position-x: 50%"
                    >
                      个护
                    </Text>
                  </Navigator>
                  <Navigator
                    className="Navigator CategoryEntries--Navigator"
                    hover-className="none"
                  >
                    <Image className="icon CategoryEntries--icon sk-Image"></Image>
                    <Text
                      className="Text CategoryEntries--Text sk-transparent sk-Text-14-2857-742 sk-Text"
                      style="background-position-x: 50%"
                    >
                      严选
                    </Text>
                  </Navigator>
                  <Navigator
                    className="Navigator CategoryEntries--Navigator"
                    hover-className="none"
                  >
                    <Image className="icon CategoryEntries--icon sk-Image"></Image>
                    <Text
                      className="Text CategoryEntries--Text sk-transparent sk-Text-14-2857-979 sk-Text"
                      style="background-position-x: 50%"
                    >
                      数码
                    </Text>
                  </Navigator>
                  <Navigator
                    className="Navigator CategoryEntries--Navigator"
                    hover-className="none"
                  >
                    <Image className="icon CategoryEntries--icon sk-Image"></Image>
                    <Text
                      className="Text CategoryEntries--Text sk-transparent sk-Text-14-2857-288 sk-Text"
                      style="background-position-x: 50%"
                    >
                      运动
                    </Text>
                  </Navigator>
                  <Navigator
                    className="Navigator CategoryEntries--Navigator"
                    hover-className="none"
                  >
                    <Image className="icon CategoryEntries--icon sk-Image"></Image>
                    <Text
                      className="Text CategoryEntries--Text sk-transparent sk-Text-14-2857-472 sk-Text"
                      style="background-position-x: 50%"
                    >
                      杂项
                    </Text>
                  </Navigator>
                  <Navigator
                    className="Navigator CategoryEntries--Navigator"
                    hover-className="none"
                  >
                    <Image className="icon CategoryEntries--icon sk-Image"></Image>
                    <Text
                      className="Text CategoryEntries--Text sk-transparent sk-Text-14-2857-98 sk-Text"
                      style="background-position-x: 50%"
                    >
                      品牌
                    </Text>
                  </Navigator>
                </View>
              </View>
            </ScrollView>
            <View className="scroll-bar CategoryEntries--scroll-bar sk-scroll-bar">
              <View
                className="cursor CategoryEntries--cursor"
                style="left: 0%"
              ></View>
            </View>
          </View>
        </View>
        <View is="vue:pages/index/components/HotPanel">
          <View className="panel HotPanel--panel hot HotPanel--hot">
            <View className="item HotPanel--item">
              <View className="title HotPanel--title">
                <Text className="title-Text HotPanel--title-Text sk-transparent sk-Text-14-2857-444 sk-Text">
                  特惠推荐
                </Text>
                <Text className="title-desc HotPanel--title-desc sk-transparent sk-Text-14-2857-916 sk-Text">
                  精选全攻略
                </Text>
              </View>
              <Navigator
                className="cards HotPanel--cards"
                hover-className="none"
              >
                <Image
                  className="Image HotPanel--Image sk-Image"
                  mode="aspectFit"
                ></Image>
                <Image
                  className="Image HotPanel--Image sk-Image"
                  mode="aspectFit"
                ></Image>
              </Navigator>
            </View>
            <View className="item HotPanel--item">
              <View className="title HotPanel--title">
                <Text className="title-Text HotPanel--title-Text sk-transparent sk-Text-14-2857-938 sk-Text">
                  爆款推荐
                </Text>
                <Text className="title-desc HotPanel--title-desc sk-transparent sk-Text-14-2857-770 sk-Text">
                  最受欢迎
                </Text>
              </View>
              <Navigator
                className="cards HotPanel--cards"
                hover-className="none"
              >
                <Image
                  className="Image HotPanel--Image sk-Image"
                  mode="aspectFit"
                ></Image>
                <Image
                  className="Image HotPanel--Image sk-Image"
                  mode="aspectFit"
                ></Image>
              </Navigator>
            </View>
            <View className="item HotPanel--item">
              <View className="title HotPanel--title">
                <Text className="title-Text HotPanel--title-Text sk-transparent sk-Text-14-2857-751 sk-Text">
                  一站买全
                </Text>
                <Text className="title-desc HotPanel--title-desc sk-transparent sk-Text-14-2857-513 sk-Text">
                  精心优选
                </Text>
              </View>
              <Navigator
                className="cards HotPanel--cards"
                hover-className="none"
              >
                <Image
                  className="Image HotPanel--Image sk-Image"
                  mode="aspectFit"
                ></Image>
                <Image
                  className="Image HotPanel--Image sk-Image"
                  mode="aspectFit"
                ></Image>
              </Navigator>
            </View>
            <View className="item HotPanel--item">
              <View className="title HotPanel--title">
                <Text className="title-Text HotPanel--title-Text sk-transparent sk-Text-14-2857-750 sk-Text">
                  领劵中心
                </Text>
                <Text className="title-desc HotPanel--title-desc sk-transparent sk-Text-14-2857-671 sk-Text">
                  超值优惠券
                </Text>
              </View>
              <Navigator
                className="cards HotPanel--cards"
                hover-className="none"
              >
                <Image
                  className="Image HotPanel--Image sk-Image"
                  mode="aspectFit"
                ></Image>
                <Image
                  className="Image HotPanel--Image sk-Image"
                  mode="aspectFit"
                ></Image>
              </Navigator>
            </View>
          </View>
        </View>
        <View is="vue:pages/index/components/FreshPanel">
          <View className="panel FreshPanel--panel fresh FreshPanel--fresh">
            <View className="title FreshPanel--title sk-transparent sk-Text">
              新鲜好物
              <Navigator
                className="more FreshPanel--more sk-transparent sk-Text"
                style="position: absolute"
                hover-className="none"
              >
                更多
              </Navigator>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
