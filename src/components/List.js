import React, { Component } from 'react';
import styles from './List.module.scss'
import Card from './Card';
import { Plus, Close } from 'mdi-material-ui';
import { Button, TextField } from '@material-ui/core';
export default class List extends Component {
  state = {
    cardTitle: '',
    showCardForm: false,
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e, listKey) => {
    let cardId = e.dataTransfer.getData('cardId');
    this.props.dropItem(listKey, cardId);
  }

  toggleCardForm = () => {
    this.setState({ showCardForm: !this.state.showCardForm });
  }

  updateCardTitle = (e) => {
    this.setState({ cardTitle: e.target.value })
  }

  handleAddCard = (listKey, cardTitle) => {
    this.props.addNewCard(listKey, cardTitle);
    this.setState({ showCardForm: !this.state.showCardForm, cardTitle: '' });
  }

  render() {
    const { list } = this.props;
    const { cardTitle, showCardForm } = this.state;
    return (
      <div className={styles['list']}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => { this.onDrop(e, list.key) }}
      >
        <div className={styles['list-container']}>
          <div className={styles['list-header']}>{list.name}</div>
          <div className={styles['list-content']}>
            <div className={styles['cards']}>
              {
                list.cards.map(card =>
                  (
                    <Card card={card} key={card.id} />
                  )
                )
              }
            </div>
          </div>
          <div className={styles['list-footer']}>
            {
              showCardForm ?
                (<div className={styles['card-form']}>
                  <div className={styles['title-field']}>
                    <TextField
                      multiline
                      rows="3"
                      value={cardTitle}
                      placeholder='Enter a title for this card'
                      InputProps={{ disableUnderline: true }}
                      onChange={this.updateCardTitle}
                    />
                  </div>
                  <div className={styles['form-actions']} >
                    <Button color='primary' variant="contained" size='small' onClick={() => this.handleAddCard(list.key, cardTitle)} >
                      Add Card
                    </Button>
                    <Button onClick={this.toggleCardForm} size='small'>
                      <Close />
                    </Button>
                  </div>
                </div>) :
                (
                  <Button className={styles['footer-btn']} onClick={this.toggleCardForm}>
                    <Plus className={styles['footer-icon']} fontSize='small' />
                    <div className={styles['footer-text']}>Add a new card</div>
                  </Button>
                )
            }
          </div>

        </div>
      </div>
    );
  }
}
