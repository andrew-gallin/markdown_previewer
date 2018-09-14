import React from 'react'
import marked from 'marked';
import css from './css/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import { faCompress } from '@fortawesome/free-solid-svg-icons'
import { faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons'

const placeholder = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

marked.setOptions({
  breaks: true
})

const Modal_Button = (props) => {
  if (props.isMax) {
	  return (
	    <div className = 'button' onClick={props.max}><FontAwesomeIcon
	    icon={faCompress}/></div>
	  )
  }
  return (
    <div className = 'button' onClick={props.max}><FontAwesomeIcon icon={faExpandArrowsAlt}/></div>
	  )
}

const Toolbar = (props) => {
  return (
    <div className = 'toolbar' id = {props.id}>
      {
        <div className = 'tbElements'><FontAwesomeIcon icon={faFreeCodeCamp}/>
          <p className='title'>{props.title}</p>
          <Modal_Button max={props.max} isMax = {props.isMax}/></div>
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
    	<Toolbar title='Editor' max={this.props.max} isMax = {this.props.isMax}/>
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
    	<Toolbar title='Preview'  max={this.props.max}
    	  isMax = {this.props.isMax}/>
      	<p id = 'preview' dangerouslySetInnerHTML = {this.createMarkup(text)}></p>
    </div>)
  }
}

class Application extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: placeholder,
      marked_text: marked(placeholder),
      md_max: false,
      preview_max: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.mdMax = this.mdMax.bind(this)
    this.previewMax = this.previewMax.bind(this)
  }
  handleChange(event) {
    this.setState({
      text: event.target.value,
      marked_text: marked(event.target.value)
    })
  }
  mdMax(event) {
  	if (this.state.md_max) {
	    this.setState({
	      md_max: false
	    })
	  }
    else {
	 	this.setState({
	      md_max: true
	    })
	 }
  }
  previewMax(event) {
    if (this.state.preview_max) {
	    this.setState({
	      preview_max: false
	    })
	  }
    else {
	 	this.setState({
	      preview_max: true
	    })
	 }
  }
  render() {
  	if (this.state.md_max) {
  		    return (<div className='wrapper'>
        <Markdown_Modal class = 'modal modal_max' value={this.state.text}
        	handleChange={this.handleChange} max = {this.mdMax} isMax= {this.state.md_max}/>
      </div>)
  	}
  	if (this.state.preview_max) {
  		    return (<div className='wrapper'>
        <Preview_Modal class = 'modal modal_max' text = {this.state.marked_text}
          max = {this.previewMax} isMax= {this.state.preview_max}/>
      </div>)
  	}
    return (<div className='wrapper'>
      <Markdown_Modal class= 'modal md_modal' value={this.state.text}
      	handleChange={this.handleChange} max={this.mdMax} isMax= {this.state.preview_max}/>
      <Preview_Modal class = 'modal preview_modal' text = {this.state.marked_text}
        max = {this.previewMax} isMax= {this.state.md_max}/>
    </div>)
  }
}



export default Application;