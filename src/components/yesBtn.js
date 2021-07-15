import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
//attempt :fail
class yesBtn extends Component {

    constructor(props) {
      super(props);
      this.state = {
        bgColor: ""
      }
    }
  
  
    boxClick = (e) => {
      this.setState({
        bgColor: "purple"
      })
    }

    render() {
        return(
            <div className='yesButton'>
                <h2>Test 3</h2>
                <p>This is an example of an onClick event 'renderd' by react.</p>
                <div className="yesBoostBtn" 
                style={{backgroundColor: this.state.bgColor}}
                onClick={this.boxClick}>Click Me!</div>
            </div>
        );
    }
}


ReactDOM.render(<yesBtn />, document.getElementById('root'));
export default yesBtn
