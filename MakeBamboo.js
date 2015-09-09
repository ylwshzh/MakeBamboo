/*
** 
*/

// 牌类型（花色）
if (typeof CardType == "undefined")
{
	var CardType = {};
	CardType.Spade = 1;
	CardType.Heart = 2;
	CardType.Club = 3;
	CardType.Diamond = 4;
}

// 牌的种类数
var CARDTYPECOUNT = 4;
var MAXCARDNUMBER = 13;

var MakeBambooManager = (function()
{
	var _instance;
	var _curCardEnd : int[CARDTYPECOUNT];			// 当前每种花色已经出的最大点数
	var _cards : int[CARDTYPECOUNT, MAXCARDNUMBER];
	
	// 设置cardType花色当前最大点数
	function SetCurCardEnd(cardType, end)
	{
		if (end < 0 || end >= CARDTYPECOUNT)
		{
			return;
		}
		
		_curCardEnd[cardType] = end;
	}
	
	// 初始化
	function init()
	{
		_cards = new int[CARDTYPECOUNT, MAXCARDNUMBER];
		for (i = 0; i < CARDTYPECOUNT; ++i)
		{
			for (j  = 0; j < MAXCARDNUMBER; ++j)
			{
				_cards[i][j] = i * MAXCARDNUMBER + j;
			}
		}
		
		return
		{
			// public propertities
			GetCurCardEnd : function()
			{
				return _curCardEnd;
			}
			// public methods
		};
	}
	
	return
	{
		GetInstance : function()
		{
			if (!_instance)
			{
				_instance = init();
			}
			
			return _instance;
		}
	};
} ());