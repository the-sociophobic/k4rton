import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Div, Header, Gallery, Button, Spinner} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import axios from 'axios'
const osname = platform();

class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
  	// if (!window.getGlobalState().currentSubscribtion || (window.getGlobalState().currentSubscribtion.tags.length + window.getGlobalState().currentSubscribtion.publishers.length === 0)) {
			// setTimeout(() => this.props.open('subscribe'))
  	// } else {
			setTimeout(() => this.props.open('feed'))
  	// }
    return  (<Panel id={this.props.id}>
              <Div>
                <Spinner />
              </Div>
            </Panel>)
  }
}

export default Home;
