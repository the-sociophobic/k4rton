import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Div, Header, Gallery, Button} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import axios from 'axios'
import connect from '@vkontakte/vkui-connect';
import { getUrlData } from '../utils/utils'
const osname = platform();

class GetOneArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  getAccess() {
    axios.post(`${window.getGlobalState().apiUrl}/buyArticle`, {
      userId: window.getGlobalState().auth.id,
      signedUserId: window.getGlobalState().auth.signed_user_id,
      articleId: getUrlData().article
    })
      .then(() => {
        this.props.goBack()
      }).catch(console.log)
  }
  // componentWillMount() {
  //   connect.subscribe(e => {
  //     if (e.type === 'VKWebAppShareResult' || e.type === 'VKWebAppOpenPayFormResult')
  //       this.getAccess()
  //   })
  // }
  repost() {
    connect.send("VKWebAppShare", {"link": `https://vk.com/app6746731#page=article&article=${window.getGlobalState().article.id}`})
    setTimeout(() => this.getAccess(), 5000)
  }
  VKPay(amount) {
    connect.send("VKWebAppOpenPayForm", { 
      "app_id": 6746945, 
      "action": "pay-to-group", 
      "params": { 
          "amount": /*amount*/1, 
          "description": "тестовый платеж", 
          "group_id": 132153534 
          } 
      });
    setTimeout(() => this.getAccess(), 5000)
  }
  pay() {
    this.VKPay(window.getGlobalState().article.priceW)
  }
  render() {
    return  (<Panel id={this.props.id}>
              <PanelHeader
                left={<HeaderButton onClick={this.props.goBack}>
                  {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </HeaderButton>}
              >
                Получить "{window.getGlobalState().article.title}"
              </PanelHeader>
              <Group>
                <Div className="text-center">
                  Вы можете приобрести исключительный доступ к статье "{window.getGlobalState().article.title}" за
                </Div>
                <Div>
                  <Button className="pay-subscribtion" onClick={() => this.pay()}>{window.getGlobalState().article.price}р.</Button>
                </Div>
              </Group>
              <Group>
                <Div>
                  Так же вы можете получить доступ, репостнув эту статью себе на стену<br />
                  (Только для публичных аккаунтов)
                  <Button level="outline" className="pay-subscribtion" onClick={() => this.repost()}>Сделать репост</Button>
                </Div>
              </Group>
            </Panel>)
  }
}

export default GetOneArticle;
