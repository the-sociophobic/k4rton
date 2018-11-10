import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import './styles/main.css';

import Home from './panels/Home';
import Feed from './panels/Feed';
import Article from './panels/Article';
import SubscribePage from './panels/SubscribePage';
import GetOneArticle from './panels/GetOneArticle';
import ChannelPreview from './panels/ChannelPreview';
import PublisherAccount from './panels/PublisherAccount';
import navigator from './utils/navigator'
import AppState from './components/AppState'
import ArticleEditor from './panels/ArticleEditor';
import { getUrlData } from './utils/utils';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePanel: getUrlData().page || 'home',
			fetchedUser: null,
		};
  }

	componentDidMount() {
		navigator.subscribe((path) => this.setState({ activePanel: path.slice(-1)[0] }))
    navigator.init({
    	initOpenAllowed: ['home', 'feed', 'article', 'subscribe', 'publisher-account', 'article-editor'],
    	onInitRedirect: {
    		'get-one-article': 'article',
    		'channel-preview': 'subscribe',
    		'preview-feed': 'home'
    	}
    })
    window.setGlobalState({
    	auth: {
				id: 2314852,
				signed_user_id: '11',
    	}
		})
		connect.subscribe((e) => {
			
			// alert(JSON.stringify(e))
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					window.setGlobalState({
						auth: {
							user_id: e.detail.data.id,
							signed_user_id: e.detail.data.signed_user_id,
						}
					})
					break;
				default:
					// console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	open = (panel) => {
		navigator.go(panel)
		// this.setState({ activePanel: panel })
	};

	render() {
		return (
			<AppState.Provider>
				<View activePanel={this.state.activePanel}>
					<Home id="home" fetchedUser={this.state.fetchedUser} open={navigator.go} goBack={navigator.back}/>
					<Feed id="feed" fetchedUser={this.state.fetchedUser} open={this.open}  goBack={navigator.back} />
					<Article id="article" open={navigator.go}
						user={this.state.fetchedUser}
						goBack={navigator.back}/>
					<SubscribePage id="subscribe" open={navigator.go} articleData={this.state.currentArticleData} goBack={navigator.back} />
					<GetOneArticle id="get-one-article" open={navigator.go} article={this.state.currentArticleData} goBack={navigator.back}/>
					<ChannelPreview id="channel-preview" open={navigator.go} goBack={navigator.back} />
					<PublisherAccount id="publisher-account" open={navigator.go} goBack={navigator.back} />
					<ArticleEditor id="article-editor" open={navigator.go} goBack={navigator.back} />
				</View>
			</AppState.Provider>
		);
	}
}

export default App;
