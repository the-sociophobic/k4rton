import React from 'react';
import {Panel, PanelHeader, HeaderButton, platform, Div, FormLayout, FormLayoutGroup, Input, osname, IOS, Slider, Tabs, TabsItem} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Search from '@vkontakte/icons/dist/24/search';
  

const availiblePeriods = ['Неделя', 'Две недели', 'Месяц', '6 Месяцев', 'Год', '5 лет']

class SubscribePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      periodType: 1,
      tab: 'publishers',
      tags: [{
        label: 'политика',
        pic: 'https://www.google.ru/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjIuryC5cfeAhVBBSwKHTQQDi0QjRx6BAgBEAU&url=https%3A%2F%2Fwww.telegraf-spb.ru%2Fproduct%2Fflag-ssha%2F&psig=AOvVaw3XwmsRY4Fh9jbogAhskxsl&ust=1541869325677872',
        description: 'Lorem ipsum dolor sit amet',
        subscribers: 10 
      }, {
        label: 'политика',
        pic: 'https://www.google.ru/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjIuryC5cfeAhVBBSwKHTQQDi0QjRx6BAgBEAU&url=https%3A%2F%2Fwww.telegraf-spb.ru%2Fproduct%2Fflag-ssha%2F&psig=AOvVaw3XwmsRY4Fh9jbogAhskxsl&ust=1541869325677872',
        description: 'Lorem ipsum dolor sit amet',
        subscribers: 12 
      }, {
        label: 'политика',
        pic: 'https://www.google.ru/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjIuryC5cfeAhVBBSwKHTQQDi0QjRx6BAgBEAU&url=https%3A%2F%2Fwww.telegraf-spb.ru%2Fproduct%2Fflag-ssha%2F&psig=AOvVaw3XwmsRY4Fh9jbogAhskxsl&ust=1541869325677872',
        description: 'Lorem ipsum dolor sit amet',
        subscribers: 8 
      }, {
        label: 'политика',
        pic: 'https://www.google.ru/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjIuryC5cfeAhVBBSwKHTQQDi0QjRx6BAgBEAU&url=https%3A%2F%2Fwww.telegraf-spb.ru%2Fproduct%2Fflag-ssha%2F&psig=AOvVaw3XwmsRY4Fh9jbogAhskxsl&ust=1541869325677872',
        description: 'Lorem ipsum dolor sit amet',
        subscribers: 7 
      }],
      publishers: [{
        lable: 'Бумага'
      }]
    }
  }
  render() {
    return  (<Panel id={this.props.id}>
              <PanelHeader
                left={<HeaderButton onClick={this.props.go} data-to="home">
                  {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </HeaderButton>}
                noShadow={false}
                right={
                  <HeaderButton>
                    <Icon24Search />
                  </HeaderButton>
                }
              >
                Гибкая подписка
              </PanelHeader>
              <FormLayout>
                {/*<FormLayoutGroup top="Ваш промокод" bottom="Промокод позволит Вам получить скидку или период бесплатный подписки">
                  <Input value={this.state.period} onChange={value=>{this.setState({ code: value })}} />
                </FormLayoutGroup>*/}
                <FormLayoutGroup top={"Интервал подписки: " + availiblePeriods[this.state.periodType - 1]} bottom={'Подписка оформляется на выбранный период'}>
                  <Slider
                    step={1}
                    min={0}
                    max={availiblePeriods.length}
                    value={Number(this.state.periodType)}
                    onChange={value => this.setState({ periodType: value > 0 ? value : 1 })}
                  />
                </FormLayoutGroup>
                <FormLayoutGroup>
                    <Tabs>
                      <TabsItem
                        onClick={() => this.setState({ tab: 'publishers' })}
                        selected={this.state.tab === 'publishers'}
                      >
                        Издатели
                      </TabsItem>
                      <TabsItem
                        onClick={() => this.setState({ tab: 'tags' })}
                        selected={this.state.tab === 'tags'}
                      >
                        Теги
                      </TabsItem>
                    </Tabs>
                </FormLayoutGroup>
              </FormLayout>
            </Panel>)
  }
}

export default SubscribePage