import React from 'react'
import marked from 'marked';
import css from './css/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import { faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons'

const Modal_Button = (props) => {
  return (
    <div className = 'button'><FontAwesomeIcon icon={faExpandArrowsAlt}/></div>
  )
}

const Toolbar = (props) => {
  return (
    <div className = 'toolbar' id = {props.id}>
      {
        <div className = 'tbElements'><FontAwesomeIcon icon={faFreeCodeCamp}/>
          <p className='title'>{props.title}</p><Modal_Button /></div>
      }
    </div>
  )
}

class Markdown_Modal extends React.Component {
  constructor(props) {
    	super(props)
  	}
  render() {
    return (<div className = {this.props.class}>
    	<Toolbar title='Editor' />
      	<textarea id = 'editor' type ='text' value = {this.props.value}
      	  onChange={this.props.handleChange}/>
    </div>)
  }
}

class Preview_Modal extends React.Component {
  constructor(props) {
    	super(props)
  	}
  createMarkup(markup) {
    return { __html: markup }
  }
  render() {
  	let text = this.props.text
    return (<div className = {this.props.class}>
    	<Toolbar title='Preview' id = 'preview'/>
      	<p dangerouslySetInnerHTML = {this.createMarkup(text)}></p>
    </div>)
  }
}

class Application extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'Enter text here',
      marked_text: 'Display',
      md_max: true,
      preview_max: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.md_max = this.md_max.bind(this)
    this.preview_max = this.preview_max.bind(this)
  }
  handleChange(event) {
    this.setState({
      text: event.target.value,
      marked_text: marked(event.target.value)
    })
  }
  md_max() {
    this.setState({
      md_max: true
    })
  }
  preview_max() {
    this.setState({
      preview_max: true
    })
  }
  render() {
  	if (this.state.md_max) {
  		    return (<div>
        <Markdown_Modal class = 'modal modal_max' value={this.state.text}
        	handleChange={this.handleChange} />
      </div>)
  	}
  	if (this.state.preview_max) {
  		    return (<div>
        <Preview_Modal class = 'modal modal_max' text = {this.state.marked_text}/>
      </div>)
  	}
    return (<div>
      <Markdown_Modal class= 'modal md_modal' value={this.state.text}
      	handleChange={this.handleChange} />
      <Preview_Modal class = 'modal preview_modal' text = {this.state.marked_text}/>
    </div>)
  }
}

export default Application;