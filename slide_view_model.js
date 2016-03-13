
(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')
      .factory('slViewModel', ['constant', function( constant) {
  
     var ListView = {
      
      initView: function (elgellaryWindow, elFilm, elfilmViewer, elfilmProgressId, elfilmProgressLine, elfullView){
        
       var  gellaryWindow = (elgellaryWindow)? $(elgellaryWindow) : $(this._gellaryWindow),
        fullView  = (elfullView)? $(elfullView) : $(this._fullView),
        film = (elFilm)? $(elFilm) : $(this._film),
        filmViewer = (elfilmViewer)? $(elfilmViewer) : $(this._filmViewer),
        filmProgressId  = (elfilmProgressId)? $(elfilmProgressId) : $(this._filmProgressId),
        filmProgressLine =  (elfilmProgressLine)? $(elfilmProgressLine) : $(this._filmProgressLine),
        gellaryWindowCss = null,
        fullViewCss = {},
        filmCss = null,
        filmViewerCss = null,
        fstFrameCss = null,
        defltFrameSize = null,
        filmProgressLineCss = {},
        winWidth = null,
        winHeight = null,
        propCssHash = [
          'width',
          'top',
          'left',
          'height'
        ],
        propCssWinHash = [
          'width',
          'height'
        ],
        bootstrWinSize = {
          768:40,
          992:50,
          1200:80
        };
      
      function setWidHeight(el){
        var maxSize = '80px',
          bootstrapCombSize = {
            768:'40px',
            992:'50px',
            1200: maxSize
           },
            
         cycle = function(){
          for (var key in bootstrapCombSize){
            if (el<=key) return bootstrapCombSize[key];
          }
        };
        return cycle() || maxSize;
      }
        
      gellaryWindowCss = this._get(gellaryWindow, propCssWinHash);
      filmCss = this._get(film, propCssHash);
      filmViewerCss = this._get(filmViewer, propCssHash);
      
      winWidth = gellaryWindowCss['width'];
      winHeight = window.innerHeight;  
      defltFrameSize = setWidHeight(winWidth);
      //SET DEFLT SIZE OF FRAMES
      $(film).children('li')
        .css({'width':defltFrameSize, 'height':defltFrameSize});  
        
      var prop = {},
        tagNameFrame = (prop.tagNameFrame)? prop.tagNameFrame: 'LI',
        frameSize = (prop.frame_size)? prop.frame_size : $(film).children(tagNameFrame).size(),
        fstFrame = (prop.fstFrame)? prop.fstFrame : $(film).children('li').first(),
        frameWidth = parseInt($(fstFrame).first().outerWidth()),
        frameCenterPoint = frameWidth/2;
        
        fstFrameCss = this._get(fstFrame, propCssHash);
        
        filmProgressLineCss['height'] = parseInt($(filmProgressLine).css('height'));
        filmCss['width'] = $(fstFrame).outerWidth(false)*frameSize,      
        filmCss['top'] = winHeight-fstFrameCss['height']*2-filmProgressLineCss['height'];
        filmViewerCss['top'] = filmCss['top']; 
        filmViewerCss['height'] = fstFrameCss['height'];
        filmViewerCss['width'] = (winWidth-constant.ID_EL_LN_FOR_FILMVIEW); //reserve 2px dflt to manipulating, determine current el
        
        filmProgressLineCss['top'] = filmCss['top'] - filmProgressLineCss['height'] ;
        filmViewerCss['left'] = (winWidth/2-filmViewerCss['width']/2)+constant.ID_EL_LN_FOR_FILMVIEW/2; // allight center than 2px dflt px right
        filmCss['width'] =(filmCss['width']+(winWidth-filmViewerCss['width'])/2)+fstFrameCss['width'];
        filmCss['left'] = filmViewerCss['left'];
        filmCss['height'] = filmViewerCss['height'];
        
        fullViewCss['height'] = filmCss['top'] - filmProgressLineCss['height'];
        filmCss['margin-left'] = -filmCss['width']+filmViewerCss['width'];
        fstFrameCss['margin-left'] =- filmCss['margin-left'];
        
        this._gellaryWindow = gellaryWindow;
        this._fullView  =  fullView;
        this._film = film;
        this._filmViewer =  filmViewer;
        this._filmProgressId  =  filmProgressId;
        this._filmProgressLine = filmProgressLine,
        // SET GLOBAL VARIABLE //
        constant.LEFT_POS_ID = filmViewerCss['left'],
        constant.TOP_POS_ID = filmViewerCss['top']+filmViewerCss['height']/2;
        constant.WIN_WIDTH = winWidth;
        constant.WIN_HEIGHT = winHeight;
        constant.POS_ID_CSS = filmViewerCss,
        constant.EL_FILM = film; 
        constant.FILM_VIEW = filmViewer;
        constant.FILM_PROGR_ID = filmProgressId;
        constant.FST_FRAME_CSS = fstFrameCss;
        constant.FILM_VIEWER_CSS = filmViewerCss;
        constant.FST_FRAME = fstFrame;
        constant.winWidth = frameCenterPoint;
        constant.FRAME_WIDTH = frameWidth;
        constant.FRAME_CENTER_POINT = frameCenterPoint; 
        // SET CSS TO ELEMENTS //       
        this._set(fullView, fullViewCss);
        this._set(film, filmCss);
        this._set(filmViewer, filmViewerCss);
        this._set(fstFrame, fstFrameCss);
        this._set(filmProgressLine, filmProgressLineCss);
      }
      
    };
        
    function PrivProtMethListView (){
      
      var those = this,
        TYPE_VAL_INIT = 'px';
      
      this._film = null;
      this._gellaryWindow = null;
      this._filmViewer =  null;
      this._filmProgressId  =  null;
      this._fullView = null;
      this._filmProgressLine = null,
      
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
      
      this.init = function(){
        those.initView();
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
    
    PrivProtMethListView.prototype = ListView;
    
    var ListViewClass = new PrivProtMethListView();
    
    return ListViewClass;

      
}]);

})();