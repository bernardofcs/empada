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
  'collapsible': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.7 }]
  },
  'collapsible-header p': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 1 }]
  },
  'collapsible-body': {
    'padding': [{ 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }]
  },
  'timeline': {
    // width: 50%;
    // width: 1000px;
    // margin: auto;
    // overflow: auto;
  },
  'progress-donut-container': {
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'lightblue' }],
    'margin': [{ 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }],
    'height': [{ 'unit': 'em', 'value': 7.9 }],
    'transition': '300ms'
  },
  'dashboardTimeline': {
    // width: 50%;
    // width: 1000px;
    // margin: auto;
    // overflow: auto;
  },
  'progress-donut-chart': {
    'position': 'relative',
    'top': [{ 'unit': 'em', 'value': -1.8 }],
    'transition': '300ms'
  },
  'pie-chart-name': {
    'position': 'relative',
    'bottom': [{ 'unit': 'em', 'value': -1.6 }],
    'zIndex': '1',
    'transition': '300ms'
  },
  'Table': {
    'margin': [{ 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }],
    'width': [{ 'unit': '%H', 'value': 0.8 }]
  },
  'big-icons': {
    'fontSize': [{ 'unit': 'em', 'value': 5 }],
    'color': 'lightcoral',
    'transition': '300ms'
  },
  'big-icons:hover': {
    'fontSize': [{ 'unit': 'em', 'value': 7 }],
    'color': 'lightcoral',
    'transition': '300ms'
  },
  'cards': {
    'transition': '300ms'
  },
  'cards:hover': {
    'border': [{ 'unit': 'px', 'value': 3 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'lightcoral' }],
    'width': [{ 'unit': 'px', 'value': 600 }],
    'transition': '300ms'
  },
  'MediaBox': {
    'position': 'relative',
    'left': [{ 'unit': 'em', 'value': -20 }]
  }
});
