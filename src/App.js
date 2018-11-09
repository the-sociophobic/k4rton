import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import './styles/main.css';


import Home from './panels/Home';
import Article from './panels/Article';
import SubscribePage from './panels/SubscribePage';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'subscribe',
			fetchedUser: null,
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
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
				<Article id="article" go={this.go} open={this.open} article={
			//		{
			//			title: 'Lorem Ipsum',
			//			payWall: false,
			//			nodes: [{
			//				type: 'header',
			//				size: 1,
			//				text: 'Fullstack overflow'
			//			}, {
			//				type: 'text',
			//				text: LoremIpsum1
			//			}, {
			//				type: 'header',
			//				size: 2,
			//				text: 'Try catch empty log'
			//			}, {
			//				type: 'gallery',
			//				pics: [
			//					'https://habrastorage.org/getpro/geektimes/post_images/1a1/631/621/1a1631621707397ae53ac80c20ea9d97.jpg',
			//					'http://prointerest.ru/wp-content/uploads/2013/12/lsd-research.png',
			//					'https://habrastorage.org/getpro/geektimes/post_images/1a1/631/621/1a1631621707397ae53ac80c20ea9d97.jpg',
			//					'http://prointerest.ru/wp-content/uploads/2013/12/lsd-research.png',
			//					'https://habrastorage.org/getpro/geektimes/post_images/1a1/631/621/1a1631621707397ae53ac80c20ea9d97.jpg',
			//					'http://prointerest.ru/wp-content/uploads/2013/12/lsd-research.png',
			//				]
			//			}, {
			//				type: 'text',
			//				text: LoremIpsum2
			//			}, {
			//				type: 'text',
			//				text: LoremIpsum3
			//			},]
			//		}
						{
							title: 'Lorem ipsum Paywall',
							payWall: true,
							nodes: [{
								type: 'header',
								size: 1,
								text: 'Fullstack overflow'
							}, {
								type: 'text',
								text: LoremIpsum1
							}, {
								type: 'text',
								text: LoremIpsum2
						//	}, {
						//		type: 'text',
						//		text: LoremIpsum3
						//	}, {
						//		type: 'text',
						//		text: LoremIpsum4
							}, {
								type: 'text',
								text: LoremIpsum5
							},]
						}
				}/>
				<SubscribePage id="subscribe" go={this.go} open={this.open} />
			</View>
		);
	}
}

export default App;


const LoremIpsum1 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a eros sed quam egestas faucibus. Praesent feugiat a massa sed rhoncus. Nullam a eros vulputate, sodales leo eu, volutpat tortor. Morbi commodo condimentum justo, ut tempor est. Cras porttitor neque quam, ac facilisis est dictum in. Pellentesque luctus ornare aliquet. Curabitur eget semper urna, ut facilisis metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;`

const LoremIpsum2 = `Mauris sed posuere leo, ut tempus tortor. Nullam vitae vestibulum mauris. Maecenas volutpat libero non sodales hendrerit. Integer dapibus, tellus consequat egestas tincidunt, sem purus lobortis ligula, consectetur cursus est mauris ac dui. Suspendisse tempor pharetra mi, suscipit vulputate eros ullamcorper eget. Vivamus quis rutrum elit, id mattis dui. Nam sodales scelerisque rhoncus. Ut rutrum nisl quis metus iaculis volutpat. Nulla sollicitudin enim sed nibh egestas dignissim. Vestibulum massa elit, tincidunt finibus posuere eu, pretium vitae felis.`

const LoremIpsum3 = `Fusce quis libero nec nisi aliquet rhoncus. Aliquam pellentesque massa in mauris vulputate, in efficitur velit tempor. Sed risus enim, ornare ac dictum nec, vulputate et massa. Maecenas scelerisque vel enim non dapibus. Maecenas fringilla magna leo. Fusce non nisi sagittis, imperdiet ligula eu, sollicitudin elit. Cras auctor tempus accumsan. Fusce vulputate porta augue, nec finibus velit eleifend ut. Duis dapibus hendrerit justo, ac efficitur elit luctus quis. Pellentesque lacus lorem, interdum nec turpis vel, pulvinar bibendum est. Nulla at leo fermentum, faucibus nunc sit amet, consectetur erat. Mauris vel suscipit ante. In rutrum leo sed leo auctor consequat. Morbi tincidunt nisi eget pretium congue. In mollis tempus varius. Morbi vestibulum justo enim, sed rhoncus dolor molestie nec.`

const LoremIpsum4 = `Phasellus cursus, dolor ut porttitor gravida, justo felis volutpat justo, quis fringilla ex metus ut erat. Phasellus sollicitudin at lacus id sollicitudin. Praesent varius nisi est, in feugiat ante ornare id. Sed diam nulla, feugiat lacinia neque a, imperdiet tristique leo. Aliquam faucibus aliquet convallis. Nunc molestie dolor ex, eget sollicitudin lorem luctus eget. Suspendisse et luctus felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque consectetur laoreet congue. Integer varius ipsum dapibus suscipit vestibulum. Suspendisse dignissim est orci, a venenatis justo mollis ac. Nunc et laoreet mi, ut accumsan turpis. Donec pulvinar sit amet magna eu dignissim. Nulla ac nunc ornare, pulvinar lectus congue, aliquam felis. Sed ultricies, sapien eget vehicula tempor, nisi erat facilisis leo, nec feugiat ante ipsum et orci. Nunc semper orci ut commodo tempus.`

const LoremIpsum5 = `Integer ut nunc eget augue semper semper id euismod dui. Ut dapibus, dui sed tristique iaculis, ante turpis placerat sem, at malesuada lorem arcu ut metus. Curabitur scelerisque ante magna, ac tempor ipsum tristique eget. Donec vulputate nisl a nisl posuere, eu congue est eleifend. Suspendisse accumsan arcu quis erat interdum bibendum. Nunc eu neque in lacus viverra eleifend dictum rutrum lacus. Ut vitae urna sagittis, varius ex ut, vehicula massa. Integer facilisis nisl sit amet ipsum dapibus maximus. Fusce mattis metus sed tortor interdum viverra. Fusce sit amet mollis nunc, pellentesque sagittis quam.`