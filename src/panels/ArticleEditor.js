import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, Button, platform, IOS, Group, Div, Input, Header, Gallery, Spinner, PopoutWrapper, Select } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import axios from 'axios'

import PayWall from '../components/PayWall.js'
import AppState from '../components/AppState'
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js'
import draftToMarkdown from 'draftjs-to-markdown';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const osname = platform();

class ArticleEditor extends React.Component {
  constructor(props) {
    super(props)
    this.quillRef = React.createRef()
    this.state = {
      article: [],
      editor: '',
      tags: [],
      newTag : '',
      newTagModalVisible: false,
      availibleChannels: [],
      selectedPublishers: '',
      title: ''
    }
  }
  componentDidMount() {
    axios.get(`${window.getGlobalState().apiUrl}/tagsAndPublishers`)
      .then(res => {
        console.log(res.data.result)
        const allPublishers = res.data.result.publishers
        this.setState({
          availibleChannels: allPublishers.filter((channel) => channel.userProfile.id == window.getGlobalState().auth.id).map((channel) => channel.label),
        })
        // console.log(allPublishers)
      }).catch(console.log)
  }
  publish() {
    const rawContentState = convertToRaw(this.state.editor.getCurrentContent());
    const markup = draftToMarkdown(rawContentState);
    const payload = {
      article: {
        title: this.state.title,
        tags: this.state.tags,
        paragraphs: markup,
        publisher: this.state.selectedPublishers
      },
      publisherId: window.getGlobalState().auth.id
    }
    console.log(payload)
    axios.post(`${window.getGlobalState().apiUrl}/article`, payload)
      .then(res => {
        this.props.goBack()
      }).catch(e => {
        console.log(e)
      })
  }
  render() {
    return  (<Panel id={this.props.id}>
              <PanelHeader
                left={<HeaderButton onClick={this.props.goBack}>
                  {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </HeaderButton>}
              >Создать стаью</PanelHeader>
              <Select placeholder="Выберите канал публицаии" value={this.state.selectedPublishers} onChange={e => this.setState({selectedPublishers: e.target.value})}>
                {this.state.availibleChannels.map(option => <option value={option}>{option}
              </option>)}
              </Select>
              <Group>
                <Input value={this.state.title} placeholder="Заголовок статьи" onChange={e => this.setState({title: e.target.value})}/>
              </Group>
              <Group className='quill-wrapper'>
                <Editor
                  editorState={this.state.editor}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={(editor) => this.setState({editor})}
                  toolbar={editorToolBar}
                />
              </Group>
              <Group>
                <Div><small>Теги к статье</small></Div>
                <Div>{this.state.tags.map((tag) => <Button className="article-editor-tag" level="outline" onClick={() => this.setState(oldState => {
                      oldState.tags.splice(oldState.tags.indexOf(tag), 1)
                      return oldState
                    })}>
                    {tag}
                  </Button>)}
                  <Button level="outline" onClick={() => this.setState({newTagModalVisible: true})}>+</Button>
                </Div></Group>
              <Div className="double-buttons">
                <Button onClick={() => this.publish()}>Опубликовать</Button>
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


const editorToolBar = {
  options: ['inline', 'blockType', 'list', 'link', 'emoji', 'image', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic', 'underline'],
    bold: { icon: Editor.bold, className: undefined },
    italic: { icon: Editor.italic, className: undefined },
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'Blockquote', 'Code'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['unordered', 'ordered', 'indent', 'outdent'],
    unordered: { icon: Editor.unordered, className: undefined },
    ordered: { icon: Editor.ordered, className: undefined },
    indent: { icon: Editor.indent, className: undefined },
    outdent: { icon: Editor.outdent, className: undefined },
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['left', 'center', 'right', 'justify'],
    left: { icon: Editor.left, className: undefined },
    center: { icon: Editor.center, className: undefined },
    right: { icon: Editor.right, className: undefined },
    justify: { icon: Editor.justify, className: undefined },
  },
  colorPicker: {
    icon: Editor.color,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
      'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
      'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
      'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
      'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
      'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link', 'unlink'],
    link: { icon: Editor.link, className: undefined },
    unlink: { icon: Editor.unlink, className: undefined },
  },
  emoji: {
    icon: Editor.emoji,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    emojis: [
      '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
      '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
      '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
      '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
      '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
      '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
      '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
      '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
      '✅', '❎', '💯',
    ],
  },
  /*embedded: {
    icon: Editor.embedded,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },*/
  image: {
    icon: Editor.image,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    previewImage: false,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['undo', 'redo'],
    undo: { icon: Editor.undo, className: undefined },
    redo: { icon: Editor.redo, className: undefined },
  },
}