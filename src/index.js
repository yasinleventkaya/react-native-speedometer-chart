import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { getStyles } from './rules';

const Speedometer = ({minValue, value, totalValue, maxView, minView, valueView, size, outerColor, innerColor, internalColor,
                       style, innerCircleStyle, outerCircleStyle, halfCircleStyle, showText, text, textStyle, showLabels,
                       labelStyle, showPercent, percentStyle, percentSize, labelTextMax, labelTextMin }) => {
  const styles = getStyles(size, percentSize);

  value = parseFloat(value)
  totalValue = parseFloat(totalValue)

  const degreesValue = (value > totalValue) ? totalValue - minValue : ((value < minValue) ? 0 : value - minValue)
  const percentValue = parseInt(String((value * 100) / totalValue).split('.')[0]);
  const degrees = ((degreesValue * 180) / ((totalValue === 0) ? 1 : totalValue - minValue)) - 90;

  const degressStyle = {
    backgroundColor: internalColor,
    transform: [{ translateX: size / 4 }, { rotate: `${degrees}deg` }, { translateX: (size / 4 * -1) }],
  };

  const percentElement = (showPercent) ? (
    <Text style={[{ backgroundColor: innerColor }, percentStyle]} numberOfLines={1}>{valueView}</Text>
  ) : null;

  const textElement = ((showText) && (text)) ? (
    <Text style={[{ backgroundColor: innerColor }, textStyle]} numberOfLines={1}>{text}</Text>
  ) : null;

  const labelsElement = (showLabels) ? (
    <View style={[styles.labelsView, { width: size }]}>
      <Text style={[styles.initialLabel, labelStyle]} numberOfLines={1}>{labelTextMin} {minView}</Text>
      <Text style={[styles.finalLabel, labelStyle]} numberOfLines={1}>{labelTextMax} {maxView}</Text>
    </View>
  ) : null;

  return (
    <View style={style}>
      <View style={[styles.outerCircle, { backgroundColor: outerColor }, outerCircleStyle]}>
        <View style={[styles.halfCircle, degressStyle, halfCircleStyle]}/>
        <View style={[styles.innerCircle, { backgroundColor: innerColor }, innerCircleStyle]}>
          {percentElement}
          {textElement}
        </View>
      </View>
      {labelsElement}
    </View>
  );
};

Speedometer.propTypes = {
  minValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  totalValue: PropTypes.number.isRequired,
  size: PropTypes.number,
  outerColor: PropTypes.string,
  innerColor: PropTypes.string,
  internalColor: PropTypes.string,
  style: PropTypes.object,
  showText: PropTypes.bool,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  textStyle: PropTypes.object,
  showLabels: PropTypes.bool,
  labelStyle: PropTypes.object,
  showPercent: PropTypes.bool,
  percentStyle: PropTypes.object,
  innerCircleStyle: PropTypes.object,
  outerCircleStyle: PropTypes.object,
  halfCircleStyle: PropTypes.object,
  percentSize: PropTypes.number,
  labelTextMax: PropTypes.string,
  labelTextMin: PropTypes.string,
};

Speedometer.defaultProps = {
  size: 200,
  outerColor: '#e6e6e6',
  innerColor: '#ffffff',
  internalColor: '#2eb82e',
  style: {},
  showText: false,
  text: '',
  textStyle: {},
  showLabels: false,
  labelStyle: {},
  showPercent: false,
  percentStyle: {},
  percentSize: 0.5,
  labelTextMax: '',
  labelTextMin: '',
};

export default Speedometer;
