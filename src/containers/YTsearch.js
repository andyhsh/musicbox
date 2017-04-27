import React, { Component } from 'react';
import YoutubeFinder from 'youtube-finder';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AutoComplete from 'material-ui/AutoComplete';
import { addVideo } from '../actions/playlist';
import { YOUTUBE_CONFIG } from '../../config';

class YTsearch extends Component {
  constructor(props) {
    super(props);
    this.YoutubeSearch = YoutubeFinder.createClient({ key: YOUTUBE_CONFIG });
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

    // call Youtube API to search for videos, passing in the current input as arguments
    this.YoutubeSearch.search(params, (err, data) => {
      if (err) return console.log(err);

      // set dataSource state for autocomplete suggestions
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
    const video = {
      title: searchValue.title,
      videoId: searchValue.props.videoId,
      thumb: searchValue.props.thumb,
      // TODO: user property to identify the person who selected the song
    };

    // dispatch action to update playlist state with new video
    this.props.addVideo(video);
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
          hintText="Artist name - Song name"
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    addVideo: (video) => { dispatch(addVideo(video)); },
  };
};

export default connect(null, mapDispatchToProps)(YTsearch);
