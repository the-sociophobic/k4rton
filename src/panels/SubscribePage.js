import React from 'react';
import {Panel, PanelHeader, HeaderButton, platform, Div, Popout, FormLayout, FixedLayout, Cell, List, Group, Search, FormLayoutGroup, Input, osname, InfoRow, IOS, Button, Link, Slider, Tabs, TabsItem} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon28Info from '@vkontakte/icons/dist/28/info_outline';
import AppState from '../components/AppState'
import axios from 'axios'
import connect from '@vkontakte/vkui-connect';

const availiblePeriods = ['Неделя', 'Две недели', 'Месяц', '6 Месяцев', 'Год', '5 лет']
const periodTypeToTime = (type) => {
  if (type === 1)
    return 1000 * 60 * 60 * 24 * 7
  if (type === 2)
    return 1000 * 60 * 60 * 24 * 14
  if (type === 3)
    return 1000 * 60 * 60 * 24 * 30
  if (type === 4)
    return 1000 * 60 * 60 * 24 * 30 * 6
  if (type === 5)
    return 1000 * 60 * 60 * 24 * 30 * 12
  return 0
}

class SubscribePage extends React.Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
    this.sumPrice = 0
    this.state = {
      code: '',
      tab: 'publishers',
      searchOpened: false,
      filter: '',
      tags: [],
      publishers: [],
    }
  }

  VKPay(amount) {
    connect.send("VKWebAppOpenPayForm", { 
      "app_id": 6746945, 
      "action": "pay-to-group", 
      "params": { 
          "amount": amount, 
          "description": "тестовый платеж", 
          "group_id": 132153534 
          } 
      });
  }

  subscribe() {
    this.VKPay(/*this.sumPrice*/1)
    const subscribing = window.getGlobalState().subscribingProcess
    setTimeout(() => {
      axios.post(window.getGlobalState().apiUrl + '/subscriptions', {
        subscriptions: {
          tags: subscribing.selected.tags,
          publishers: subscribing.selected.publishers,
          endDate: new Date(Date.now() + periodTypeToTime(subscribing.periodType)).getTime(),
          autoDeposit: true
        },
        userId: window.getGlobalState().auth.id,
        signedUserId: window.getGlobalState().auth.id //window.getGlobalState().auth.signed_user_id
      }).then(() => {
        this.props.goBack()
      }).catch(console.log)
    }, 5000)
  }
  // componentWillMount() {
  //   connect.subscribe(e => {
  //     // console.log(e)
  //     if (e.type === 'VKWebAppOpenPayFormResult') {
  //       const subscribing = window.getGlobalState().subscribingProcess
  //       axios.post(window.getGlobalState().apiUrl + '/subscriptions', {
  //         subscriptions: {
  //           tags: subscribing.selected.tags,
  //           publishers: subscribing.selected.publishers,
  //           endDate: new Date(Date.now() + periodTypeToTime(subscribing.periodType)).getTime(),
  //           autoDeposit: true
  //         },
  //         userId: window.getGlobalState().auth.id,
  //         signedUserId: window.getGlobalState().auth.id //window.getGlobalState().auth.signed_user_id
  //       }).then(() => {
  //         this.props.goBack()
  //       }).catch(console.log)
  //     }
  //   })
  // }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    axios.get(`${window.getGlobalState().apiUrl}/tagsAndPublishers`).then(res => {
      this.setState({
        tags: res.data.result.tags.map(tag => {
          tag.price = Math.round(Math.random() * 20 * 100) / 100 + 2
          return tag
        }),
        publishers: res.data.result.publishers.map(publisher => {
          publisher.price = Math.round(Math.random() * 20 * 100) / 100 + 2
          return publisher
        })
      })
    }).catch(console.log)
    // axios.get()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll() {
    if (window.pageYOffset > 73) {
      !this.state.fixedOverlay && this.setState({fixedOverlay: true})
    } else {
      this.state.fixedOverlay && this.setState({fixedOverlay: false})
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
  renderTabs() {
    return  <Tabs>
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
  }
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
                    <FixedLayout style={(this.state.fixedOverlay || this.state.filter !== '') ? {opacity: 1, transition: '.3s all', pointerEvents: 'all'} : {opacity: 0, transition: '.3s all', pointerEvents: 'none'}}>
                      <Search placeholder={"Поиск по " + ( this.state.tab === 'tags' ? 'смарт-тегам' : 'авторским каналам' )} theme="default" onChange={value => this.setState({filter: value})} value={this.state.filter} />
                      {this.renderTabs()}
                    </FixedLayout>
                    <FormLayout>
                      {/*<FormLayoutGroup top="Ваш промокод" bottom="Промокод позволит Вам получить скидку или период бесплатный подписки">
                        <Input value={this.state.period} onChange={value=>{this.setState({ code: value })}} />
                      </FormLayoutGroup>*/}
                      <Group top={"Интервал подписки: " + availiblePeriods[state.periodType - 1]} bottom={''/*'Подписка оформляется на выбранный период'*/}>
                        <List>
                          <Div>
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
                          </Div>
                        </List>
                      </Group>
                      {(state.selected.publishers.length + state.selected.tags.length > 0) &&
                      <React.Fragment>
                        <Div>
                          <Button level="outline" className="pay-subscribtion" onClick={() => {
                            window.setGlobalState(oldState => {
                              oldState.previewFeedMode = {
                                publishers: oldState.subscribingProcess.selected.publishers,
                                tags: oldState.subscribingProcess.selected.tags,
                              }
                              return oldState
                            })
                            this.props.open('feed')
                          }}>Посмотреть превью вашей новостной ленты</Button>
                        </Div>
                        <Group><List>{state.selected.publishers.concat(state.selected.tags).map((label) => {
                          const item = this.state.publishers.concat(this.state.tags).find(a => a.label == label)
                          if (!item)
                            return <Cell>-</Cell>
                          const isTag = this.state.tags.find(a => a.label == label) !== undefined
                          sumPrice += priceTimeFactor(item.price, state.periodType)
                          this.sumPrice = sumPrice
                          return  <Cell>
                                    {(isTag ? '#' : '') + item.label} - {priceTimeFactor(item.price, state.periodType)}р.
                                    <Button level="outline" className="remove-from-subscribtions-btn"
                                      onClick={() => window.setGlobalState(oldState => {
                                        oldState.subscribingProcess.selected[isTag ? 'tags' : 'publishers'].splice(oldState.subscribingProcess.selected[isTag ? 'tags' : 'publishers'].indexOf(item.label), 1)
                                        return oldState
                                      })}>x</Button>
                                  </Cell>})}
                        <Cell><Button className="pay-subscribtion" onClick={() => this.subscribe()}>Получить подписку за 
                          {((discount == 0) ? (' ' + sumPrice + 'р.') : <React.Fragment> <span className="line-throw">{sumPrice}р.</span> {Math.round(sumPrice * (1 - discount) * 100) / 100}р.</React.Fragment>)}
                        </Button></Cell>
                        </List></Group>
                      </React.Fragment>}
                      <FormLayoutGroup>
                        {!(!this.state.fixedOverlay && this.state.filter !== '') && this.renderTabs()}
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

const priceTimeFactor = (price, periodType) => Math.round(price * periodType * 100) / 100