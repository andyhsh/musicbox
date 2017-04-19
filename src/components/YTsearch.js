import React, { Component } from 'react';
import YoutubeFinder from 'youtube-finder';

import AutoComplete from 'material-ui/AutoComplete';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class YTsearch extends Component {
  constructor(props) {
    super(props);
    this.YoutubeSearch = YoutubeFinder.createClient({ key: 'AIzaSyAaWYJ1KOkozXAM6PnC5zHrIwHt42rtRQ0' });
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.dataSourceConfig = {
      text: 'description',
      value: 'videoId',
    };
    this.state = {
      dataSource: [],
      inputValue: '',
    };
  }

  handleUpdateInput(inputValue) {
    // if input value is less than 3 characters, reset search field
    if (inputValue.length <= 2) {
      this.setState({
        inputValue,
        dataSource: [],
      });
      return;
    }

    this.setState({
      inputValue,
    });

    const params = {
      part: 'snippet, id',
      type: 'video',
      q: inputValue,
      maxResults: 10,
    };

    this.YoutubeSearch.search(params, (err, data) => {
      if (err) return console.log(err);
      const dataSource = data.items.map(query => {
        return {
          description: query.snippet.title,
          videoId: query.id.videoId,
        };
      });
      return this.setState({
        dataSource,
      });
    });
  }

  handleNewRequest(searchValue) {
    const params = {
      part: 'snippet, id',
      type: 'video',
      q: searchValue,
      maxResults: 10,
    };
    console.log(searchValue);
    this.YoutubeSearch.search(params, function (err, data) {
      if (err) return console.log(err);
      // TODO: dispatch action to update redux state of playlist
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <AutoComplete
          hintText="Artist name - Song name"
          floatingLabelText="Search"
          onUpdateInput={this.handleUpdateInput} // callback for update on form
          onNewRequest={this.handleNewRequest} // callback for when user selects
          dataSource={this.state.dataSource} // autocomplete list
          dataSourceConfig={this.dataSourceConfig}
          filter={AutoComplete.caseInsensitiveFilter}
        />
      </MuiThemeProvider>
    );
  }
}

export default YTsearch;
