import React, { Component } from 'react';
import styles from './Card.module.scss';

export default class Card extends Component {
  onDragStart = (e, cardId) => {
    e.dataTransfer.setData('cardId', cardId);
  }

  render() {
    const { card } = this.props;
    return (
      <div className={styles['card']}
        onDragStart={(e) => this.onDragStart(e, card.id)}
        draggable
      >
        <div className={styles['card-summary']}>
          {card.title}
        </div>
      </div>
    );
  }
}
