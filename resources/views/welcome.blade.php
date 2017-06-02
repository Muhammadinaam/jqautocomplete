<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="{{asset('css/font-awesome.min.css')}}">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>

<div class="jumbotron text-center">
  <h1>My First Bootstrap Page</h1>
  <p>Resize this responsive page to see the effect!</p> 
</div>
  
<div class="container">
  <div class="row">

    <div class="col-md-6">
        <div class="lookup" data-id="1" data-display="Red Shirt">
        </div>
    </div>

    <div class="col-md-6">
        <div class="lookup"  data-id="" data-display="">
        </div>
    </div>

  </div>
</div>

<script type="text/javascript" src="{{asset('js/ilookup.js')}}"></script>

<script type="text/javascript">
    $(document).ready(function(){
        $('.lookup').iLookup({
            input_name: 'products[]',
            url: "{{url('product_search')}}",
            id: 'id',
            display: 'name',
            search_btn: '<span class="glyphicon glyphicon-search" aria-hidden="true"></span>',
            one_field_search: false,
            columns: [
              {col_name: 'id', col_alias: 'ID', is_searchable: true, modifier: null},
              {col_name: 'name', col_alias: 'Name', is_searchable: true, modifier: null},
              {col_name: 'image', col_alias: 'Image', is_searchable: false, modifier: function(item){
                item = '<img src="'+item+'">';
                return item;
              }},
              {col_name: 'price', col_alias: 'Price', is_searchable: true, modifier: null},
            ],
            on_select: function(obj){
                console.log(obj);
            },
        });
    });
</script>

</body>
</html>
