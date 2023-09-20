import React from 'react';
import {Text} from 'react-native';

type TextComponentProps = {
  className?: string;
  children: React.ReactNode;
};

export const TextComponent = (
  {className, children}: TextComponentProps,
  props: any,
) => {
  return (
    <Text className={`font-noto font-bold text-white ${className}`} {...props}>
      {children}
    </Text>
  );
};
