import React from 'react'
import marked from 'marked';
import css from './css/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons'

const Toolbar = (props) => {
  return (
    <div className = 'toolbar' id = {props.id}>
      {
        <div className = 'tbElements'><FontAwesomeIcon icon={faFreeCodeCamp}/><p className='title'>{props.title}</p></div>
      }
    </div>
  )
}


class Markdown_Modal extends React.Component {
  constructor(props) {
    	super(props)
  	}
  render() {
    return (<div className = 'md_modal'>
    	<Toolbar title='Editor' />
      	<textarea id = 'editor' type ='text' value = {this.props.value} onChange={this.props.handleChange}/>
    </div>)
  }
}

class Preview_Modal extends React.Component {
  constructor(props) {
    	super(props)
  	}
  createMarkup(markup) {
    return {__html: markup};
  }
  render() {
  	let text = this.props.text
    return (<div className = 'preview_modal'>
    	<Toolbar title='Preview' id = 'preview'/>
      	<p dangerouslySetInnerHTML = {this.createMarkup(text)}></p>
    </div>)
  }
}

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Enter text here',
      marked_text: 'Display'
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      text: event.target.value,
      marked_text: marked(event.target.value)
    })
  }
  render() {
    return (<div>
      <Markdown_Modal value={this.state.text} handleChange={this.handleChange} />
      <Preview_Modal text = {this.state.marked_text}/>
    </div>)
  }
}

export default Application;