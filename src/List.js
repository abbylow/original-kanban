import React, { Component } from 'react';
import './App.css';
import Card from './Card';

export default class List extends Component {
  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e, listKey) => {
    let cardId = e.dataTransfer.getData('cardId');
    this.props.dropItem(listKey, cardId);
  }

  render() {
    const { list } = this.props;
    return (
      <div className='list'
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, list.key) }}
      >
        <div className='list-container'>
          <div className='list-header'>{list.name}</div>
          <div className='list-content'>
            <div className='cards'>
              {
                list.cards.map(card =>
                  (
                    <Card card={card} key={card.id} />
                  )
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
