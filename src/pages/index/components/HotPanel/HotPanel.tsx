import { HotItem } from "@/types/home";
import { View, Text, Image, Navigator } from "@tarojs/components";
import "./index.scss";

export default function HotPanel(props: { hotList: HotItem[] }) {
  return (
    <View className="panel hot">
      {props.hotList.map((item) => (
        <View key={item.id} className="item">
          <View className="title">
            <Text className="title-text">{item.title}</Text>
            <Text className="title-desc">{item.alt}</Text>
          </View>
          <Navigator
            hover-className="none"
            url={`/pages/recommend/index?type=${item.type}`}
            className="cards"
          >
            {item.pictures.map((src) => (
              <Image
                key={src}
                className="image"
                mode="aspectFit"
                src={src}
              ></Image>
            ))}
          </Navigator>
        </View>
      ))}
    </View>
  );
}
