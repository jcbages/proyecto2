import React from 'react';
import Header from "./Header";
import PropTypes from "prop-types";
import Main from "./Main";
import axios from 'axios';


const propTypes = {
	_id: PropTypes.string.isRequired,
	nombre: PropTypes.string.isRequired,
	desc: PropTypes.string,
	keywords: PropTypes.object,
	ids_admin: PropTypes.object,
	members: PropTypes.object,
	messages: PropTypes.object,
};

class Chat extends React.Component {
	render() {
		const { _id,nombre, desc, keywords, ids_admin, members, messages } = this.props;
		const listClass = `list-item card`;
		const style = { zIndex: 100 - this.props.index};
		var mensajes = this.props.messages;
		if(mensajes == undefined)
			mensajes = [];
		return (
			<div class="chat">
			<div class="chat-header clearfix">
			<div class="chat-about">
			<div class="chat-with">{this.props.nombre}</div>
			<div class="chat-num-messages">{this.props.descripcion}</div>
			</div>
			<i class="fa fa-star"></i>
			</div>
			<div className="chat-history">
			<ul>
			{mensajes.map(function(msg, index){
				return (<li className="clearfix">
					<div className="message-data align-right">
					<span className="message-data-time"></span> &nbsp; &nbsp;
					<span className="message-data-name">{msg.sender_name}</span> <i className="fa fa-circle me" />
					</div>
					<div className="message other-message float-right">
					{msg.text}
					</div>
					</li>);
			})}
			</ul>
		</div> {/* end chat-history */}
		<div className="chat-message clearfix">
		<textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows={3} defaultValue={""} />
		<i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
		<i className="fa fa-file-image-o" />
		<button onClick={(event) => this.handleClick(event)}>Send</button>
	</div> {/* end chat-message */}
	</div>
	);
	}
	handleClick(event){
		var x = document.getElementById("message-to-send").value;
		var apiBaseUrl = "/clubs/"+this.props._id+"/messages";
		var self = this;
		console.log(x + "---" + apiBaseUrl);
		var payload={
			sender: self.props.userId,
			text:x
		}
		axios.post(apiBaseUrl, payload)
		.then(function (response) {
			console.log(response)
			if(response.status == 200){
				self.props.messages = response;
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}

Chat.PropTypes = propTypes;

export default Chat;
