import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Div, Header, Gallery, Button} from '@vkontakte/vkui';
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
                left={<HeaderButton onClick={this.props.goBack}>
                  {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </HeaderButton>}
              >
                Получить "{this.props.article.title}"
              </PanelHeader>
              <Group>
                <Div className="text-center">
                  Вы можете приобрести исключительный доступ к статье "{this.props.article.title}" за
                </Div>
                <Div>
                  <Button className="pay-subscribtion">{this.props.article.price}р.</Button>
                </Div>
              </Group>
              <Group>
                <Div>
                  Так же вы можете получить доступ, репостнув эту статью себе на стену<br />
                  (Только для публичных аккаунтов)
                  <Button level="outline" className="pay-subscribtion">Сделать репост</Button>
                </Div>
              </Group>
            </Panel>)
  }
}

export default GetOneArticle;
