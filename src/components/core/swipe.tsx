import React, {useState} from 'react';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import type {PanGestureHandlerGestureEvent as Event} from 'react-native-gesture-handler';

type Dir = 'left' | 'right' | 'up' | 'down';

interface SwipeComponentProps {
  onSwipe?: (dir: Dir) => void;
  onPull?: () => void;
  onPush?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  children: React.ReactNode;
};

const SwipeComponent = ({
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
        ? (onSwipe && onSwipe(dir), setDidFire(false))
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

export default SwipeComponent;
