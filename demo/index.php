<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>jGridder Demo</title>
        <link href='http://fonts.googleapis.com/css?family=Overlock' rel='stylesheet' type='text/css'>
        <link href="../css/demo.css" rel="stylesheet"></link>
        <link href="../css/grid.css" rel="stylesheet"></link>
    </head>
    <body>
        <?php $root = $_SERVER['DOCUMENT_ROOT']; include_once("$root/_files/ga_analytics.php") ?>
        <form method="post">
            <label>width in px : </label>
            <input placeholder="width in px" name="width" type="number"></input>
            <label>height in px : </label>
            <input placeholder="height" name="height" type="number"></input>
            <label>border in px :</label>
            <input placeholder="border" name="border" type="number"></input>
            <label>number of items :</label>
            <input placeholder="number of items" name="nb_items" type="number"></input>
        </form>
        <div class="placeholder" id="grid_placeholder"></div>
        <div class="footer">
            jGridder Demo
            <a href="https://github.com/eloone/jgridder/" class="github_link">https://github.com/eloone/jgridder/</a>
        </div>
        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="http://eloone.github.io/jgridder/jgridder.js"></script>
        <script src="../js/demo.js"></script>
    </body>
</html>
