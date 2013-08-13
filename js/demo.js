var settings = {
    width : 200,
    height : 300,
    border : 1,
    nb_items : 92
};

for(var i in settings){
    $('input[name="'+i+'"]').val(settings[i]);
}

computeGrid(settings);

$('input').on('change', function(){

    var settings = {
        width : $('input[name="width"]').val(),
        height : $('input[name="height"]').val(),
        border : $('input[name="border"]').val(),
        nb_items : $('input[name="nb_items"]').val()
    };
    
    computeGrid(settings);
});

function computeGrid(settings){
  var grid = new Grid(settings);
  $('#grid_placeholder').empty().append(grid.node); 
}