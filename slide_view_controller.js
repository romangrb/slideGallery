
(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')  
      .controller('slideViewController', ['$scope', 'SlView', 'slViewModel', 'constant', function ($scope, SlView, slViewModel, constant) {
      
    var EngineSlide = {
      
      setInitProp : function(hash){
        this._prop = hash;
        this._setPosView();
        this._setProp();
      },
      getInitProp : function(name){
        return this._prop[name];
      },
      constructor:function fn(){
        this._prop = null;
      }
    };
     
    function PrivProtMethEngineSlide (){
      
      var slViewCl = new SlView(),
        slKbViewCl = new SlView(),
        those = this,
        pxSum = 0,
        isThrow = true,
        isChangePos = false;
      
      this._DEFLT_POS_FRAME_A = null;
      this._DEFLT_POS_FRAME_B = null;
      this._FRAME_DISTANCE = null;
      this._crntPos = null;
      this._side = false;
      
      this._TAG_NAME_FRAME = null;
      this._FST_FRAME = null;
      this._DELAY_ANIMATE_DFLT = null;
      this._MAX_PERC = null;
      this._FILM_PROGR_ID = null;
      this._FRAME_WIDTH = null;
      this._LEFT_POS_ID = null;
      this._TOP_POS_ID = null;
      this._LEFT_POS_ID_FIX = null;
      this._FRAME_CENTER_POINT = null;
      this._DELAY_FIX_DFLT = null;
      this._DFLT_DIFF = 1;
      this._PX_SUM = 15;
      this._RETURN_SEC = 0.1;
      this._MS_IN_SEC = 1000;
      this._DFLT_DELAY_INIT_PROP = 1000;
      this._DFLT_DELAY_FIX = 250;
      
      this._fstElMargLeft = null;
      
      this._initPosX = this._LEFT_POS_ID;
      this._tDiff = 0;
      this._tStart = null;
      this._isDrop = false;
      this._isMoving = false;
      this._tKbStart = null;
      
      this._DFLT_TOUCH_LN = 20;
      this._DFLT_TOUCH_TIME_MAX = 1.5;
      this._DFLT_TOUCH_POWER = 2;
      
      this._DFLT_KB_LN = 3;
      this._DFLT_KB_TIME_MAX = 3;
      this._DFLT_KB_TIME_MIN = 0.1;
      this._DFLT_KB_POWER = 2;
      
      this._setProp = function(){
        
        this._TAG_NAME_FRAME  = this.getInitProp('TAG_NAME_FRAME');
        this._FST_FRAME = this.getInitProp('FST_FRAME');
        this._DELAY_ANIMATE_DFLT = this.getInitProp('DELAY_ANIMATE_DFLT');
        this._MAX_PERC = this.getInitProp('MAX_PERC');
        this._FILM_PROGR_ID = this.getInitProp('FILM_PROGR_ID');
        this._LEFT_POS_ID = this.getInitProp('LEFT_POS_ID');
        this._TOP_POS_ID =  this.getInitProp('TOP_POS_ID');
        this._FRAME_CENTER_POINT = this.getInitProp('FRAME_CENTER_POINT');
        this._DELAY_FIX_DFLT = this.getInitProp('DELAY_FIX_DFLT');
        this._LEFT_POS_ID_FIX = this._LEFT_POS_ID-this._DFLT_DIFF;
        
      };
        
      this._setPosView = function (){
        
        this._FRAME_WIDTH = this.getInitProp('FRAME_WIDTH');
        this._DFLT_KB_LN = this._FRAME_WIDTH;
        this._DEFLT_POS_FRAME_A = parseInt(this.getInitProp('FST_FRAME_CSS')['margin-left']),
        this._DEFLT_POS_FRAME_B = parseInt(this.getInitProp('FILM_VIEWER_CSS')['left'])-this._FRAME_WIDTH,
        this._FRAME_DISTANCE = this._DEFLT_POS_FRAME_A - this._DEFLT_POS_FRAME_B,
        this._crntPos =  parseInt(this.getInitProp('FST_FRAME').css('margin-left'));
        
        slKbViewCl.setInitPowProp(this._DFLT_KB_LN, this._DFLT_KB_TIME_MAX , this._DFLT_KB_POWER);
        slViewCl.setInitPowProp(this._DFLT_TOUCH_LN, this._DFLT_TOUCH_TIME_MAX, this._DFLT_TOUCH_POWER);
         
      };
      
      this._setProgress = function(delay){
        
        var delayInt = delay || those._DELAY_ANIMATE_DFLT,
         lnMarg = this._fstElMargLeft,
         currentPosProgr = Math.ceil(this._MAX_PERC-(lnMarg-this._DEFLT_POS_FRAME_B)/this._FRAME_DISTANCE*this._MAX_PERC)+'%';
         this._FILM_PROGR_ID.animate({'width':currentPosProgr}, delayInt, 'easeOutCirc');
      };
      
      this._fixFramePosition = function(){
        
        var el = this._FST_FRAME,
          tn = this._TAG_NAME_FRAME,
          currentElem = null,
          fstElMargL = parseInt($(el).css('margin-left')),
          elemInPointPos = getElemInPosition(this._LEFT_POS_ID_FIX, this._TOP_POS_ID);
            
          try {
            checkElem(fstElMargL, elemInPointPos);
          } catch(e) {
              console.error('\n' +'msg : '+e.message+'\n' + 'lineNumber : ' + e.lineNumber);
              return;
          }
         
        currentElem = ($(elemInPointPos).get(0).tagName!==tn)? $(el).get(0) : $(elemInPointPos).get(0);
        
        this._isMoving = true;
        
        var elCssLeft = $(currentElem).offset()['left'],
          diffPos  = Math.abs(elCssLeft-this._LEFT_POS_ID-this._DFLT_DIFF),
          diffSide = Math.abs(diffPos-this._FRAME_WIDTH)>=this._FRAME_CENTER_POINT,
          posMarg = (!!diffSide)? 
            fstElMargL-Math.abs(this._FRAME_WIDTH-diffPos)+this._FRAME_WIDTH :
            fstElMargL-Math.abs(this._FRAME_WIDTH-(diffPos-this._FRAME_WIDTH))+this._FRAME_WIDTH;
            
        $(el).
          animate({'margin-left':posMarg+'px'}, 
          this._DFLT_DELAY_FIX, 'easeOutCirc')
            .promise()
            .done(function () {
              those._isMoving = false;
            });
          
      };
        
      this._isBorder = function (xPosMove){
        return ((xPosMove >= this._DEFLT_POS_FRAME_A) || (xPosMove <= this._DEFLT_POS_FRAME_B ))? true : false;
      };
      
      this._pixDiff = function(pxln){
        
        var te = new Date(),
          td = null;
          
        pxSum = pxSum + Math.abs(pxln);
        td = (te - this._tStart) / this._MS_IN_SEC;
       
        if(pxSum>=this._PX_SUM&&td>this._RETURN_SEC) {
        
          this._tStart = new Date();
          pxSum = 0;
          isThrow = false;
        }else{
          isThrow = true;
        }
        
      };
      
      this._keySwipeInit = function(side){
        
        this._side = side;
        if (!this._tKbStart) this._tKbStart = new Date();
      };
      
      this._moveSlide = function(event) {
        
        var currentPos = {},
          throwLn = null;
          
        if (!!event){ 
          this._tDiff = ( new Date() - this._tStart )/ this._MS_IN_SEC;
          throwLn = (this._tDiff)? slViewCl.power(this._tDiff) : false;
        }else{
          this._tDiff = ( new Date() - this._tKbStart )/ this._MS_IN_SEC;
          this._tDiff = ( this._tDiff<this._DFLT_KB_TIME_MAX )? 
            Math.abs(this._tDiff - this._DFLT_KB_TIME_MAX) : this._DFLT_KB_TIME_MIN;
          this._tKbStart = null;
          throwLn = (this._tDiff)? slKbViewCl.power(this._tDiff) : false;
        }
        
        if (!throwLn) return;
        
        this._isMoving = true;
        
        var fstElMargLeft = parseInt($(this._FST_FRAME).css('margin-left')),
          lnMarg = (!!this._side) ? fstElMargLeft + throwLn : fstElMargLeft - throwLn;
          
        if (this._isBorder(lnMarg)) lnMarg = (!!this._side)? this._DEFLT_POS_FRAME_A :  this._DEFLT_POS_FRAME_B+1;
        
        currentPos['margin-left'] = lnMarg;
        this._fstElMargLeft = lnMarg;
        this._FST_FRAME
          .animate(currentPos, this._DELAY_ANIMATE_DFLT, 'easeOutCirc')
          .promise().done(function () {
            those._fixFramePosition();
            those._setProgress();
          });
      };
      
      this.swipeKb = function (side, type){
        if (!!this._isMoving) return;
        (type!=='keyup')? this._keySwipeInit(side) : this._moveSlide(false);
          
      };
      
      this.isSwiped = function(isDroped){
        if (!!this._isMoving) return;
        this._isDrop = isDroped;
      };
        
      this.swipe = function(x, isSwiped){
        
        if(!!this._isMoving) return;
          
        var posXmov = x - this._initPosX,
          fstElMargLeft = parseInt($(this._FST_FRAME).css('margin-left')),
          
          lnMarg = (posXmov<0)?fstElMargLeft-Math.abs(posXmov) : fstElMargLeft + posXmov;
          
          if (!this._isBorder(lnMarg)) $(this._FST_FRAME).css({'margin-left' : lnMarg+'px'}), this._fstElMargLeft = lnMarg;
          
          swipeUpdateProp(x, posXmov);
          
          if (!this._isDrop) {
            (!!isThrow&&isChangePos)? 
              this._moveSlide(true) :
              this._fixFramePosition();
              
          this._setProgress();
          }
         
      };
        
      this.setSwipeInit = function(x){
        this._tStart = new Date();
        this._initPosX = x;
      };
      
      this._getPos = function(initPos, curPos){
          
        var arr = [].slice.call(arguments);
          
        if (arr.length!==2||!arr.every(this._isPositiveExpr)) return;
        isChangePos = (initPos!=curPos)? true : false;
        this._side = (initPos<curPos)? true : false ;
        
      };
        
      this._isDfnNum = function(n){
        return !isNaN(parseFloat(n))&&isFinite(n);
      };
       
      this._isPositiveExpr = function(n){
        return those._isDfnNum(n);
      };
      
      function swipeUpdateProp(x, posXmov){
          
        those._getPos(those._initPosX, x);
        those._initPosX = x;
        those._pixDiff(posXmov);
          
      }
            
      function getElemInPosition (x, y){
        return document.elementFromPoint(x, y);
      }
      
      function checkElem() {
        
        var arr = [].slice.call(arguments);
        if (arr.length!==2 || arr.every(isElem)) throw new Error("Object is not found");
        function isElem (n){
          return n===undefined;
        }
      }
      
      var setPropOnResize = debounce(function() {
        
        slViewModel.init();
        those._setProp();
        those._setPosView();
        
      }, those._DFLT_DELAY_INIT_PROP);
      
      window.addEventListener('resize', setPropOnResize);
      
      function debounce (func, wait, immediate) {
        
       var timeout;
      	return function() {
      		var context = this, args = arguments;
      		var later = function() {
      			timeout = null;
      			if (!immediate) func.apply(context, args);
      		};
      		var callNow = immediate && !timeout;
      		clearTimeout(timeout);
      		timeout = setTimeout(later, wait);
      		if (callNow) func.apply(context, args);
      	};
      }
    }
     
    PrivProtMethEngineSlide.prototype = EngineSlide;
    
    var SlViewCtrl = new PrivProtMethEngineSlide();
    
    SlViewCtrl.setInitProp(constant);
    
    var endTime = null, 
      startTime = null,
      initX = null,
      xPos = null,
      isTouch = false,
      tStart = null,
      tEnd = null;
      
      
    document.onkeydown = checkKey;
    document.onkeyup = checkKey;

    function checkKey(e) {
      
      e = e || window.event;
        
      switch (e.keyCode){
        case 37:
          SlViewCtrl.swipeKb(true, e.type);
        break;
        case 39:
          SlViewCtrl.swipeKb(false, e.type);
        break;
      }
    
    }
      
    $scope.mousedownEv = function ($event) {
      
      isTouch = true;
      SlViewCtrl.isSwiped(true);
      SlViewCtrl.setSwipeInit($event.clientX);
    };
    
    $scope.mousemoveEv = function ($event) {
      if(!!isTouch){
        SlViewCtrl.swipe($event.clientX);
      }
    };
    
    $scope.mouseupEv = function ($event) {
      isTouch = false;
      SlViewCtrl.isSwiped(false);
      SlViewCtrl.swipe($event.clientX);
    };
    
    $scope.mouseoutEv = function ($event) {
      if(!!isTouch){
        isTouch = false;
        SlViewCtrl.isSwiped(false);
        SlViewCtrl.swipe($event.clientX);
      }
    };
    
  }]);
  
})();