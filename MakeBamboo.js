/*
** 
*/

// 牌类型（花色）
if (typeof CardType == "undefined") {
	var CardType = {};
	CardType.Spade = 1;
	CardType.Heart = 2;
	CardType.Club = 3;
	CardType.Diamond = 4;
}

// 牌的种类数
var CARD_TYPE_COUNT = 4;
var MAX_CARD_NUMBER = 13;
var PLAYER_COUNT = 3;

var MakeBambooManager = (function() {
	var _instance;
	var _curCardEnd;			// 当前每种花色已经出的最大点数
	var _cards;
	var _playerCards : int[];
	var _curPlay;
	var _cardsCanPlay;
	
	// 初始化
	function init()	{
		_cardsCanPlay = new Array();
		_playerCards = new int[PLAYER_COUNT];
		_curCardEnd = new int[CARD_TYPE_COUNT];
		_cards = new Array();
		for (i = 0; i < CARD_TYPE_COUNT; ++i)	{
			for (j  = 0; j < MAX_CARD_NUMBER; ++j) {
				_cards.add(i * MAX_CARD_NUMBER + j);
			}
		}
		
		return {
			// public propertities
			
			
			// public methods-
			// 设置cardType花色当前最大点数
			GetCurCardEnd : function() {
				return _curCardEnd;
			}
			
			// 设置当前已出牌的最大点数
			SetCurCardEnd : function(cardType, end) {
				if (end < 0 || end >= CARD_TYPE_COUNT) {
					return;
				}
				
				_curCardEnd[cardType] = end;
			}
			
			// 确定先给谁发牌
			GetFirstDeal : function() : int {
				var index = Math.floor(Math.random() * _cards.length);
				var who = (_cards[index] % MAX_CARD_NUMBER ) % PLAYER_COUNT;
				return who;
			}
			
			// 发牌
			DealCards : function() {
				var who = GetFirstDeal();
				while (_cards.length != 0) {
					index = Math.floor(Math.random() * _cards.length);
					_playerCards[who++].add(_cards[index]);
					_card.splice(index, 1);
					
					if (who >= PLAYER_COUNT) {
						who = 0;
					}
				}
			}
			
			// 谁先出牌
			GetFirstPlay : function() {
				for (var index in _playerCards) {
					for (var indx in _playerCards[index]) {
						if (_playerCards[index][indx] / MAX_CARD_NUMBER == CardType.Heart && _playerCards[index][indx] % MAX_CARD_NUMBER) {
							_curPlay = index;
							return index;
						}
					}
				}
				
				return 0;
			}
			
			// 下个出牌
			SetNextPlay : function() {
				if (++_curPlay >= PLAYER_COUNT) {
					_curPlay = 0;
				}
			}
			
			// 当前谁在出牌
			GetCurPlay : function() {
				return _curPlay;
			}
			
			// 提示
			Hint : function() {
				var index = Math.floor(Math.random() * _playerCards[_curPlay].length);
				return _playerCards[_curPlay][index];
			}
			
			// 是否有牌可出
			CanPlay : function() {
				boolean canPlay = false;
				if (_cardsCanPlay.length > 0) {
					_cardsCanPlay.splice(0, _cardsCanPlay.length);
				}
				
				for (var index in _playerCards[_curPlay]) {
					for (var indx in _curCardEnd) {
						if (_playerCards[_curPlay][index] == _curCardEnd[indx] + 1) {
							_cardsCanPlay.add(_playerCards[_curPlay][index]);
							canPlay = true;
						}
					}
				}
				
				return canPlay;
			}
			
			AIBorrowCard : function() {
				;
			}
			
			// AI出牌
			AIPlay : function() {
				if (!CanPlay()) {
					return;
				}
				
				var index = Math.floor(Math.random() * _cardsCanPlay.length);
				var indx = 0;
				for (var i in _playerCards[_curPlay]) {
					if (_playerCards[_curPlay][i] == _cardsCanPlay[index]) {
						indx = i;
						_playerCards[_curPlay].splice(i, 1);
						SetCurCardEnd(_cardsCanPlay[index] / MAX_CARD_NUMBER, _cardsCanPlay[index]);
						break;
					}
				}
			}
		};
	}
	
	return {
		GetInstance : function() {
			if (!_instance) {
				_instance = init();
			}
			
			return _instance;
		}
	};
} ());