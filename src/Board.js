import React, { Component } from 'react';
import './App.css';
import List from './List';
import { reduce } from 'lodash';
import { Plus, Close } from 'mdi-material-ui';
import { Button, TextField } from '@material-ui/core';

export default class Board extends Component {
  state = {
    lists: {
      'todo': { key: 'todo', name: 'To Do' },
      'doing': { key: 'doing', name: 'Doing' },
      'done': { key: 'done', name: 'Done' },
    },
    cards: [
      { id: 1, title: 'Create a Kanban board', category: 'todo' },
      { id: 2, title: 'Create multiple lists', category: 'todo' },
      { id: 3, title: 'Create a few cards', category: 'doing' },
      { id: 4, title: 'Categories the cards into the respective lists', category: 'done' },
      { id: 5, title: 'Implement Drag and Drop', category: 'doing' },
      { id: 6, title: 'Let the user to create another list', category: 'doing' },
      { id: 7, title: 'Let the user to create another card', category: 'doing' },
      { id: 8, title: 'Handle the onclick event of each card', category: 'doing' },
      { id: 9, title: 'Make a slightly more complicated card UI', category: 'doing' },
    ],
    showListForm: false,
    listTitle: '',
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

  addNewCard = (listKey, cardTitle) => {
    const nextId = this.state.cards.length + 1;
    this.setState({
      cards: [
        ...this.state.cards,
        { id: nextId, title: cardTitle, category: listKey },
      ]
    });
  }

  addNewList = () => {
    const listName = this.state.listTitle;
    const listKey = listName.replace(/ /g, '').toLowerCase();
    this.setState({
      lists: {
        ...this.state.lists,
        [listKey]: { key: listKey, name: listName },
      },
      showListForm: false,
      listTitle: '',
    });
  }

  toggleListForm = () => {
    this.setState({ showListForm: !this.state.showListForm });
  }

  updateListTitle = (e) => {
    this.setState({ listTitle: e.target.value })
  }

  render() {
    const { lists, cards, showListForm, listTitle } = this.state;

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
              <List list={list} key={list.key} dropItem={this.dropItem} addNewCard={this.addNewCard} />
            )
          )
        }
        <div className='list-form'>
          <div className='form-container'>
            {
              showListForm ?
                (
                  <div>
                    <div className='title-field' >
                      <TextField
                        value={listTitle}
                        placeholder='Enter list title...'
                        InputProps={{ disableUnderline: true }}
                        onChange={this.updateListTitle}
                      />
                    </div>
                    <div className='form-actions' >
                      <Button color='primary' variant="contained" size='small' onClick={this.addNewList} >
                        Add List
                      </Button>
                      <Button onClick={this.toggleListForm} size='small'>
                        <Close />
                      </Button>
                    </div>
                  </div>
                )
                :
                (<Button className='form-btn' onClick={this.toggleListForm}>
                  <Plus className='form-icon' fontSize='small' />
                  <div className='form-text'>Add a new list</div>
                </Button>)
            }
          </div>
        </div>
      </div>
    );
  }
}
