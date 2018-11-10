import React from 'react';
import {Panel, PanelHeader, HeaderButton, platform, Div, Popout, FormLayout, Cell, List, Group, Search, FormLayoutGroup, Input, osname, InfoRow, IOS, Button, Link, Slider, Tabs, TabsItem} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon28Info from '@vkontakte/icons/dist/28/info_outline';
import AppState from '../components/AppState'

const availiblePeriods = ['Неделя', 'Две недели', 'Месяц', '6 Месяцев', 'Год', '5 лет']

class SubscribePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      tab: 'publishers',
      searchOpened: false,
      filter: '',
      tags: [{
        label: 'политика',
        pic: 'https://www.telegraf-spb.ru/published/publicdata/B622311/attachments/SC/products_pictures/united-states-flag_enl.jpg',
        description: 'Lorem ipsum dolor sit amet',
        subscribers: 10,
        publishers: ['Бумага', 'Лентач'],
        price: 123
      }, {
        label: 'политика',
        pic: 'https://www.telegraf-spb.ru/published/publicdata/B622311/attachments/SC/products_pictures/united-states-flag_enl.jpg',
        description: 'Lorem ipsum dolor sit amet',
        subscribers: 12,
        publishers: ['Бумага', 'Лентач'],
        price: 123
      }, {
        label: 'политика',
        pic: 'https://www.telegraf-spb.ru/published/publicdata/B622311/attachments/SC/products_pictures/united-states-flag_enl.jpg',
        description: 'Lorem ipsum dolor sit amet',
        subscribers: 8,
        publishers: ['Бумага', 'Лентач'],
        price: 123
      }, {
        label: 'политика',
        pic: 'https://www.telegraf-spb.ru/published/publicdata/B622311/attachments/SC/products_pictures/united-states-flag_enl.jpg',
        description: 'Lorem ipsum dolor sit amet',
        subscribers: 7,
        publishers: ['Бумага', 'Лентач'],
        price: 123
      }],
      publishers: [{
        label: 'Бумага',
        pic: 'https://www.telegraf-spb.ru/published/publicdata/B622311/attachments/SC/products_pictures/united-states-flag_enl.jpg',
        description: 'Бумага, рвётся, горит, делается из трёх тростников',
        subscribers: 11,
        price: 123
      }, {
        label: 'Лентач',
        pic: 'https://www.telegraf-spb.ru/published/publicdata/B622311/attachments/SC/products_pictures/united-states-flag_enl.jpg',
        description: 'Бумага, рвётся, горит, делается из трёх тростников',
        subscribers: 11,
        price: 123
      }],
    }
  }
  // componentDidMount() {
  //   const newState = {selected: {}}
  //   const globalState = window.getGlobalState()
  //   if (globalState.article.publisher)
  //     newState.selected.publishers = [globalState.article.publisher]
  //   if (globalState.article.tags)
  //     newState.selected.tags = globalState.article.tags
  //   this.setState(newState)
  // }
  render() {
    return (
        <AppState.Consumer>
        {(globalState) => {
          const state = globalState.subscribingProcess
          console.log(state)
          let sumPrice = 0
          let discount = 0
          if (state.selected.publishers.length + state.selected.tags.length > 1) {
            discount = (state.selected.publishers.length + state.selected.tags.length) / 15
            if (discount > 0.5)
              discount = 0.5
          }
          return  (<Panel id={this.props.id}>
                    <PanelHeader
                      left={<HeaderButton onClick={this.props.goBack}>
                        {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                      </HeaderButton>}
                      noShadow={true}
                      right={
                        <HeaderButton onClick={this.props.goBack}>
                          <Icon24Search />
                        </HeaderButton>
                      }
                    >
                      Гибкая подписка
                    </PanelHeader>
                    <Search theme="default" onChange={value => this.setState({filter: value})} value={this.state.filter} />
                    <FormLayout>
                      {/*<FormLayoutGroup top="Ваш промокод" bottom="Промокод позволит Вам получить скидку или период бесплатный подписки">
                        <Input value={this.state.period} onChange={value=>{this.setState({ code: value })}} />
                      </FormLayoutGroup>*/}
                      <Group top={"Интервал подписки: " + availiblePeriods[state.periodType - 1]} bottom={''/*'Подписка оформляется на выбранный период'*/}>
                        <List>
                          <Cell>
                            <Slider
                              step={1}
                              min={0}
                              max={availiblePeriods.length}
                              value={Number(state.periodType)}
                              onChange={value => window.setGlobalState((oldState) => { 
                                oldState.subscribingProcess.periodType = value > 0 ? value : 1
                                return oldState
                              })}
                            />
                          </Cell>
                        </List>
                      </Group>
                      {(state.selected.publishers.length + state.selected.tags.length > 0) &&
                      <React.Fragment>
                        <Button level="outline">Посмотреть превью вашей новостной ленты</Button>
                        <Group><List>{state.selected.publishers.concat(state.selected.tags).map((label) => {
                          const item = this.state.publishers.concat(this.state.tags).find(a => a.label == label)
                          const isTag = this.state.tags.find(a => a.label == label) !== undefined
                          sumPrice += priceTimeFactor(item.price, state.periodType)
                          return  <Cell>
                                    {(isTag ? '#' : '') + item.label} - {priceTimeFactor(item.price, state.periodType)}р.
                                    <Button level="outline" className="remove-from-subscribtions-btn"
                                      onClick={() => window.setGlobalState(oldState => {
                                        oldState.subscribingProcess.selected[isTag ? 'tags' : 'publishers'].splice(oldState.subscribingProcess.selected[isTag ? 'tags' : 'publishers'].indexOf(item.label), 1)
                                        return oldState
                                      })}>x</Button>
                                  </Cell>})}
                        <Cell><Button className="pay-subscribtion">Получить подписку за 
                          {((discount == 0) ? (' ' + sumPrice + 'р.') : <React.Fragment> <span className="line-throw">{sumPrice}р.</span> {Math.round(sumPrice * (1 - discount) * 100) / 100}р.</React.Fragment>)}
                        </Button></Cell>
                        </List></Group>
                      </React.Fragment>}
                      <FormLayoutGroup>
                        <Tabs>
                          <TabsItem
                            onClick={() => this.setState({ tab: 'publishers' })}
                            selected={this.state.tab === 'publishers'}
                          >
                            Авторские рассылки {this.state.filter === '' ? '' : ('(' + this.state.publishers.filter(publisher => publisher.label.toLowerCase().includes(this.state.filter.toLowerCase())).length + ')')}
                          </TabsItem>
                          <TabsItem
                            onClick={() => this.setState({ tab: 'tags' })}
                            selected={this.state.tab === 'tags'}
                          >
                            Smart-Теги {this.state.filter === '' ? '' : ('(' + this.state.tags.filter(tag => tag.label.toLowerCase().includes(this.state.filter.toLowerCase())).length + ')')}
                          </TabsItem>
                        </Tabs>
                        {this.state[this.state.tab].filter(item => item.label.toLowerCase().includes(this.state.filter.toLowerCase())).map(item =>
                        <Button level="outline" className="subscribe-source-btn"
                          onClick={() => !state.selected[this.state.tab].includes(item.label) ?
                            window.setGlobalState(oldState => {
                              oldState.subscribingProcess.selected[this.state.tab].push(item.label)
                              oldState.subscribingProcess.manuallyChanged = true
                              return oldState
                            }) :
                            window.setGlobalState(oldState => {
                              return oldState
                              // ----
                              oldState.subscribingProcess.selected[oldState.tab].splice(oldState.selected[this.state.tab].indexOf(item.label), 1)
                              return oldState
                            })
                          }>
                          <img className="subscribe-pic" src={item.pic} />
                          {item.label} - 
                          {!state.selected[this.state.tab].includes(item.label) ? (' ' + priceTimeFactor(item.price, state.periodType) + 'р.') : 'добавлено'}
                          <Link onClick={(e) => {
                            e.stopPropagation()
                            window.setGlobalState({
                              preview: Object.assign(item, {type: this.state.tab})
                            })
                            this.props.open('channel-preview')
                          }}><Icon28Info /></Link>
                        </Button>)}
                      </FormLayoutGroup>
                    </FormLayout>
                  </Panel>)
          
        }}
        </AppState.Consumer>
    )
  }
}

export default SubscribePage

const priceTimeFactor = (price, periodType) => price * periodType