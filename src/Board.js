import React, { Component } from 'react';
import './App.css';
import List from './List';
import { reduce } from 'lodash';

export default class Board extends Component {
  state = {
    lists: {
      'todo': { key: 'todo', name: 'To Do' },
      'doing': { key: 'doing', name: 'Doing' },
      'done': { key: 'done', name: 'Done' },
    },
    cards: [
      { id: 1, title: 'Create a Kanban board', desc: '...', category: 'todo' },
      { id: 2, title: 'Create multiple lists', desc: '...', category: 'todo' },
      { id: 3, title: 'Create a few cards', desc: '...', category: 'doing' },
      { id: 4, title: 'Categories the cards into the respective lists', desc: '...', category: 'done' },
      { id: 5, title: 'Implement Drag and Drop', desc: '...', category: 'doing' },
      { id: 6, title: 'Let the user to create another list', desc: '...', category: 'doing' },
      { id: 7, title: 'Let the user to create another card', desc: '...', category: 'doing' },
      { id: 8, title: 'Handle the onclick event of each card', desc: '...', category: 'doing' },
      { id: 9, title: 'Make a slightly more complicated card UI', desc: '...', category: 'doing' },
    ]
  }

  dropItem = (listKey, cardId) => {
    const clonedCards = [...this.state.cards];
    const cardIndex = clonedCards.findIndex(el => String(el.id) === cardId);
    this.setState({
      cards: [
        ...clonedCards.slice(0, cardIndex),
        { ...clonedCards[cardIndex], category: listKey },
        ...clonedCards.slice(cardIndex + 1)
      ]
    });
  }

  render() {
    const { lists, cards } = this.state;

    let listsWithCards = reduce(Object.keys(lists), (r, d) => {
      r[d] = {
        key: d,
        name: lists[d] && lists[d].name,
        cards: []
      };
      return r;
    }, {});

    cards.forEach((card) => {
      listsWithCards[card.category].cards.push(card);
    });

    return (
      <div className='board'>
        {
          Object.values(listsWithCards).map(list =>
            (
              <List list={list} key={list.key} dropItem={this.dropItem} />
            )
          )
        }
      </div>
    );
  }
}
