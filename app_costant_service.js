(function () {
  
  "use strict";
  
  angular.module('galleryApp')
    .constant('constant', {
      
      DELAY_ANIMATE_DFLT: 500,
      TAG_NAME_FRAME : 'LI',
      ID_EL_LN_FOR_FILMVIEW: 2,
      EL_FILM : '#film',
      MIN_PERC : 0,
      MAX_PERC : 100,
      WIN_WIDTH : null, 
      WIN_HEIGHT : null,
      POS_ID_CSS : null,
      LEFT_POS_ID : null,
      TOP_POS_ID : null,
      SELECTED_EL_STYLE : {
                          'background':
                          'blue'},
      SELECTED_PREVEL_STYLE : {
                          'background':
                          'white'}
    });
    
})();