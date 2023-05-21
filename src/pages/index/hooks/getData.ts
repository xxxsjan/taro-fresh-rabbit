import React, { useState, useEffect, useRef } from "react";
import type { BannerItem, CategoryItem, HotItem, NewItem } from "@/types/home";
import {
  getHomeBanner,
  getHomeCategoryHeadMutli,
  getHomeMutli,
  getHomeNewList,
} from "@/api/modules/home";

export function useData() {
  const guessRef = useRef(null);

  const [triggered, setTriggered] = useState(false);
  const [isShowSkeleton, setIsShowSkeleton] = useState(false);

  // 获取轮播图数据
  const [bannerList, setBannerList] = useState<BannerItem[]>([]);
  const getBannerList = async () => {
    const res = await getHomeBanner();
    setBannerList(res);
  };

  // 获取分类数据
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);

  const getCategoryList = async () => {
    let res = await getHomeCategoryHeadMutli();
    // 跟后端约定好数据的格式, 举个例子
    res = res.map((item) => {
      return {
        icon: item.icon,
        id: item.id,
        name: item.name,
        page: 1,
      };
    });
    res.push(
      ...[
        {
          icon: "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/201516e3-25d0-48f5-bcee-7f0cafb14176.png?quality=95&imageView",
          id: "2005000",
          name: "居家",
          page: 2,
        },
        {
          icon: "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/cf82e5b4-bf1b-4c68-aa86-96f66e8e5282.png?quality=95&imageView",
          id: "2005002",
          name: "锦鲤",
          page: 2,
        },
        {
          icon: "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/33e1f5de-0fdb-4cfa-9ba9-781233024b53.png?quality=95&imageView",
          id: "2010000",
          name: "服饰",
          page: 2,
        },
        {
          icon: "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/b514a526-4010-4ce8-8cb9-757ed382f84a.png?quality=95&imageView",
          id: "2011000",
          name: "母婴",
          page: 2,
        },
        {
          icon: "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/d38a73b8-cd03-48aa-a60b-e7c4e16667ed.png?quality=95&imageView",
          id: "2013001",
          name: "个护",
          page: 2,
        },
        {
          icon: "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/4b02f01f-a365-4b6c-9f7a-8b0f591dda02.png?quality=95&imageView",
          id: "2019000",
          name: "严选",
          page: 2,
        },
        {
          icon: "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/9660870d-6a59-4624-8064-b3a8cbf50d5c.png?quality=95&imageView",
          id: "2043000",
          name: "数码",
          page: 2,
        },
        {
          icon: "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/7d19752c-baff-49b6-bd02-5ece1d729214.png?quality=95&imageView",
          id: "209243029",
          name: "运动",
          page: 2,
        },
        {
          icon: "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/4ff20b9e-8150-4bd3-87a3-0cd6766938dd.png?quality=95&imageView",
          id: "29999999",
          name: "杂项",
          page: 2,
        },
        {
          icon: "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/d9ee4919-0d2c-4383-9916-2dd25f12610c.png?quality=95&imageView",
          id: "3999999",
          name: "品牌",
          page: 2,
        },
        {
          icon: "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-06/d9ee4919-0d2c-4383-9916-2dd25f12610c.png?quality=95&imageView",
          id: "4999999",
          name: "麻将",
          page: 3,
        },
      ]
    );
    setCategoryList(res);
  };

  // 获取推荐数据
  const [hotList, setHotList] = useState<HotItem[]>([]);

  const getHotList = async () => {
    const res = await getHomeMutli();
    setHotList(res);
  };

  // 获取新鲜好物数据
  const [newList, setNewList] = useState<NewItem[]>([]);

  const getNewList = async () => {
    const res = await getHomeNewList();
    setNewList(res);
  };
  // 首页需要请求的数据
  const loadData = async () => {
    setIsShowSkeleton(true);
    await Promise.all([
      getBannerList(),
      getCategoryList(),
      getHotList(),
      getNewList(),
    ]);
    setIsShowSkeleton(false);
  };
  // 重置数据
  const resetData = () => {
    setBannerList([]);
    setCategoryList([]);
    setHotList([]);
    setNewList([]);

    // 重置猜你喜欢列表
    // guessRef.current?.reset();
    console.log('guessRef.current: ', guessRef);
  };
  /**
   * @description: 自定义下拉刷新被触发
   * @return {*}
   */
  const handleRefresherrefresh = () => {
    setIsShowSkeleton(true);
    // 开启下拉刷新状态
    setTriggered(true);
    // 重置数据
    resetData();
    // nextTick(async () => {
    //   // 重新请求数据
    //   await loadData();
    //   // 关闭下拉刷新状态
    //   triggered = false;
    // });
  };

  /**
   * @description: 滚动到底部/右边，会触发 scrolltolower 事件
   * @return {*}
   */
  const handleScrolltolower = () => {
    guessRef.current?.getMore();
  };

  return {
    guessRef,
    triggered,
    isShowSkeleton,
    bannerList,
    categoryList,
    hotList,
    newList,
    getBannerList,
    getCategoryList,
    getHotList,
    getNewList,
    resetData,
    handleRefresherrefresh,
    handleScrolltolower,
    loadData,
  };
}
