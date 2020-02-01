import React, { Component } from 'react';
import './App.css';

export default class Card extends Component {
  onDragStart = (e, cardId) => {
    e.dataTransfer.setData('cardId', cardId);
  }

  render() {
    const { card } = this.props;
    return (
      <div className='card'
        onDragStart={(e) => this.onDragStart(e, card.id)}
        draggable
      >
        <div className='card-summary'>
          {card.title}
        </div>
      </div>
    );
  }

}
