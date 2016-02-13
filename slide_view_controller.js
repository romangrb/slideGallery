
(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')  
      .controller('slideViewController', ['$scope', 'slView', 'slViewModel', 'constant', function ($scope, slView, slViewModel, constant) {
  
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
      
      var slViewCl = slView,
        those = this;
      
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
      this._FRAME_CENTER_POINT = null;
      this._DELAY_FIX_DFLT = null;
      
      this._fstElMargLeft = null;
      
      this._initPosX = this._LEFT_POS_ID;
      this._tDiff = 0;
      this._tStart = null;
      
      this._setProp = function(){
        
        this._TAG_NAME_FRAME  = this.getInitProp('TAG_NAME_FRAME');
        this._FST_FRAME = this.getInitProp('FST_FRAME');
        this._DELAY_ANIMATE_DFLT = this.getInitProp('DELAY_ANIMATE_DFLT');
        this._MAX_PERC = this.getInitProp('MAX_PERC');
        this._FILM_PROGR_ID = this.getInitProp('FILM_PROGR_ID');
        this._FRAME_WIDTH = this.getInitProp('FRAME_WIDTH');
        this._LEFT_POS_ID = this.getInitProp('LEFT_POS_ID');
        this._TOP_POS_ID =  this.getInitProp('TOP_POS_ID');
        this._FRAME_CENTER_POINT = this.getInitProp('FRAME_CENTER_POINT');
        this._DELAY_FIX_DFLT = this.getInitProp('DELAY_FIX_DFLT');
        
      };
        
      this._setPosView = function (){
        
        this._DEFLT_POS_FRAME_A = parseInt(this.getInitProp('FST_FRAME_CSS')['margin-left']),
        this._DEFLT_POS_FRAME_B = parseInt(this.getInitProp('FILM_VIEWER_CSS')['left']),
        this._FRAME_DISTANCE = this._DEFLT_POS_FRAME_A - this._DEFLT_POS_FRAME_B,
        this._crntPos =  parseInt(this.getInitProp('FST_FRAME').css('margin-left'));
         
      };
      
      this._setProgress = function(lnMarg, delay){
        var delayInt = delay || those._DELAY_ANIMATE_DFLT,
         currentPosProgr = ~~(this._MAX_PERC-(lnMarg-this._DEFLT_POS_FRAME_B)/this._FRAME_DISTANCE*this._MAX_PERC)+'%';
         this._FILM_PROGR_ID.animate({'width':currentPosProgr}, delayInt, 'easeOutCirc');
      };
      
      this._moveSlide = function() {
        
       var currentPos = {},
        throwLn = (this._tDiff)? slViewCl.power(this._tDiff) : false;
        if (!throwLn) return;
          
        var fstElMargLeft = parseInt($(this._FST_FRAME).css('margin-left')),
        lnMarg = (!!this._side) ? fstElMargLeft + throwLn : fstElMargLeft - throwLn;
        
        if (this._isBorder(lnMarg)) lnMarg = (!!this._side)? this._DEFLT_POS_FRAME_A :  this._DEFLT_POS_FRAME_B;
        
        currentPos['margin-left'] = lnMarg;
        
        $.when(
          this._FST_FRAME.animate(currentPos, this._DELAY_ANIMATE_DFLT, 'easeOutCirc').promise()
        ).done(function() {
          those._fixFramePosition(),
          those._setProgress(lnMarg);
        });
      };   
      
      this._fixFramePosition = function(){
        
        var el = this._FST_FRAME,
          tn = this._TAG_NAME_FRAME,
          fstElMargL = parseInt($(el).css('margin-left')),
          elemInPointPos = getElemInPosition(this._LEFT_POS_ID, this._TOP_POS_ID);
          
          try {
            checkElem(fstElMargL, elemInPointPos);
            if ($(elemInPointPos).get(0).tagName!==tn) throw new Error("check position elem is not found");
          } catch(e) {
              console.error('\n' +'msg : '+e.message+'\n' + 'lineNumber : ' + e.lineNumber);
              
              console.log(1, $(elemInPointPos));
              
              return;
          }
        
        var elCssLeft = $(isElem).offset()['left'],
          diffPos  = Math.abs(elCssLeft-this._LEFT_POS_ID),
          diffSide = Math.abs(diffPos-this._FRAME_WIDTH)>=this._FRAME_CENTER_POINT,
          posMarg = (!!diffSide)? 
            this._fstElMargLeft-Math.abs(this._FRAME_WIDTH-diffPos)+this._FRAME_WIDTH :
            this._fstElMargLeft-Math.abs(this._FRAME_WIDTH-(diffPos-this._FRAME_WIDTH))+this._FRAME_WIDTH;
            
          $(el).animate({'margin-left':posMarg+'px'}, this._DELAY_FIX_DFLT, 'easeOutCirc');
          
      };
        
      this._isBorder = function (xPosMove){
        return ((xPosMove >= this._DEFLT_POS_FRAME_A) || (xPosMove <= this._DEFLT_POS_FRAME_B))? true : false;
      };
        
      this.swipe = function(x, isMove){
        
        var posXmov = x - this._initPosX,
          fstElMargLeft = parseInt($(this._FST_FRAME).css('margin-left'));
        
        if (!!isMove){
        
          /*var lnMarg = (posXmov<0)?fstElMargLeft-Math.abs(posXmov) : fstElMargLeft + posXmov;
            if (!this._isBorder(lnMarg)) $(this._FST_FRAME).css({'margin-left' : lnMarg+'px'});
            this._initPosX = x;*/
            
        } else {
          console.log('throw');
          
          if (!!this._getPos( this._initPosX, x)) this._moveSlide();
          
        }
        
      };
          
      this.setTimeStart = function(x){
        this._tStart = new Date();
        this._initPosX = x;
      };
        
      this._getPos = function(initPos, curPos){
          
        var arr = [].slice.call(arguments);
        if (arr.length!==2||!arr.every(this._isPositiveExpr)) return;
        
        this._side = (initPos>curPos)? true : false;
        this._tDiff = ( new Date() - this._tStart )/ 1000;
        return true;
      };
        
      this._isDfnNum = function(n){
        return !isNaN(parseFloat(n))&&isFinite(n);
      };
       
      this._isPositiveExpr = function(n){
        return those._isDfnNum(n);
      };
              
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
      
  }
    
    PrivProtMethEngineSlide.prototype = EngineSlide;
    
    var SlView = new PrivProtMethEngineSlide();
    SlView.setInitProp(constant);
    
    // Carousel thing
    
    var endTime = null, 
      startTime = null,
      initX = null,
      xPos = null,
      isTouch = false,
      tStart = null,
      tEnd = null;
    
    $scope.mousedownEv = function ($event) {
      isTouch = true;
      SlView.setTimeStart($event.clientX);
      console.log('down');
    };
    
    $scope.mousemoveEv = function ($event) {
      if(!!isTouch){
        SlView.swipe($event.clientX, true);
      }
    };
    
    $scope.mouseupEv = function ($event) {
      isTouch = false;
      SlView.swipe($event.clientX, false);
    };
    
    $scope.mouseoutEv = function ($event) {
      if(!!isTouch){
        isTouch = false;
        SlView.swipe($event.clientX, false);
      }
    };
  }]);
  
})();