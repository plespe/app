var React = require('react');
var Chat = require('./sidebar-chat');
var ChatActions = require('../../actions/ChatActions');
var ChatStore = require('../../stores/ChatStore');
var AuthStore = require('../../stores/AuthStore');
var Map = require('./map');

// TODO - factor out navbar login form

var Sidebar = React.createClass({

    getInitialState: function(){
      return {
        from: "",
        messages: []
      };
    },

    componentDidMount: function(){
      AuthStore.addChangeListener(this._onAuthChange);
      ChatStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function(){
      AuthStore.removeChangeListener(this._onAuthChange);
      ChatStore.removeChangeListener(this._onChange);
    },

    _onChange: function(){
        this.setState({
          messages: ChatStore.getMessages()
        });  
    },

    _onAuthChange: function(){
      this.setState({
        from: AuthStore.getUser().username
      });
      this.joinChat(); // On Auth change, if user logs in then connect to chat server.
    },

    joinChat: function(){
      ChatActions.connect();
    },

    sendMessage: function(msg){
      ChatActions.send({message:msg});
    },

    render: function(){

    return (
        <ul className="sidebar-nav">
            <a href="#"><img src="/assets/logo.png"></img></a>

            <li className="sidebar-brand">
                <a href="#">
                    Welcome
                </a>
            </li>

            <li>
                <a href="#">Trending</a>
            </li>

            <li>
                <a href="#">Friends</a>
            </li>

            <li>
                <a href="#">Chat (global)</a>
            </li>

            <Chat messages={this.state.messages} user={this.state.from} onSend={this.sendMessage} onChat={this.joinChat} />

        </ul>
    );
  }
});

module.exports = Sidebar;
    
