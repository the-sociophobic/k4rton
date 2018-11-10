import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, Button, platform, IOS, Group, Div, Input, Header, Gallery, Spinner, PopoutWrapper} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import axios from 'axios'

import PayWall from '../components/PayWall.js'
import AppState from '../components/AppState'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
const osname = platform();

class ArticleEditor extends React.Component {
  constructor(props) {
    super(props)
    this.quillRef = React.createRef()
    this.state = {
      article: [],
      quillText: '',
      tags: [],
      newTag: '',
      newTagModalVisible: false
    }
  }
  save() {
    console.log(JSON.stringify(this.quillRef.current.getEditor().getContents(), null, 2))
  }
  render() {
    return  (<Panel id={this.props.id}>
              <PanelHeader
                left={<HeaderButton onClick={this.props.goBack}>
                  {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </HeaderButton>}
              >Создать стаью</PanelHeader>
              <Group className='quill-wrapper'>
                <ReactQuill ref={this.quillRef} value={this.state.quillText}
                  onChange={(value) => this.setState({quillText: value})} />
              </Group>
              <Group>
                <Div><small>Теги к статье</small></Div>
                <Div>{this.state.tags.map((tag) => <Button className="article-editor-tag" level="outline" onClick={() => this.setState(oldState => {
                      oldState.tags.splice(oldState.tags.indexOf(tag), 1)
                      return oldState
                    })}>
                    {/*<span >x</span>*/}
                    {tag}
                  </Button>)}
                  <Button level="outline" onClick={() => this.setState({newTagModalVisible: true})}>+</Button>
                </Div></Group>
              <Div className="double-buttons">
                <Button level="outline">Сохранить черновик</Button>
                <Button onClick={() => this.save()}>Опубликовать</Button>
              </Div>
              {this.state.newTagModalVisible && <PopoutWrapper v="center" h="center" onClick={() => this.setState({newTagModalVisible: false})}>
                <Group className="article-editor-tag-input" onClick={e => e.stopPropagation()}>
                  <p>Введите тег</p>
                  <Input value={this.state.newTag} onChange={(e) => this.setState({newTag: e.target.value})}/>
                  <br />
                  <Button level="outline"  onClick={() => this.setState({
                    newTagModalVisible: false,
                    tags: this.state.tags.concat([this.state.newTag]),
                    newTag: ''
                  })}>Добавить</Button>
                </Group>
              </PopoutWrapper>}
            </Panel>)
  }
}

export default ArticleEditor