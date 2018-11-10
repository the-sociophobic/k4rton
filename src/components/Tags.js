import React from 'react';
import {HorizontalScroll, Button} from '@vkontakte/vkui';

import { tagColor } from './../utils/utils'

class Tags extends React.Component {
  render() {
    let tags = this.props.tags;
    let selectedTags = this.props.selectedTags;

    return (
      <HorizontalScroll>
      {
        tags.map(tag => {
          let style = {};
          if (typeof selectedTags == "undefined" || selectedTags.includes(tag))
            style = {
              margin: "0 5px",
              background: tagColor(tag),
              color: "white",
            };
          else
            style = {
              margin: "0 5px",
              background: "rgba(1, 1, 1, 0)",
              color: tagColor(tag),
              boxShadow: "inset 0px 0px 0px 1px " + tagColor(tag),
            };

          return (
            <Button
              onClick={() => this.props.toggleTag(tag)}
              style={style}
            >
              #{tag}
            </Button>
          );
        })
      }
      </HorizontalScroll>
    );
  }
}

export default Tags;