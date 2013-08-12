#JGRIDDER

## Pitch

jgridder is a UI javascript component that fits a number of elements in a sized html grid. It uses jQuery. 

## Demo
<http://eloone.net/jgridder/demo/>

## Requirements
To get this script working include the following in your webpage :

The javascript files :

 `<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>`
 `<script src="http://eloone.github.io/jgridder/jgridder.js"></script>`
 
The css :

`<link href="https://raw.github.com/eloone/jgridder/master/css/grid.css" rel="stylesheet"></link>`

Take example on the 'test' folder of this repository. 
Or directly view source on <http://eloone.net/jgridder/test> for a straightforward implementation.

## Usage
Once you have followed the <a href="#requirements">requirements</a>, 
you can put this in your javascript file to implement the UI component :

Simple implementation :

```js
//This will just draw the grid
    var grid = new Grid({
          width : 85,
          height : 200,
          border : 1,
          nb_items : 47
      });

      //When the grid is finally pre-computed and ready we add it to the dom
      $('body').append(grid.node);
```             

## Example

Example with a click event on each box :

```js
      var totalItems = 47,
      grid = new Grid({
           width : 85,
          height : 200,
          border : 1,
          nb_items : totalItems
      });
     
      //Click handler when a box is clicked
      function onClick(){    
          alert('click on a box');
      }
      
      //Adding a click event on each box
      for(var j = 0; j < grid.items.length; j++){
          grid.items[j].node.on('click', $.proxy(onClick, grid.items[j]));
      }

      //When the grid is finally pre-computed and ready we add it to the dom
      $('body').append(grid.node);
```
## Structure

This script only takes care of generating the grid. 

If you need to interact with the elements in the grid use the object that it returns :

```js
var grid = new Grid({
          width : 85,
          height : 200,
          border : 1,
          nb_items : 47
      });
```
will return an object of this structure :

```js
{
  node : '[object]', //the jquery node for the grid container => $('.grid')
  items : [ //array of all the boxes in the grid
   ...
    {
      node : '[object]', //jquery node for a box in the grid, => $('.box')
      index : '[int]' //index of the box in the grid
    },
    {
      node : '[object]', //jquery node for a box in the grid,
      index : '[int]' //index of the box in the grid
    }
    ...
  ]
}
```

and an html of this structure :

```html
<div class="grid">
  ...
  <ul class="row">
    <li class="box"></li>
    <li class="box"></li>
    <li class="box"></li>
  </ul>
  <ul class="row">
    <li class="box"></li>
    <li class="box"></li>
    <li class="box"></li>
  </ul>
  ...
</div>

```
## Beyond the code
http://machinesaredigging.com/2013/05/21/jgridder-how-to-fit-elements-in-a-sized-grid/

## License

BSD-style. See the LICENSE file.
