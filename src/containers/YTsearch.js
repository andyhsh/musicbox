import React, { Component } from 'react';
import YoutubeFinder from 'youtube-finder';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AutoComplete from 'material-ui/AutoComplete';
import { addPlaylist } from '../actions/playerlist';


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
    this.props.addPlaylist(video);
    this.setState({
      inputValue: '',
    });
  }

  render() {
    return (
      <div className="">
        <AutoComplete
          hintText="Artist name - Song name"
          floatingLabelText="Search"
          searchText={this.state.inputValue}
          onUpdateInput={this.handleUpdateInput} // callback for update on form
          onNewRequest={this.handleNewRequest} // callback for when user selects
          dataSource={this.state.dataSource} // autocomplete list
          dataSourceConfig={this.dataSourceConfig} // structure the datasource configuration
          filter={AutoComplete.caseInsensitiveFilter} // normalize the autocomplete filter
          fullWidth={true}
        />
      </div>
    );
  }
}

YTsearch.propTypes = {
  addPlaylist: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPlaylist: (video) => { dispatch(addPlaylist(video)); },
  };
};

export default connect(null, mapDispatchToProps)(YTsearch);
