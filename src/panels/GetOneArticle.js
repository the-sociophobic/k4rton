import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Div, Header, Gallery, Spinner} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
const osname = platform();

class GetOneArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return  (<Panel id={this.props.id}>
              <PanelHeader
                left={<HeaderButton onClick={this.props.go} data-to="home">
                  {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </HeaderButton>}
              >
                Статья {this.props.articleTitle}
              </PanelHeader>
              <Group>
                1
              </Group>
              <Group>
                2
              </Group>
            </Panel>)
  }
}

export default GetOneArticle;
