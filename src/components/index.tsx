import React, {useState} from 'react';
import {Text, View} from 'react-native';

const color: string = '#daecff' || '#efefef';

type TextComponentProps = {
  className?: string;
  children: React.ReactNode;
};

export const TextComponent = (
  {className, children}: TextComponentProps,
  props: any,
) => {
  return (
    <Text
      className={`font-lexend-semibold ${className}`}
      style={
        !className || className?.search('!text') === -1 ? {color: color} : null
      }
      {...props}>
      {children}
    </Text>
  );
};

type ViewComponentProps = {
  className?: string;
  children?: React.ReactNode;
};

export const ViewComponent = (
  {className, children}: ViewComponentProps,
  props: any,
) => {
  return (
    <View
      style={className?.search('!bg') === -1 ? {backgroundColor: color} : null}
      className={`${className}`}
      {...props}>
      {children}
    </View>
  );
};

import {PanGestureHandler, State} from 'react-native-gesture-handler';
import type {PanGestureHandlerGestureEvent as Event} from 'react-native-gesture-handler';

type Dir = 'left' | 'right' | 'up' | 'down';

type SwipeComponentProps = {
  onSwipe: (dir: Dir) => void;
  onPull?: () => void;
  onPush?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  children: React.ReactNode;
};

export const SwipeComponent = ({
  onSwipe,
  onPull,
  onPush,
  onSwipeLeft,
  onSwipeRight,
  children,
}: SwipeComponentProps) => {
  const [didFire, setDidFire] = useState<boolean>(false);
  const [dir, setDir] = useState<Dir>();
  const swipeRange: number = 50;

  const onGestureEvent = ({nativeEvent}: Event) => {
    const {translationX, translationY} = nativeEvent;

    if (translationX > swipeRange && !didFire) {
      setDir('right'), setDidFire(true);
      onSwipeRight ? onSwipeRight() : null;
    } else if (translationX < -swipeRange && !didFire) {
      setDir('left'), setDidFire(true);
      onSwipeLeft ? onSwipeLeft() : null;
    } else if (translationY > swipeRange && !didFire) {
      setDir('down'), setDidFire(true);
      onPull ? onPull() : null;
    } else if (translationY < -swipeRange && !didFire) {
      setDir('up'), setDidFire(true);
      onPush ? onPush() : null;
    }
  };

  const onHandlerStateChange = ({nativeEvent}: Event) => {
    nativeEvent.state === State.END
      ? dir
        ? (onSwipe(dir), setDidFire(false))
        : null
      : null;
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}>
      {children}
    </PanGestureHandler>
  );
};
