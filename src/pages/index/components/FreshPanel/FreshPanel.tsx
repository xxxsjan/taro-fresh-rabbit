import { NewItem } from "@/types/home";
import { View, Text, Image, Navigator } from "@tarojs/components";
import "./index.scss";

export default function FreshPanel(props: { newList: NewItem[] }) {
  return (
    <View className="panel fresh">
      <View className="title">
        新鲜好物
        <Navigator
          className="more"
          hover-className="none"
          url="/pages/recommend/index?type=5"
        >
          更多
        </Navigator>
      </View>
      <View className="cards">
        {props.newList.map((item) => (
          <Navigator
            key={item.id}
            className="cards-item"
            hover-className="none"
            url={`/pages/goods/index?id=${item.id}`}
          >
            <Image
              src={item.picture}
              mode="aspectFit"
              className="image"
            ></Image>
            <View className="name">{item.name}</View>
            <View className="price">
              <Text className="small">¥</Text>
              {item.price}
            </View>
          </Navigator>
        ))}
      </View>
    </View>
  );
}
