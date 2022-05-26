import React, { useLayoutEffect, useState } from 'react'

import 'screens/dist/index.css'

const App = () => {
  return <ExampleComponent text="Create eact Library Example 😄" />
}

export default App

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
  landscape = "landscape",
  portrait = "portrait"
}

enum ScreenType {
  Mobile = "mobile",
  Tablet = "tablet",
  Desktop = "desktop"
}

function useWindowDimensions() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export const useScreens = ():Screen => {
  const [width, height] = useWindowDimensions();
  var portrait = false;

  console.log(width, height)
  const screen = {
    type: ScreenType.Desktop,
    orientation: ScreenOrientation.landscape,
    browser: 0,
    device: 0,
  }

  if (width < height) {
    screen.orientation = ScreenOrientation.portrait;
    portrait = true;
  }

  if (portrait && (width <= 600 && height <= 900)) {
    screen.type = ScreenType.Mobile;
  } else if (!portrait && (height <= 600 && width <= 900)) {
    screen.type = ScreenType.Mobile;
  } else if (portrait && (width <= 1280 && height <= 1920)) {
    screen.type = ScreenType.Tablet;
  } else if (!portrait && (height <= 1920 && width <= 1280)) {
    screen.type = ScreenType.Tablet;
  } else {
    screen.type = ScreenType.Desktop;
  }


  return screen
}


const ExampleComponent = ({ text }: Props) => {
  const screen = useScreens();

  return (<div className={""}>
    <p>
    {text} {screen.orientation}      
    </p>
    <p>
    {screen.type} {screen.browser} {screen.device}
    </p>
   </div>);
}