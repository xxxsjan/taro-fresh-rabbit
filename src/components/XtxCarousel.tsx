import { BannerItem } from "@/types/home";
import {
  View,
  Swiper,
  SwiperItem,
  Navigator,
  Image,
  SwiperProps,
  Text,
} from "@tarojs/components";
import { useState } from "react";
import "./XtxCarousel.scss";

interface XtxCarousel {
  list: BannerItem[];
}

export default function XtxCarousel(props: XtxCarousel) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(0);

  const onSwiperChange: SwiperProps["onChange"] = (ev) => {
    setActiveIndex(ev.detail?.current);
  };

  return (
    <View className="carousel">
      <Swiper circular autoplay interval={3000} onChange={onSwiperChange}>
        {props.list.map((item) => {
          return (
            <SwiperItem key={item.id}>
              <Navigator
                url="/pages/index/index"
                hover-className="none"
                className="navigator"
              >
                <Image
                  mode="aspectFill"
                  className="image"
                  src={item.imgUrl}
                ></Image>
              </Navigator>
            </SwiperItem>
          );
        })}
      </Swiper>
      <View className="indicator">
        {props.list.map((item, index) => {
          return (
            <Text
              key={item.id}
              className={`${index === activeIndex ? "dot active" : "dot"}`}
            ></Text>
          );
        })}
      </View>
    </View>
  );
}
