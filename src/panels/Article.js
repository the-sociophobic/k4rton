import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Div, Header, Gallery, Spinner, List} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import { getUrlData } from '../utils/utils'
import PayWall from '../components/PayWall.js'
import AppState from '../components/AppState'
import Tags from './../components/Tags';

const osname = platform();

class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      article: null
    }
  }
  componentDidMount () {
    const urlData = getUrlData()
    if (urlData.article !== undefined && (this.state.article === null || this.state.article.id !== urlData.article)) {
      axios.get(`${window.getGlobalState().apiUrl}/article?userId=${window.getGlobalState().auth.id}&signedUserId=${window.getGlobalState().auth.signed_user_id}&articleId=${urlData.article}`).then(res => {
        const article = res.data.result.article
        this.setState({article})
        const newGlobalState = {
          article: {
            tags: article.tags,
            publisher: article.publisher,
            title: article.title,
            price: article.price,
          }
        }
        if (!window.getGlobalState().subscribingProcess.manuallyChanged)
          newGlobalState.subscribingProcess = {
            selected: {
              tags: article.tags,
              publishers: [article.publisher]
            }
          }
        newGlobalState.subscribingProcess.periodType = window.getGlobalState().subscribingProcess.periodType
        window.setGlobalState(newGlobalState)
      }).catch((e) => {
        console.log(e)
        this.setState({article: {
          title: 'Упс...',
          paragraphs: '# Произошла ошибка \\n\\n детали в консоли'
        }})
      })
    }
  }
  genArticle() {
    return  <React.Fragment>
              {/*this.state.article.article.map((node, i) => {
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
                        slideWidth="100%"
                        // style={{ height: 500, width: 600 }}
                        style={{display: "table"}}
                        bullets="dark"
                      >{node.pics.map(pic => <img src={pic} style={{width: "100%", height: "auto"}} /> )}</Gallery>
                    break
                  default:
                    return <Div className={className}>Error, unkonw node type: {node.type}</Div>
                }
              })*/}
              <Div>{this.state.article.paragraphs.substr &&
                <ReactMarkdown source={this.state.article.paragraphs.replace(/\\n/g, '\n')} />}</Div>
              {this.state.article.payWall < 100 ? <PayWall
                part={this.state.article.payWall}
                goToGetArticlePage={() => this.props.open('get-one-article')}
                goToSubscribePage={() => this.props.open('subscribe')}
              /> : <React.Fragment>
                <Group>
                  <List>
                    <Div onClick={() => {
                      window.setGlobalState(oldState => {
                        oldState.previewFeedMode = {tags: [], publishers: []}
                        oldState.previewFeedMode.publishers = [this.state.article.publisher]
                        return oldState
                      })
                      this.props.open('feed')
                    }}>Канал: {this.state.article.publisher}</Div>
                    <Div><Tags tags={this.state.article.tags} toggleTag={tag => {
                      window.setGlobalState(oldState => {
                        oldState.previewFeedMode = {tags: [], publishers: []}
                        oldState.previewFeedMode.tags = [tag]
                        return oldState
                      })
                      this.props.open('feed')
                    }} /></Div>
                  </List>
                </Group>
              </React.Fragment>}
            </React.Fragment>
  }
  render() {
    console.log(this.state.article)
    return  (<Panel id={this.props.id}>
              <PanelHeader
                left={<HeaderButton onClick={this.props.goBack}>
                  {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </HeaderButton>}
              >
                {this.state.article ? this.state.article.title : 'Загрузка статьи...'}
              </PanelHeader>
              {this.state.article && this.state.article.paragraphs ?
                <Group>{this.genArticle()}</Group> :
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
