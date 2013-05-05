(function(window, $){

function Debug(){
    var _this_ = this,
        env = 'dev';
    
    if(!console){
        return;
    }

    for(var prop in console){
        var method = console[prop];

        _this_[prop] = (function(m){
            return function(args){
                var args = [].slice.call(arguments);
                args.splice(0,0, '[debug in '+_this_.name+']');
                m.apply(console, args);
            }
        })(method);
    }
    
    _this_.printSignature = function printSignature(){
        _this_.log('Function '+_this_.name +' signature is :');
        _this_.log(_this_.signature);
    }
    
    for(var method in _this_){
        if(_this_.hasOwnProperty(method)){
            if(env == 'prod' || env == 'preprod'){
                _this_[method]  = function(){
                    return;
                }
            }
        }
    }
    
    return _this_;
}

window.Grid = function Grid(settings){
    var _this_ = this;
    
    _this_.signature = {
        width : '(int) in px',
        height : '(int) in px',
        border : '(int) in px',
        nb_items : '(int)'
    };
    
    _this_.name = arguments.callee.name;
    
    var debug = Debug.call(_this_);

    if(!settings){
        debug.error('Missing settings argument');
        debug.printSignature();
        return;
    }
    
    for(var i in _this_.signature){
        if(isNaN(settings[i])){
                debug.error('Property '+i+' is not a number.');
                debug.printSignature();              
            return;
        }
    }
   
   //>>Settings
   
   var $container = $('<div class="grid"/>'),
    $box = $('<li class="box"/>'),
    $row = $('<ul class="row"/>'),
    $boxes = $([]);
    
    _this_.width = settings.width;
    _this_.height = settings.height;
    _this_.nb_items = settings.nb_items;
    _this_.border = settings.border;

    _this_.node = $container;
    _this_.items = [];
    _this_.boxDim = null;
    _this_.cols = null;
    _this_.rows = null;
    _this_.rest = null;

    //>>Functions
    
    //Computes the dimensions of the rendered grid
    function calculate(cols, nb){
        
        _this_.cols = cols;
        _this_.rows = Math.ceil(nb/cols);
        _this_.rest = nb % cols;

        _this_.boxDim = _this_.width/cols - 2*_this_.border;
        
        //Recurses if the height of the resulting grid is greater than the settings height
        if((_this_.boxDim+2*_this_.border)*_this_.rows > _this_.height){
            calculate(cols + 1, nb);
        }
    }
    
    //Constructs the virtual array of items 
    //Constructs the dom before it is appended so that all dom operations are done at once, no reflow
    function construct(){
        for(var j = 1; j <= _this_.rows; j++){
            //Populates rows
            var row = $row.clone(),
            //Treats the first row differently to fill it with the remaining boxes
            cols = _this_.rest && j==1 ? _this_.rest : _this_.cols;

            for(var k = 1; k <= cols; k++){
                //Populates columns
                var clone = $box.clone(),
                index = _this_.items.length,
                item = {
                    node : clone,
                    index : index
                };

                _this_.items.push(item);
                //Dom
                row = row.append(item.node);

            }
            //Dom
            $boxes = $boxes.add(row);
        }

        //Adds the grid dom elements to the grid container when the grid is finally pre-computed and ready 
        _this_.node.append($boxes);
    }
    
    //Sets the grid dimensions on the dom elements
    function style(){
        _this_.node.width(_this_.width);
        _this_.node.height(_this_.height);
        $box.width(_this_.boxDim);
        $box.height(_this_.boxDim);
        $box.css('border-width', _this_.border);
    }
    
    //>>Start
    
    function init(){
        //We start by computing the rendered grid recursively, we want at minimum 2 columns, since it's a grid
        calculate(2, _this_.nb_items);
        //Then we style the html elements forming the grid by setting the grid dimensions
        style();
        //Finally we construct the html 
        construct();
    }
    
    //Start
    init();
    
}
}(this, this.jQuery));