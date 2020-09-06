'use strict';
var cardInit = function () {
    var _values = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    var _suits = ['♠', '♣', '♥', '♦'];
    this.checkIndex = function (index = 0) {
        if (typeof index === 'number') {
            if (index >= 0 && index < this.getCountCards()) {
                return true;
            }
        }
        return false;
    }
    this.getOneCard = function (index = 0) {
        if (this.checkIndex(index) == true) {
            return {
                value: _values[index % _values.length],
                suit: _suits[index % _suits.length],
                points: (index % _values.length) + 6
            }
        }
        return null;
    }
    this.getCountCards = function () {
        return _values.length * _suits.length;
    }
}
// var cI = new cardInit();
// for (var i = 0; i < cI.getCountCards(); i++) {
//     console.log(cI.getOneCard(i));
// }
var CardStates = {
    on_deck: 1,
    on_hand: 2,
    on_game: 3,
    on_hurt: 4 //отбой
}
CardStates = Object.freeze(CardStates); //неизменяемой (const)

var Card = function (cicard) {
    var _cicard = cicard; //проверить
    var _isTrump = false;
    var _state = CardStates.on_deck;
    this.getValue = function () {
        return _cicard.value;
    }
    this.getSuit = function () {
        return _cicard.suit;
    }
    this.getPoints = function () {
        return _cicard.points;
    }
    this.getState = function () {
        return _state;
    }
    this.changeState = function(newState) {
        switch(newState) {
            case CardStates.on_hand: {
                if( _state == CardStates.on_deck || 
                    _state == CardStates.on_game ) {
                    _state = CardStates.on_hand;
                } 
                break;
            }
            case CardStates.on_game: {
                if( _state == CardStates.on_hand ) {
                    _state = CardStates.on_game;
                }
                break;
            }
            case CardStates.on_hurt: {
                if( _state == CardStates.on_game ) {
                    _state = CardStates.on_hurt;
                }
                break;
            }
        }
    }
    this.changeTrump = function(newTrump = false) {
        if(newTrump == true && _isTrump == false) {
            _isTrump = true;
            _cicard.points += 1000;
        } else if (newTrump == false && _isTrump == true) {
            _isTrump = false;
            _cicard.points -= 1000;
        }
    }
    this.getTrump = function(){
        return _isTrump;
    }
}

var CardDeck = function() {
    var _cards = [];
    var _cI = new cardInit();
    var _init = function() {
        _cards = [];
        for (var i = 0; i < _cI.getCountCards(); i++) {
                _cards.push (
                    new Card(_cI.getOneCard(i))
                );
            }
    }
    //_init(); //constructor

    this.getOneCard = function(index = 0){
        if(_cI.checkIndex(index)){
            return _cards[index];
        }
        return null;
    }
    this.shuffle = function() {
        // тасование методом Фишера-Йетса
        var tmp = null;
        var tmpIndex = -1;
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < _cI.getCountCards(); i++) {
                tmpIndex = Math.floor(Math.random() * _cI.getCountCards());
                tmp = _cards[i];
                _cards[i] = _cards[tmpIndex];
                _cards[tmpIndex] = tmp;
            }
        }
    }
    this.defineTrump = function () {
        var randSuit  = _cards[Math.floor(Math.random() *
                             _cI.getCountCards())].getSuit();
        for (let i = 0; i < _cI.getCountCards(); i++) {
            if(_cards[i].getSuit() == randSuit){
                _cards[i].changeTrump(true);
            } else {
                _cards[i].changeTrump(false);
            }
        }
    }

    this.newGame = function() {
        _init();
        this.shuffle();
        this.defineTrump();
    }
    this.newGame();
}

var cd = new CardDeck();
    //cd.newGame();
for (let i = 0; i < 36; i++) {
    const card  = cd.getOneCard(i);
    console.dir(
            card.getValue() + " " + 
            card.getSuit() + " " + 
            card.getPoints() + " " + 
            card.getTrump() + " " + 
            card.getState()
    );
}