import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Div, Header, Gallery, Spinner, Footer, Cell, Search, HorizontalScroll, Button} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import axios from 'axios'

import { tagColor } from './../utils/utils'

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
    axios.get('/articles.json').then(res => {
      this.setState({articles: res.data});
      let popularTags = [];
      res.data.forEach(article => {
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
    let text = article.article.find(node => node.type == "text") || {text: ""};
    let pics = article.article.find(node => node.type == "gallery");

    return (
      <Group>
        <Div onClick={() => {
          this.props.setArticle(article.id);
          this.props.open("article");
        }}>
          <h3 style={{margin: "0px 0"}}>{article.title}</h3>
          {/* {
            !pics ? "" :
              <Gallery
                slideWidth="100%"
                style={{ height: "auto", width: "100%" }}
                bullets="dark"
              >
                {pics.pics.map(pic => <img src={pic}/>)}
              </Gallery>
          } */}
          {pics.pics.length > 0 ? <img src={pics.pics[0]} style={{width: "100%"}} /> : ""}
          <p>{text.text}</p>
        </Div>
        <Cell>
          <small>Теги:</small>
          {this.renderTags(article.tags)}
        </Cell>
      </Group>
    );
  }
  
  renderArticles() {
    if (this.state.articles == null)
      return <Div><Spinner /></Div>;
    if (this.state.articles.length == 0)
      return <Footer>нет новостей</Footer>;
    return this.state.articles
    .filter(article =>
      (
        this.state.selectedTags.length == 0 ||
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
        <PanelHeader>
          Новости
        </PanelHeader>
        <Search theme="default" onChange={value => this.setState({value: value})} />
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
