import { Text, Navigator, Image, ScrollView, View } from "@tarojs/components";
import {
  getSystemInfoSync,
  useLoad,
  useDidShow,
  showToast,
  showModal,
  navigateTo,
} from "@tarojs/taro";
import { useState, lazy, useRef, useMemo } from "react";
import XtxGuess from "@/components/XtxGuess";
import type { GuessExpose } from "@/components/XtxGuess";
import type { MemberCartItem } from "@/types/cart";
import {
  getMemberCart,
  putMemberCartById,
  putMemberCartSelected,
  deleteMemberCart,
} from "@/api/modules/cart";
import { useUserContext } from "@/store/user";

import "./index.scss";

function Cart() {
  const memberStore = useUserContext();
  console.log("memberStore: ", memberStore);

  // 购物车商品列表
  const [carts, setCarts] = useState<MemberCartItem[]>([]);

  // 解构保持响应式
  const { isLogin = false, profile = {} } = memberStore.data;

  const guessRef = useRef<GuessExpose>();

  const loadMemberCart = async () => {
    // setCarts(await getMemberCart());
  };

  /* 这里需要用onShow, 因为onLoad只会触发一次, 当没有登录的时候切到购物车页面然后去登陆后在回来就不会触发了 */
  useDidShow(() => {
    if (isLogin) {
      // 如果已经登录，直接获取购物车数据
      loadMemberCart();
    }
  });

  // 是否全选
  const isAllSelected = useMemo(() => {
    if (carts.length === 0) {
      return false;
    }
    return carts.every((item) => item.selected);
  }, [carts]);

  // 计算以选中的商品数量
  const selectedCarts = useMemo(
    () => carts.filter((item) => item.selected),
    [carts]
  );

  // 计算以选中的商品数量
  const selectedCartsCount = useMemo(
    () => selectedCarts.reduce((sum, item) => sum + Number(item.count), 0),
    [selectedCarts]
  );

  // 计算选中商品的总价
  const selectedCartsAmount = useMemo(
    () =>
      selectedCarts.reduce(
        (sum, item) => sum + Number(item.count) * Number(item.price),
        0
      ),
    [selectedCarts]
  );

  // 滚动加载猜你喜欢数据
  const onScrollTolower = () => {
    guessRef.current?.getMore();
  };

  // 选择商品
  const changeSelected = (skuId: string) => {
    const item = carts.find((item) => item.skuId === skuId);
    if (item) {
      item.selected = !item.selected;
      // 发送请求让后端更选中状态
      putMemberCartById(skuId, { selected: item.selected });
    }
  };

  // 全选
  const changeSelectedAll = () => {
    // 先记录下当前的全选状态
    const selected = !isAllSelected;
    // 批量更新商品的选中状态
    carts.forEach((item) => {
      item.selected = selected;
    });
    // 发送请求让后端更新选中状态
    putMemberCartSelected({ selected: selected });
  };

  // 改变商品数量
  const changeCount = (skuId: string, num: number) => {
    // 根据 skuId 查找出待修改的商品
    const item = carts.find((v) => v.skuId === skuId);
    if (item) {
      // 先保存一个临时的数据，用于边界判断
      const temp = Number(item.count) + num;
      if (Number(temp) < 1) {
        showToast({
          title: "商品数量不能小于1",
          icon: "none",
        });
        return;
      }
      if (Number(temp) > item.stock) {
        showToast({
          title: `商品数量不能大于${item.stock}`,
          icon: "none",
        });
        return;
      }
      item.count = temp.toString();
      // 发送请求让后端更新商品数量
      putMemberCartById(skuId, { count: Number(item.count) });
    }
  };

  // 手动输入数量
  const handleCountChange = (e: any, skuId: string) => {
    // 根据 skuId 查找出待修改的商品
    const item = carts.find((v) => v.skuId === skuId);
    if (e.target.value === "" || e.target.value === "0") {
      if (item) {
        showToast({
          title: "商品数量不能小于1",
          icon: "none",
        });
        item.count = "1";
        // 发送请求让后端更新商品数量
        putMemberCartById(skuId, { count: Number(item.count) });
      }
      return;
    }
    if (Number(e.target.value) > (item?.stock as number)) {
      showToast({
        title: `商品数量不能大于${item?.stock}`,
        icon: "none",
      });
      if (item) {
        item.count = item.stock.toString();
        // 发送请求让后端更新商品数量
        putMemberCartById(skuId, { count: Number(item.count) });
      }
      return;
    }
    putMemberCartById(skuId, { count: Number(e.target.value) });
  };

  // 删除购物车
  const deleteCart = (ids: string[]) => {
    showModal({
      title: "提示",
      content: "是否要删除商品",
      success: async function (res) {
        if (res.confirm) {
          await deleteMemberCart({ ids: ids });
          // 删除成功后重新获取购物车列表
          loadMemberCart();
          showToast({
            title: "删除成功",
            icon: "none",
          });
        }
      },
    });
  };

  // 去结算
  const goToOrderCreate = () => {
    if (selectedCartsCount === 0) {
      showToast({
        title: "请选择商品",
        icon: "none",
      });
      return;
    }
    // 跳转到订单创建页（填写订单）
    navigateTo({ url: "/pages/order/create" });
  };

  return (
    <ScrollView
      className="viewport"
      scroll-y
      enhanced
      showScrollbar={false}
      onScrollToLower={onScrollTolower}
    >
      {isLogin && (
        <>
          <View className="tips">
            {/* <!-- 优惠提示 --> */}
            <Text className="label">满减</Text>
            <Text className="desc">满1件，即可享受9折优惠</Text>
          </View>
          {carts.length === 0 && (
            <View className="blank">购物车还是空的，快来挑选好货吧！</View>
          )}
          {/* <!-- 购物车商品 --> */}
          {!carts.length === 0 && <View className="carts"></View>}
        </>
      )}
      {!isLogin && (
        <View className="blank">
          <Text>登陆后可查看购物车中的商品</Text>
          <Navigator hover-className="none" url="/pages/login/index">
            <button className="button">去登陆</button>
          </Navigator>
        </View>
      )}

      <XtxGuess ref={guessRef} />
    </ScrollView>
  );
}

export default Cart;
