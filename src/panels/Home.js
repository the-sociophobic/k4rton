import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Div, Header, Gallery, Button} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
const osname = platform();

class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return  (<Panel id={this.props.id}>
              <PanelHeader>
                Home page
              </PanelHeader>
              <Div>
                <Button className="pay-subscribtion" level="outline" onClick={() => this.props.open('article')}>Идти к персику</Button>
              </Div>
            </Panel>)
  }
}

export default Home;
