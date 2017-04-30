import React, { Component } from 'react';
import YoutubeFinder from 'youtube-finder';
import PropTypes from 'prop-types';

import AutoComplete from 'material-ui/AutoComplete';
import { YOUTUBE_CONFIG } from '../config';

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
      maxResults: 9,
    };

    // call Youtube API to search for videos, passing in the current input as arguments
    this.YoutubeSearch.search(params, (err, data) => {
      if (err) return console.log(err);

      // set dataSource state for autocomplete suggestions
      let dataSource = data.items.map(query => {
        return {
          track: query.snippet.title,
          videoId: query.id.videoId,
        };
      });
      // Grab related videos of the top matching result from youtube search
      const relatedVideos = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${data.items[0].id.videoId}&type=video&key=${YOUTUBE_CONFIG}`;
      fetch(relatedVideos)
        .then(response => response.json())
        .then(parsedResponse => {
          const relatedVideo = {
            track: `Related: ${parsedResponse.items[0].snippet.title}`,
            videoId: parsedResponse.items[0].id.videoId,
          };
          dataSource.push(relatedVideo);
        })
        .then(response => {
          return this.setState({
            dataSource,
          });
        });
    });
  }

  // Add music video to playlist
  handleNewRequest(searchValue) {
    debugger;
    let trackName = searchValue.track;

    if (trackName.includes('Related: ')) {
      trackName = trackName.replace('Related: ', '');
    }

    const video = {
      track: trackName,
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
