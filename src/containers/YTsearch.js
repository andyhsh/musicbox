import React, { Component } from 'react';
import YoutubeFinder from 'youtube-finder';

import AutoComplete from 'material-ui/AutoComplete';


class YTsearch extends Component {
  constructor(props) {
    super(props);
    this.YoutubeSearch = YoutubeFinder.createClient({ key: 'AIzaSyAaWYJ1KOkozXAM6PnC5zHrIwHt42rtRQ0' });
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.dataSourceConfig = {
      text: 'title',
      value: 'props',
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

    // call Youtube API to search for videos
    this.YoutubeSearch.search(params, (err, data) => {
      if (err) return console.log(err);
      console.log(data);
      const dataSource = data.items.map(query => {
        return {
          title: query.snippet.title,
          props: {
            videoId: query.id.videoId,
            thumb: query.snippet.thumbnails.default.url,
          },
        };
      });

      return this.setState({
        dataSource,

      });
    });
  }

  // Add music video to playlist
  handleNewRequest(searchValue) {
    console.log(searchValue);
      // TODO: dispatch action to update redux state of playlist
  }

  render() {
    return (
      <AutoComplete
        hintText="Artist name - Song name"
        floatingLabelText="Search"
        onUpdateInput={this.handleUpdateInput} // callback for update on form
        onNewRequest={this.handleNewRequest} // callback for when user selects
        dataSource={this.state.dataSource} // autocomplete list
        dataSourceConfig={this.dataSourceConfig} // structure the datasource configuration
        filter={AutoComplete.caseInsensitiveFilter} // normalize the autocomplete filter
      />
    );
  }
}

export default YTsearch;
