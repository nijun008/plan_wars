# planeswar
飞机大战小游戏
关键词：定时器，原生JS，DOM操作。

监听键盘方向键（W,A,S,D）控制自己的飞机移动；
用定时器控制飞机产生子弹、发射子弹、敌机移动；
判定子弹与敌方飞机的位置，条件为真即为击落，然后移除击中敌机的子弹，复位被击中敌机位置，得分+1，得分每增加10提升一个难度；
判定敌机与自己飞机位置，条件为真相撞即游戏结束弹出得分框并清除所有计时器。
