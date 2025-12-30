import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const clamp = (value) => Math.max(0, Math.min(1, value));

export default function ProgressRing({
  progress = 0,
  size = 140,
  strokeWidth = 12,
  trackColor = '#f1d88a',
  progressColor = '#7b5336',
  label,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = clamp(progress);
  const strokeDashoffset = circumference - circumference * clamped;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke={trackColor} strokeWidth={strokeWidth} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
      <View style={{ position: 'absolute', alignItems: 'center' }}>
        {label ? <Text style={{ fontWeight: '600', color: '#7b5336' }}>{label}</Text> : null}
        <Text style={{ fontSize: 26, fontWeight: '700', color: '#7b5336' }}>{`${Math.round(clamped * 100)}%`}</Text>
      </View>
    </View>
  );
}
