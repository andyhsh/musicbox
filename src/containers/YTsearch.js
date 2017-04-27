import React, { Component } from 'react';
import YoutubeFinder from 'youtube-finder';
import PropTypes from 'prop-types';

import AutoComplete from 'material-ui/AutoComplete';
import { YOUTUBE_CONFIG } from '../../config';

class YTsearch extends Component {
  constructor(props) {
    super(props);
    this.YoutubeSearch = YoutubeFinder.createClient({ key: YOUTUBE_CONFIG });
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.dataSourceConfig = {
      text: 'track',
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

    // call Youtube API to search for videos, passing in the current input as arguments
    this.YoutubeSearch.search(params, (err, data) => {
      if (err) return console.log(err);

      // set dataSource state for autocomplete suggestions
      const dataSource = data.items.map(query => {
        return {
          track: query.snippet.title,
          videoId: query.id.videoId,
        };
      });

      return this.setState({
        dataSource,
      });
    });
  }

  // Add music video to playlist
  handleNewRequest(searchValue) {
    console.log('click');
    const video = {
      track: searchValue.track,
      videoId: searchValue.videoId,
    };
    // dispatch action to update playlist state with new video
    this.props.addVideo(video, this.props.channel, this.props.user.displayName);
    this.setState({
      inputValue: '',
    });
  }

  render() {
    /* onUpdateInput: callback for update on form */
    /* onNewRequest: callback for when user selects */
    /* dataSource: autocomplete datalist */
    /* dataSourceConfig: structure the datasource configuration */
    /* filter: normalize the autocomplete filter */
    return (
      <div>
        <AutoComplete
          hintText="Artist name - Track name"
          floatingLabelText="Search"
          searchText={this.state.inputValue}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          dataSource={this.state.dataSource}
          dataSourceConfig={this.dataSourceConfig}
          filter={AutoComplete.caseInsensitiveFilter}
          fullWidth
        />
      </div>
    );
  }
}

YTsearch.propTypes = {
  addVideo: PropTypes.func.isRequired,
  channel: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default YTsearch;
