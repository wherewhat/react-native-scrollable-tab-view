import React,{ Component } from 'react';
import { 
  ViewPropTypes,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';

const Button = require('./Button');

class DefaultTabBar extends Component { 
  constructor(props){
    super(props);
    this.renderTab = this.renderTab.bind(this);
    this.renderTabOption = this.renderTabOption.bind(this);
    this.generateSyleOption = this.generateSyleOption.bind(this);
    this.styles = StyleSheet.create({
      tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
      },
      flexOne: {
        flex: 1,
      },
      tabs: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
      },
   });
  }

  generateSyleOption(styles) {
    let style = StyleSheet.flatten(this.styles);
    Object.keys(style).forEach((element) => {
      style[element] = StyleSheet.flatten(style[element])
    });
    let newStyle = StyleSheet.create({
      ...style,
      ...styles
    });
    this.styles = newStyle;
  }

  renderTabOption(name, page) {
  }

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return <Button
      style={this.styles.flexOne}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[this.styles.tab, this.props.tabStyle, ]}>
        <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
          {name}
        </Text>
      </View>
    </Button>;
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });
    return (
      <View style={[this.styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style,{height: this.props.height},]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View style={[tabUnderlineStyle, { left, }, this.props.underlineStyle, ]} />
      </View>
    );
  }
}



DefaultTabBar.propTypes = {
  goToPage: React.PropTypes.func,
  activeTab: React.PropTypes.number,
  tabs: React.PropTypes.array,
  backgroundColor: React.PropTypes.string,
  activeTextColor: React.PropTypes.string,
  inactiveTextColor: React.PropTypes.string,
  textStyle: Text.propTypes.style,
  tabStyle: ViewPropTypes.style,
  renderTab: React.PropTypes.func,
  underlineStyle: ViewPropTypes.style,
}

DefaultTabBar.defaultProps = {
  activeTextColor: 'navy',
  inactiveTextColor: 'black',
  backgroundColor: null,
  height: 50
}

module.exports = DefaultTabBar;
