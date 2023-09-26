import React from 'react';
import {View, ViewProps} from 'react-native';
import classNames from 'classnames';
import TextComponent from './text';
import IconComponent from './icon';

interface SwitchComponentProps extends ViewProps {
  value: boolean;
  left: string;
  right: string;
  onValueChange: () => void;
}

const SwitchComponent = (props: SwitchComponentProps) => (
  <View className={classNames('flex-row items-center', props?.className)}>
    <TextComponent>{props?.left}</TextComponent>
    <IconComponent
      className="p-4 -mb-[18px]"
      name={props?.value ? 'toggle-switch' : 'toggle-switch-off'}
      size={30}
      onPress={props?.onValueChange}
    />
    <TextComponent>{props?.right}</TextComponent>
  </View>
);

export default SwitchComponent;
