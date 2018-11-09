import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Div, Header, Gallery, Button} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
const osname = platform();

class NewsChannelDescription extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return  (<Panel id={this.props.id}>
              <PanelHeader
                left={<HeaderButton onClick={this.props.go} data-to="subscribe">
                  {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </HeaderButton>}
              >
                {this.props.type} {this.props.label}
              </PanelHeader>
              <Div><img className="subscribe-channel-pic" src={this.props.label} /></Div>
              <Div>{this.props.label}</Div>
              <Div>{this.props.description}</Div>
              <Div>{this.props.price}р. за неделю подписки</Div>
              <Div className="double-buttons">
                <Button level="outline">Превью постов</Button>
                <Button onClick={() => {
                  this.props.goBack()
                  this.props.onSelect(this.props.type, this.props.label)
                }}>Добавить в подписку</Button>
              </Div>
            </Panel>)
  }
}

export default NewsChannelDescription;
