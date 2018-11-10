import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Div, Header, Gallery, Button, List, Cell} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import AppState from '../components/AppState'
import {Doughnut} from 'react-chartjs-2'
const osname = platform();

class PublisherAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Бумага',
      subscribers: 12,
      profit: 1000,
      tags: [{
        label: 'Политика',
        value: 60
      }, {
        label: 'Урбанистика',
        value: 20
      }, {
        label: 'Мемы',
        value: 10
      }, {
        label: 'Очень важный тег',
        value: 10
      }]
    }
  }
  render() {
    const tags = (() => {
      const coppyOfStateTags = [...this.state.tags]
      const sortedTags = coppyOfStateTags.sort((a, b) => a.value > b.value ? -1 : 1)
      return sortedTags.slice(0, 15)
    })()
    return  (<Panel id={this.props.id}>
              <PanelHeader
                left={<HeaderButton onClick={this.props.goBack}>
                  {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </HeaderButton>}
              >
                {this.props.type} {this.props.label}
              </PanelHeader>
              <Group>
                <List>
                  <Cell className="text-center">
                    <Header className="display-block-header">{this.state.name}</Header>
                    <small>Авторский канал</small>
                  </Cell>
                </List>
              </Group>
              <Doughnut
                width={200}
                data={{
                  labels: tags.map(tag => tag.label),
                  datasets: [{
                    data: tags.map(tag => tag.value),
                    backgroundColor: ["PeachPuff", "DarkSalmon", "PapayaWhip", "LightYellow", "Khaki", "MediumPurple", "DarkViolet", "LightSalmon", "IndianRed", "LemonChiffon", "Salmon", "DarkOrchid", "Moccasin", "LightGoldenrodYellow", "BlueViolet", "PaleGoldenrod", "LightCoral", "DarkKhaki"]
                  }]
                }} />
              <Div className="text-center">Самые прибыльные теги</Div>
              <Group>
                <List>
                  <Cell className="text-center">
                    Баланс: <span className="publisher-profit">{this.state.profit}р.</span>
                    <br />
                    <br />
                    <small>Запросить вывод</small>
                  </Cell>
                </List>
              </Group>
              <Div className="double-buttons">
                <Button level="outline">История всех постов</Button>
                <Button onClick={() => this.props.open('article-editor')}>Создать новый пост</Button>
              </Div>
              {/*<PieChart
                size={300}
                innerHoleSize={200}
                data={this.state.tags.map(tag => ({
                  key: tag.label,
                  value: tag.value
                }))}
              />*/}
            </Panel>)
  }
}

export default PublisherAccount