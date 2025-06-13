import React from 'react';
import Svg, {Path, Rect, Circle, Line} from 'react-native-svg';

// Home Icon - Resimdeki gibi basit dolu ev
export const HomeIcon = ({color = '#000000', size = 24}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill={color} />
  </Svg>
);

// Calendar Icon - Resimdeki gibi grid pattern
export const CalendarIcon = ({color = '#000000', size = 24}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" />
    <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" />
    <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" />
    {/* Grid dots */}
    <Circle cx="8" cy="14" r="1" fill={color} />
    <Circle cx="12" cy="14" r="1" fill={color} />
    <Circle cx="16" cy="14" r="1" fill={color} />
    <Circle cx="8" cy="18" r="1" fill={color} />
    <Circle cx="12" cy="18" r="1" fill={color} />
  </Svg>
);

// Map Icon - Resimdeki gibi konum pin
export const MapIcon = ({color = '#000000', size = 24}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <Circle cx="12" cy="10" r="3" fill={color} />
  </Svg>
);

// Profile Icon - Resimdeki gibi yuvarlak içinde nokta
export const ProfileIcon = ({color = '#000000', size = 24}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
    <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" fill="none" />
    <Path
      d="M7 20.662V20C7 17.239 9.239 15 12 15C14.761 15 17 17.239 17 20V20.662"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
  </Svg>
);
