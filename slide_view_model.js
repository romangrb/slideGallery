
(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .factory('slViewModel', ['constant', function( constant) {
  
     var ListView = {
      
      initView: function (elFilm, elfilmViewer, elfilmProgressId){

       var arr = [].slice.call(arguments);
       
       if(arr.length!==3||!arr.every(this._isPositiveExpr)) return;
     
       var film = $(elFilm),
        filmViewer = $(elfilmViewer),
        filmProgressId  =  $(elfilmProgressId),
        filmCss = null,   
        filmViewerCss = null,
        fstFrameCss = null,
        winWidth = window.innerWidth, 
        winHeight = window.innerHeight,
        propCssHash = [
          'width',
          'top',
          'left'
        ],
        prop = {},
        tagNameFrame = (prop.tagNameFrame)? prop.tagNameFrame: 'LI',
        frameSize = (prop.frame_size)? prop.frame_size : $(film).children(tagNameFrame).size(),
        fstFrame = (prop.fstFrame)? prop.fstFrame : $(film).children('li').first(),
        frameWidth = parseInt($(fstFrame).first().outerWidth()),
        frameCenterPoint = frameWidth/2;
        
        filmCss = this._get(film, propCssHash),
        filmViewerCss = this._get(filmViewer, propCssHash),
        fstFrameCss = this._get(fstFrame, propCssHash);
        filmCss['width'] = $(fstFrame).outerWidth(false)*frameSize,      
           
        filmViewerCss['top'] = filmCss['top'];
        filmViewerCss['left'] = winWidth/2-filmViewerCss['width']/2; 
        filmCss['width'] =((filmCss['width']+(winWidth-filmViewerCss['width'])/2));
        filmCss['left'] = filmViewerCss['left'];
        filmCss['margin-left'] = -filmCss['width']+filmViewerCss['width'];
        fstFrameCss['margin-left'] =- filmCss['margin-left'];
                
        this._set(film, filmCss);
        this._set(filmViewer, filmViewerCss);
        this._set(fstFrame, fstFrameCss);
        // SET GLOBAL VARIABLE //
        constant.WIN_WIDTH = winWidth;
        constant.WIN_HEIGHT = winHeight;
        constant.POS_ID_CSS = $(filmViewer).css(['top','left','height']),
        constant.LEFT_POS_ID = parseInt(constant.POS_ID_CSS['left']),
        constant.TOP_POS_ID = parseInt(constant.POS_ID_CSS['top'])+parseInt(constant.POS_ID_CSS['height'])/2;
        constant.EL_FILM = film; 
        constant.FILM_VIEW = filmViewer;
        constant.FILM_PROGR_ID = filmProgressId;
        constant.FST_FRAME_CSS = fstFrameCss;
        constant.FILM_VIEWER_CSS = filmViewerCss;
        constant.FST_FRAME = fstFrame;
        constant.winWidth = frameCenterPoint;
        constant.FRAME_WIDTH = frameWidth;
        constant.FRAME_CENTER_POINT = frameCenterPoint; 
      }
      
    };
        
    function privProtMethListView (){
      
      var TYPE_VAL_INIT = 'px';
      
      this._get = function(el ,obj){
        return cycle(el, $(el).css(obj), true);
      };
      this._set = function(el ,obj){
        $(el).css(cycle(el, obj, false));
      };
      
      this._isPositiveExpr = function(str){
        var exp = /\w+/;
        return exp.test(str);
      };
      
      function cycle(el, obj, isGet){     
        for (var key in obj){
          obj[key] = (!!isGet)? parseInt(obj[key]): (isDfnNum(obj[key]))? obj[key]+TYPE_VAL_INIT : 0;
        }
        return obj;  
      }
     
      function isDfnNum(n){
        return !isNaN(parseFloat(n))&&isFinite(n);
      }
      
    }
    
    privProtMethListView.prototype = ListView;
    
    var ListViewClass = new privProtMethListView();
    
    ListViewClass.initView("#film", "#film-viewer", "#film-progress-id");

    return ListViewClass;

      
}]);

})();