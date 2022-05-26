import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  text: string
}

interface Screen {
  type: ScreenType
  orientation: ScreenOrientation
  browser: Browser
  device: Device
}

enum Device {
  Iphone,
  Ipad,
  Android,
}

enum Browser {
  
}

enum ScreenOrientation {
  landscape,
  portrait
}

enum ScreenType {
  Mobile,
  Tablet,
  Desktop
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return [
    width,
    height
  ];
}

export const useScreens = ():Screen => {
  const [width, height] = getWindowDimensions();

  const screen = {
    type: 0,
    orientation: 0,
    browser: 0,
    device: 0,
  }

  if (width > height) {
    screen.orientation = ScreenOrientation.landscape
  } else {
    screen.orientation = ScreenOrientation.portrait
  }

  if (width <= 600 && height <= 900) {
    screen.type = ScreenType.Mobile
  }


  return screen
}

export const ExampleComponent = ({ text }: Props) => {
  const screen = useScreens();

  return <div className={styles.test}>{text} {screen.orientation} {screen.type}</div>
}

// consider: https://developers.whatismybrowser.com/api/
