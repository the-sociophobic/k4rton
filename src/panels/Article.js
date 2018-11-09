import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Div, Header, Gallery, Spinner} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import axios from 'axios'

import PayWall from '../components/PayWall.js'

const osname = platform();

class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      article: null
    }
  }
  componentWillReceiveProps (props) {
    if (props.article !== null && (this.state.article === null || this.state.article.title !== props.article.title)) {
      axios.get('/about-lorem-ipsum.json').then(res => {
        this.setState({article: res.data})
        this.props.setPayWallData({
          tags: res.data.tags,
          publisher: res.data.publisher,
          title: res.data.title,
          price: res.data.price,
        })
      }).catch((e) => {
        this.setState({article: {
          title: 'Упс...',
          article: [{
            type: 'text',
            text: 'Произошла ошибка при загрузке статьи'
          }, {
            type: 'text',
            text: 'Подробности в консоли'
          }]
        }})
      })
    }
  }
  genArticle(articleNodes) {
    return  <React.Fragment>
              {this.state.article.article.map((node, i) => {
                const className = i === this.state.article.article.length - 1 && this.state.article.payWall && 'last-text-block'
                switch(node.type) {
                  case 'text':
                    return <Div className={className}>{node.text}</Div>
                    break
                  case 'header':
                    return <Header className={className} level={node.size ? (node.size + '') : '1'}>{node.text}</Header>
                    break
                  case 'gallery':
                    return <Gallery
                        className={className}
                        slideWidth="500px"
                        style={{ height: 500, width: 600 }}
                        bullets="dark"
                      >{node.pics.map(pic => <img src={pic}/>)}</Gallery>
                    break
                  default:
                    return <Div className={className}>Error, unkonw node type: {node.type}</Div>
                }
              })}
              {this.state.article.payWall && <PayWall
                part={this.state.article.payWall}
                goToGetArticlePage={() => this.props.open('get-one-article')}
                goToSubscribePage={() => this.props.open('subscribe')}
              />}
            </React.Fragment>
  }
  render() {

    return  (<Panel id={this.props.id}>
              <PanelHeader
                left={<HeaderButton onClick={this.props.goBack}>
                  {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </HeaderButton>}
              >
                {this.state.article != null ? this.state.article.title : 'Загрузка статьи...'}
              </PanelHeader>
              {this.state.article != null ?
                <Group>{this.genArticle(this.state.article)}</Group> :
                <Div><Spinner /></Div>}
            </Panel>)
  }
}

// const Persik = props => (
// );

// Persik.propTypes = {
//   id: PropTypes.string.isRequired,
//   go: PropTypes.func.isRequired,
// };

export default Article;
