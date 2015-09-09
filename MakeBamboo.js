/*
** 
*/

// �����ͣ���ɫ��
if (typeof CardType == "undefined")
{
	var CardType = {};
	CardType.Spade = 1;
	CardType.Heart = 2;
	CardType.Club = 3;
	CardType.Diamond = 4;
}

// �Ƶ�������
var CARDTYPECOUNT = 4;
var MAXCARDNUMBER = 13;

var MakeBambooManager = (function()
{
	var _instance;
	var _curCardEnd : int[CARDTYPECOUNT];			// ��ǰÿ�ֻ�ɫ�Ѿ�����������
	var _cards : int[CARDTYPECOUNT, MAXCARDNUMBER];
	
	// ����cardType��ɫ��ǰ������
	function SetCurCardEnd(cardType, end)
	{
		if (end < 0 || end >= CARDTYPECOUNT)
		{
			return;
		}
		
		_curCardEnd[cardType] = end;
	}
	
	// ��ʼ��
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