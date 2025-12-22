import { View, Text } from "@tarojs/components";
import Taro from '@tarojs/taro';
import { PropsWithChildren } from "react";
import './TopHeader.css'

interface TopHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export function TopHeader({ title, showBackButton = false, children }: PropsWithChildren<TopHeaderProps>) {
  const handleBack = () => {
    Taro.navigateBack();
  };
  
  const statusBarHeight = Taro.getSystemInfoSync().statusBarHeight;

  return (
    <View className="top-header-container" style={{ paddingTop: `${statusBarHeight}px` }}>
        <View className="top-header-content">
            {showBackButton && (
                <View className="back-button" onClick={handleBack}>
                    <Text className="back-icon">‹</Text>
                </View>
            )}
             <Text className="top-header-title">{title}</Text>
        </View>
    </View>
  );
}
