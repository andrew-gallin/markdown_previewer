import React from 'react'

import css from './css/main.css';

const Toolbar = (props) => {
  return (
    <div className = 'toolbar'>
      {
        <p>{props.title}</p>
      }
    </div>
  )
}

// class Toolbar extends React.Component {
// 	constructor(props) {
//     	super(props);
//   	}
//   render() {
//     return (<div>
//       <p>{props.title}</p>
//     </div>);
//   }
// }

class Markdown_Modal extends React.Component {
  constructor(props) {
    	super(props)
  	}
  render() {
    return (<div className = 'md_modal'>
    	<Toolbar title='Editor' />
      	<textarea />
    </div>)
  }
}

class Application extends React.Component {
  render() {
    return (<div>
      <Markdown_Modal />
    </div>)
  }
}

export default Application;