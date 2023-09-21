import React, {useState} from 'react';
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
    <Text
      className={`font-josefin font-bold text-slate-200 ${className}`}
      {...props}>
      {children}
    </Text>
  );
};

import {PanGestureHandler, State} from 'react-native-gesture-handler';
import type {PanGestureHandlerGestureEvent as Event} from 'react-native-gesture-handler';

type Dir = 'left' | 'right' | 'up' | 'down';

type SwipeComponentProps = {
  onSwipe: (dir: Dir) => void;
  children: React.ReactNode;
};

export const SwipeComponent = ({onSwipe, children}: SwipeComponentProps) => {
  const [didFire, setDidFire] = useState<boolean>(false);
  const [dir, setDir] = useState<Dir>();
  const swipeRange: number = 50;

  const onGestureEvent = ({nativeEvent}: Event) => {
    const {translationX, translationY} = nativeEvent;

    if (translationX > swipeRange && !didFire) {
      setDir('right'), setDidFire(true);
    } else if (translationX < -swipeRange && !didFire) {
      setDir('left'), setDidFire(true);
    } else if (translationY > swipeRange && !didFire) {
      setDir('down'), setDidFire(true);
    } else if (translationY < -swipeRange && !didFire) {
      setDir('up'), setDidFire(true);
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
