import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Div, Header, Gallery, Button} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import AppState from '../components/AppState'
const osname = platform();

class NewsChannelDescription extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return  (<Panel id={this.props.id}>
              <PanelHeader
                left={<HeaderButton onClick={this.props.goBack}>
                  {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </HeaderButton>}
              >
                {this.props.type} {this.props.label}
              </PanelHeader>
              <AppState.Consumer>{(globalState) => {
                const isSelected = globalState.subscribingProcess.selected.tags.concat(globalState.subscribingProcess.selected.publishers).includes(globalState.preview.label)
                return  <React.Fragment>
                          <Div><img className="subscribe-channel-pic" src={globalState.preview.pic} /></Div>
                          <Div>{globalState.preview.type === 'tag' ? 'Смарт-тег' : 'Авторские рассылки издателя'} {globalState.preview.label}</Div>
                          <Div>{globalState.preview.description}</Div>
                          <Div>{globalState.preview.price}р. за неделю подписки</Div>
                          <Div className="double-buttons">
                            <Button level="outline">Превью постов</Button>
                            <Button onClick={() => {
                              this.props.goBack()
                              window.setGlobalState(oldState => {
                                if (!isSelected)
                                  oldState.subscribingProcess.selected[globalState.preview.type].push(globalState.preview.label)
                                else
                                  oldState.subscribingProcess.selected[globalState.preview.type].splice(
                                    oldState.subscribingProcess.selected[globalState.preview.type].indexOf(globalState.preview.label), 1)
                                return oldState
                              })
                            }}>{isSelected ? 'Удалить из подписки' : 'Добавить в подписку'}</Button>
                          </Div>
                        </React.Fragment>
              }}</AppState.Consumer>
            </Panel>)
  }
}

export default NewsChannelDescription;
