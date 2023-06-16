import {
  Text,
  Navigator,
  Image,
  ScrollView,
  View,
  Button,
} from "@tarojs/components";
import {
  getSystemInfoSync,
  showToast,
  useLoad,
  login,
  navigateBack,
} from "@tarojs/taro";
import { useState, lazy } from "react";
import { postLoginWxMin, postLoginWxMinSimple } from "@/api/modules/login";
import { LoginWxMinResult } from "@/types/login";
import { useUserContext } from "@/store/user";
import "./index.scss";

function Login() {
  // 提示消息
  const nextVersion = () => {
    showToast({ title: "等下一个版本哦", icon: "none" });
  };

  const memberStore = useUserContext();

  // 页面加载时，获取微信登录凭证
  let code = "";
  useLoad(() => {
    // 获取微信登录凭证
    login({
      success(res) {
        code = res.code;
      },
    });
  });

  // 获取用户手机号
  const onGetphonenumber = async (ev: any) => {
    try {
      // 获取 encryptedData, iv 参数
      const { encryptedData, iv } = ev.detail;
      console.log(encryptedData, iv, "encryptedData, iv");
      // 调用发送微信登录请求
      const profile = await postLoginWxMin({
        code, // 必填参数：需通过 wx.login() 获取的 code
        encryptedData,
        iv,
      });
      // 授权登录成功后续逻辑
      loginSuccess(profile);
    } catch {
      // 登录或注册失败
      showToast({ title: "登录失败!", icon: "none" });
    }
  };

  // 小程序登录_内测版
  const onGetphonenumberSimple = async () => {
    try {
      // 调用模拟的登录接口
      const profile = await postLoginWxMinSimple("13535353535");
      // 模拟:授权登录成功后续逻辑
      loginSuccess(profile);
    } catch (error) {
      // 登录或注册失败
      showToast({ title: "登录失败!", icon: "none" });
    }
  };

  const loginSuccess = async (profile: LoginWxMinResult) => {
    // 保存用户信息到 Store 中
    memberStore.setData({
      isLogin: true,
      profile,
    });

    // 登录成功提示
    showToast({ icon: "success", title: "登录成功" });

    setTimeout(() => {
      // 后退回到上一页
      navigateBack({});
    }, 500);
  };
  return (
    <View className="viewport">
      <View className="logo">
        <Image src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/logo_icon.png"></Image>
      </View>
      <View className="login">
        {/* <button className="button phone" open-type="getPhoneNumber" onGetphonenumber={onGetphonenumber}>
      <Text className="icon icon-phone"></Text>
      手机号快捷登录
    </button>  */}
        <Button
          style={{ marginTop: "20rpx" }}
          className="button phone"
          onTap={onGetphonenumberSimple}
        >
          <Text className="icon icon-phone"></Text>
          手机号快捷登录-内测版
        </Button>
        <View className="extra">
          <View className="caption">
            <Text>其它登录方式</Text>
          </View>
          <View className="options">
            <button>
              <Text className="icon icon-weixin">微信</Text>
            </button>
            {/* <button open-type="getPhoneNumber">
          <Text className="icon icon-phone">手机</Text>
        </button>  */}
            <button onTap={nextVersion}>
              <Text className="icon icon-mail">邮箱</Text>
            </button>
          </View>
        </View>
        <View className="tips">
          登录/注册即视为你同意《服务条款》和《小兔鲜儿隐私协议》
        </View>
      </View>
    </View>
  );
}

export default Login;
