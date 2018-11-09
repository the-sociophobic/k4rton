import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Div, Header, Gallery, Spinner} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
const osname = platform();

class Payment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paymentDone: false
    }
  }
  componentDidMount() {
    setTimeout(() => this.setState({paymentDone: true}), 500)
    setTimeout(() => this.props.callback(), 1500)
  }
  render() {
    return  (<Panel id={this.props.id}>
              <PanelHeader
                left={<HeaderButton onClick={this.props.go} data-to="home">
                  {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </HeaderButton>}
              >
                {() => {
                  if (this.state.paymentDone) {
                   return 'Оплата успешно завершена'
                  } else
                  if (this.state.paymentError) {
                   return 'Ошибка оплаты'
                  } else {
                    return 'Перенаправление на vk pay...'
                  }
                }}
              </PanelHeader>
            </Panel>)
  }
}

export default Payment;
