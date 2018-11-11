import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, Spinner, Div } from '@vkontakte/vkui';
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
import axios from 'axios'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePanel: getUrlData().page || 'feed',
			fetchedUser: null,
			auth: false
		};
		navigator.subscribe((path) => this.setState({ activePanel: path.slice(-1)[0] }))
  }
  auth(userProfile) {
  	if (this.state.auto)
  		return
		axios.post(window.getGlobalState().apiUrl + '/autorizeUser', {userProfile}).then((res) => {
  		this.setState({auth: true})
  		if (res.data.success && (res.data.result.subscriptions.tags.length + res.data.result.subscriptions.publishers.length > 0)) {
  			window.setGlobalState({
  				currentSubscribtion: res.data.result.subscriptions
  			})
  		} else {
  			window.setGlobalState({
  				currentSubscribtion: {
  					tags: [],
  					publishers: []
  				}
  			})
  		}
  	}).catch(console.log)
  }
	componentDidMount() {
		navigator.subscribe((path) => this.setState({ activePanel: path.slice(-1)[0] }))
    navigator.init({
    	initOpenAllowed: ['home', 'feed', 'article', 'subscribe', 'publisher-account', 'article-editor'],
    	onInitRedirect: {
    		'get-one-article': 'article',
    		'channel-preview': 'subscribe',
    		'preview-feed': 'feed'
    	}
    })
    const hardcodedUser = false//103
    if (hardcodedUser) {
	    // --------- hadrcode --------
	    window.setGlobalState({
	    	auth: {
					id: hardcodedUser,
					signed_user_id: '11',
	    	}
			})
			this.auth({
				id: hardcodedUser,
				signed_user_id: '11',
	  	})
	    // --------- /hadrcode --------
    } else {
	    // --------- not hadrcode --------
			connect.subscribe((e) => {
				
				// alert(JSON.stringify(e))
				switch (e.detail.type) {
					case 'VKWebAppGetUserInfoResult':
						this.setState({ fetchedUser: e.detail.data });
						window.setGlobalState({
							auth: {
								id: e.detail.data.id,
								signed_user_id: e.detail.data.id,
							}
						})
						this.auth({
							id: e.detail.data.id,
							signed_user_id: e.detail.data.id,
						})
						break;
					default:
						// console.log(e.detail.type);
				}

			});
	    // --------- /not hadrcode --------
    }
		
    connect.send('VKWebAppGetUserInfo', {});

	}

	render() {
		return (
			<AppState.Provider>
				{!this.state.auth ? <Div><Spinner /></Div> :
				<View activePanel={this.state.activePanel}>
					<Home id="home" fetchedUser={this.state.fetchedUser} open={navigator.go} goBack={navigator.back}/>
					<Feed id="feed" fetchedUser={this.state.fetchedUser} open={navigator.go}  goBack={navigator.back} />
					<Article id="article" open={navigator.go}
						user={this.state.fetchedUser}
						goBack={navigator.back}/>
					<SubscribePage id="subscribe" open={navigator.go} articleData={this.state.currentArticleData} goBack={navigator.back} />
					<GetOneArticle id="get-one-article" open={navigator.go} article={this.state.currentArticleData} goBack={navigator.back}/>
					<ChannelPreview id="channel-preview" open={navigator.go} goBack={navigator.back} />
					<PublisherAccount id="publisher-account" open={navigator.go} goBack={navigator.back} />
					<ArticleEditor id="article-editor" open={navigator.go} goBack={navigator.back} />
				</View>}
			</AppState.Provider>
		);
	}
}

export default App;
