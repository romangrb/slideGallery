
(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .factory('slView', function() {
        
       var SlideViewer = {  
        
        constructor:function fn(){
          this._isConfig = false;
        },
        
        setInitPowProp : function (intrvLen, maxTimeDiff, powN){
          
          this._intrvLen = intrvLen || this._DEFLT_MAX_INTRV_LN;
          this._maxTimeDiff = maxTimeDiff || this._DEFLT_MAX_TIME_DIFF;
          this._powN = this.powN || this._DEFLT_POW;
          this._isConfig = true;
        },
        
        power : function(tDiff){
          tDiff = (tDiff)? tDiff: 0;
          if(!this._isConfig) this.setInitPowProp();
          
          return (tDiff<=this._maxTimeDiff)?(Math.pow((1+(this._maxTimeDiff-tDiff)), this._powN)*this._intrvLen) |0 : 0;
        }
      };
       
       function PrivProtMeth (){
        
        this._DEFLT_MAX_INTRV_LN = 3,
        this._DEFLT_MAX_TIME_DIFF = 3,
        this._DEFLT_POW = 3,
        this._intrvLen = 0,
        this._maxTimeDiff = 0,
        this._powN = 0;
    
   }
        
       PrivProtMeth.prototype = SlideViewer;
        
       var SlView = new PrivProtMeth();
       
       return SlView;
   
  });
  
})();