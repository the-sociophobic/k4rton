import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Div, Header, Gallery, Spinner, Footer, Cell, Search, HorizontalScroll, Button} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28Settings from '@vkontakte/icons/dist/28/settings';
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { tagColor, changeDataInUrl } from './../utils/utils'

const osname = platform();

class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: null,
      value: "",
      selectedTags: [],
      popularTags: [],
    }
  }


  componentWillReceiveProps (props) {
    const globalState = window.getGlobalState()
    let url = ''
    if (globalState.previewFeedMode && (globalState.previewFeedMode.tags.length + globalState.previewFeedMode.publishers.length > 0))
      url = `${window.getGlobalState().apiUrl}/allArticles?userId=${window.getGlobalState().auth.id}&signedUserId=${window.getGlobalState().auth.signed_user_id}` +
        (globalState.previewFeedMode.tags.length > 0 ? `&tags=${globalState.previewFeedMode.tags.join(',')}` : '') +
        (globalState.previewFeedMode.publishers.length > 0 ? `&publishers=${globalState.previewFeedMode.publishers.join(',')}` : '')
    else
      url = `${window.getGlobalState().apiUrl}/articles?userId=${window.getGlobalState().auth.id}&signedUserId=${window.getGlobalState().auth.signed_user_id}`
    axios.get(url).then(res => {
      this.setState({articles: res.data.result.articles});
      let popularTags = [];
      res.data.result.articles.forEach(article => {
        article.tags.forEach(tag => {
          let index = popularTags.findIndex(tagg => tagg.tag == tag);
          if (index === -1)
            popularTags.push({tag: tag, popularity: 1});
          else
            popularTags = [
              ...popularTags.slice(0, index),
              {tag: tag, popularity: (popularTags[index].popularity + 1)},
              ...popularTags.slice(index + 1)
            ];
        });
      });
      popularTags = popularTags
      .sort((a, b) => b.popularity - a.popularity)
      .filter(tag => tag.popularity > 1)
      .map(tag => tag.tag);
      this.setState({popularTags: popularTags});
    }).catch((e) => {
      console.log(e)
      this.setState({
        articles: [],
      })
    })
  }

  toggleTag(tag) {
    let tags = this.state.selectedTags;
    let index = this.state.selectedTags.indexOf(tag);
    if (index == -1)
      tags.push(tag);
    else
      tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    this.setState({selectedTags: tags});
  }

  renderTags(tags) {
    return (
      <HorizontalScroll>
      {
        tags.map(tag => {
          let style = {};
          if (this.state.selectedTags.includes(tag))
            style = {
              margin: "0 5px",
              background: tagColor(tag),
              color: "white",
            };
          else
            style = {
              margin: "0 5px",
              background: "rgba(1, 1, 1, 0)",
              color: tagColor(tag),
              boxShadow: "inset 0px 0px 0px 2px " + tagColor(tag),
            };

          return (
            <Button
              onClick={() => this.toggleTag(tag)}
              style={style}
            >
              #{tag}
            </Button>
          );
        })
      }
      </HorizontalScroll>
    );
  }

  renderArticleListing(article) {
    // let text = article.article.find(node => node.type == "text") || {text: ""};
    // let pics = article.article.find(node => node.type == "gallery");
    return (
      <Group>
        <Div onClick={() => {
          changeDataInUrl({article: article.id});
          this.props.open("article");
        }}>
          <h3 style={{margin: "0px 0"}}>{article.title}</h3>
          <div>{article.paragraphs.substr && <ReactMarkdown source={article.paragraphs.replace(/\\n/g, '\n')} />}</div>
          {/*<h3 style={{margin: "0px 0"}}>{article.title}</h3>
          {pics.pics.length > 0 ? <img src={pics.pics[0]} style={{width: "100%"}} /> : ""}
          <p>{text.text}</p>*/}
        </Div>
        <Cell>
          <small>Теги:</small>
          {this.renderTags(article.tags)}
          <small>Опубликовал:</small>
          {' ' + article.publisher}
        </Cell>
      </Group>
    );
  }
  
  renderArticles() {
    // console.log(this.state.articles)
    if (this.state.articles == null || this.state.articles == undefined)
      return <Div><Spinner /></Div>;
    if (this.state.articles.length == 0)
      return <Footer>нет новостей</Footer>;
    return this.state.articles
    .filter(article =>
      (
        (this.state.selectedTags.map && this.state.selectedTags.length == 0) ||
        this.state.selectedTags.map(tag => article.tags.includes(tag)).reduce((a, b) => a || b)
      ) && (
        article.title.includes(this.state.value) ||
        article.article.map(node => node.type =="text" && node.text.includes(this.state.value)).reduce((a, b) => a || b) ||
        article.tags.map(tag => tag.includes(this.state.value)).reduce((a, b) => a || b)
      )
    )
    .map(article => this.renderArticleListing(article));
  }

  render() {
    return (
      <Panel id="feed">
        <PanelHeader
          left={<HeaderButton onClick={() => {
            if (window.getGlobalState().previewFeedMode) {
              window.setGlobalState({previewFeedMode: false})
              this.props.goBack()
            } else {
             this.props.open('subscribe')
            }
         }}>{window.getGlobalState().previewFeedMode !== false ? (osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>) : <Icon28Settings />}</HeaderButton>}
          noShadow={true}
        >{window.getGlobalState().previewFeedMode !== false ? 'Новости' : 'Превью новостей'}</PanelHeader>
        <Search theme="default" placeholder="Поиск по постам" onChange={value => this.setState({value: value})} />
        <Div>
          <small>Популярные теги:</small>
        </Div>
        <Cell>
          {this.renderTags(this.state.popularTags)}
        </Cell>
        {this.renderArticles()}
      </Panel>
    );
  }
}

export default Feed;
