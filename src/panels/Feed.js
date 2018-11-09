import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Div, Header, Gallery, Spinner, Footer, Cell} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import axios from 'axios'

const osname = platform();

class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: null,
    }
  }


  componentWillReceiveProps (props) {
    axios.get('/articles.json').then(res => {
      this.setState({articles: res.data});
    }).catch((e) => {
      this.setState({
        articles: [],
      })
    })
  }

  renderArticleListing(article) {
    return (
      <Group onClick={() => {
        this.props.setArticle(article.id);
        this.props.open("article");
      }}>
        <Cell>
          {article.title}
        </Cell>
      </Group>
    );
  }
  
  renderArticles() {
    if (this.state.articles == null)
      return <Div><Spinner /></Div>;
    if (this.state.articles.length == 0)
      return <Footer>нет новостей</Footer>;
    console.log(this.state.articles);
    return this.state.articles.map(article => this.renderArticleListing(article));
  }

  render() {
    return (
      <Panel id="feed">
        <PanelHeader>
          Новости
        </PanelHeader>
        {this.renderArticles()}
      </Panel>
    );
  }
}

export default Feed;
