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

function Grid(settings){
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
    
   var $container = $('<div class="_this_"/>'),
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
    _this_.calculate = function calculate(cols, nb){
        //Computes the dimensions of the rendered _this_
        var rest = nb % cols,
        rows = Math.ceil(nb/cols);

        _this_.cols = cols;
        _this_.rows = rows;
        _this_.rest = rest;

        _this_.boxDim = _this_.width/cols - 2*_this_.border;
            
        if((_this_.boxDim+2*_this_.border)*_this_.rows > _this_.height){
            _this_.calculate(cols + 1, nb);
        }
    };
    
    _this_.construct = function construct(){
        //We construct the virtual array of items 
        //We also construct the dom before it is appended so that all dom related stuff is done at once, no reflow
        for(var j = 1; j <= _this_.rows; j++){
            //We populate rows
            var row = $row.clone(),
            //We treat the first row differently to fill it with the remaining boxes
            cols = _this_.rest && j==1 ? _this_.rest : _this_.cols;

            for(var k = 1; k <= cols; k++){
                //We populate columns
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

        //When the _this_ is finally pre-computed and ready we add it to the dom
        _this_.node.append($boxes);
    };
    
    _this_.style = function style(){
        _this_.node.width(_this_.width);
        _this_.node.height(_this_.height);
        //We set the height and width of the boxes with the computed dimensions
        $box.width(_this_.boxDim);
        $box.height(_this_.boxDim);
        $box.css('border-width', _this_.border);
    };
    
    function init(){
        //>>Start
        //We start by computing the rendered _this_ recursively, we want at minimum 2 columns, uh-ho it's a _this_ ! 
        _this_.calculate(2, _this_.nb_items);
        _this_.style();
        _this_.construct();
    }
    
    //Start
    init();
    
}