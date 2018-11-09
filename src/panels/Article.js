import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Group, Div, Header, Gallery} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import PayWall from '../components/PayWall.js'

const osname = platform();

class Article extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return  (<Panel id={this.props.id}>
              <PanelHeader
                left={<HeaderButton onClick={this.props.go} data-to="home">
                  {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </HeaderButton>}
              >
                {this.props.article.title}
              </PanelHeader>
              <Group>{this.props.article.nodes.map((node, i) => {
                switch(node.type) {
                  case 'text':
                    return <Div className={i === this.props.article.nodes.length - 1 && this.props.article.payWall && 'last-text-block'}>{node.text}</Div>
                    break
                  case 'header':
                    return <Header level={node.size || 1}>{node.text}</Header>
                    break
                  case 'gallery':
                    return <Gallery
                        slideWidth="500px"
                        style={{ height: 500, width: 600 }}
                        bullets="dark"
                      >{node.pics.map(pic => <img src={pic}/>)}</Gallery>
                    break
                  default:
                    return <Div>Error, unkonw node type: {node.type}</Div>
                }
              })}
              {this.props.article.payWall && <PayWall
                goToGetArticlePage={() => {

                }}
                goToSubscribePage={() => this.props.open('subscribe')}
              />}
              </Group>
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
