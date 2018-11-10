import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Div, Group, Button} from '@vkontakte/vkui';
import Icon16Lock from '@vkontakte/icons/dist/16/lock';
import lock from '../img/lock.svg';

const osname = platform();

class PayWall extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return   <Div>
               <img className="lock-icon" src={lock}/>
               <Div className="payWall-title">Вы видете только {this.props.part ? (this.props.part + '%') : 'часть'} статьи,<br />чтобы  прочитать её полностью вы можете:</Div>
               <Div className="double-buttons">
                 <Button level="outline" onClick={() => this.props.goToGetArticlePage()}>Получить доступ к этой статье</Button>
                 <Button onClick={() => this.props.goToSubscribePage()}>Оформить гибкую подписку</Button>
               </Div>
             </Div>
  }
}

export default PayWall