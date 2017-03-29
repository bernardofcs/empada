import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'App': {
    'textAlign': 'center'
  },
  'App-logo': {
    'animation': 'App-logo-spin infinite 20s linear',
    'height': [{ 'unit': 'px', 'value': 80 }]
  },
  'App-header': {
    'backgroundColor': '#222',
    'height': [{ 'unit': 'px', 'value': 150 }],
    'padding': [{ 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }],
    'color': 'white'
  },
  'App-intro': {
    'fontSize': [{ 'unit': 'string', 'value': 'large' }]
  },
  'timeline-container': {
    'margin': [{ 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }],
    'width': [{ 'unit': '%H', 'value': 0.8 }]
  },
  'progress-donut-container': {
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'lightblue' }],
    'margin': [{ 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }],
    'height': [{ 'unit': 'em', 'value': 7.4 }],
    'transition': '300ms'
  },
  'progress-donut-chart': {
    'position': 'relative',
    'top': [{ 'unit': 'em', 'value': -1.5 }]
  },
  'pie-chart-name': {
    'position': 'relative',
    'bottom': [{ 'unit': 'em', 'value': -1 }],
    'zIndex': '1'
  },
  'Table': {
    'margin': [{ 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }],
    'width': [{ 'unit': '%H', 'value': 0.8 }]
  },
  // .disabled {
  text-decoration: line-through; 
}
});
