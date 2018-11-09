import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import './styles/main.css';


import Home from './panels/Home';
import Article from './panels/Article';
import SubscribePage from './panels/SubscribePage';
import GetOneArticle from './panels/GetOneArticle';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			currentArticle: null,
			currentArticleData: {}
		};
	}

	componentDidMount() {
		if (window.location.hash.length > 0) {
			const hash = window.location.hash.substr(1)
			const urlData = {}
			for (let hashPart of hash.split('&')) {
				if (hashPart.includes('='))
					urlData[hashPart.split('=')[0]] = hashPart.split('=')[1]
			}
			if (urlData.article) {
				this.setState({currentArticle: urlData.article})
			}
		}
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					// console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};
	open = (panel) => {
		this.setState({ activePanel: panel })
	};

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
				<Article id="article" go={this.go} open={this.open}
					article={this.state.currentArticle} user={this.state.fetchedUser}
					setPayWallData={(data) => this.setState({currentArticleData: data})}/>
				<SubscribePage id="subscribe" go={this.go} open={this.open} articleData={this.state.currentArticleData} />
				<GetOneArticle id="get-one-article" go={this.go} open={this.open} article={this.state.currentArticleData} />
			</View>
		);
	}
}

export default App;