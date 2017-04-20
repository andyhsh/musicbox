import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuButton from 'material-ui/svg-icons/navigation/menu';
import YTsearch from './YTsearch';
import Playlist from './Playlist';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    const iconStyles = {
    // TODO: style the navigation icon
    };

    return (
      <div>
        <MenuButton
          style={iconStyles}
          onTouchTap={this.handleToggle}
        />
        <Drawer width={400} openSecondary={true} open={this.state.open} >
          <MenuButton
            style={iconStyles}
            onTouchTap={this.handleToggle}
          />
          <YTsearch />
          <Playlist />
        </Drawer>
      </div>
    );
  }
}

export default Sidebar;
