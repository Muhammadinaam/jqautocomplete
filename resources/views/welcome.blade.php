<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
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
        <div class="lookup">
        </div>
    </div>

    <div class="col-md-6">
        <div class="lookup">
        </div>
    </div>

  </div>
</div>

<script type="text/javascript" src="{{asset('js/iautocomplete.js')}}"></script>

<script type="text/javascript">
    $(document).ready(function(){
        $('.lookup').iLookup({
            url: "{{url('product_search')}}",
            id: 'id',
            display: 'name',
            columns: [
                ['id', 'ID', true],
                ['name', 'Name', true],
                ['image', 'Image', false],
                ['price', 'Price', true],
            ],
        });
    });
</script>

</body>
</html>
