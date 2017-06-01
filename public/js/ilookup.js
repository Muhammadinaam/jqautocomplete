(function ($) {
  $.fn.iLookup = function(options) {

    // Options + Defaults
    var settings = $.extend({
      // Some options in here
    }, options);

    this.each(function(){
      var $t = $(this);


      var input_group = $(`<div class="input-group">
                          </div>`);

      var hidden_input = $(`<input type="hidden" name="`+options.input_name+`" value="`+$t.data('id')+`">`);

      var input = $(`<input type="text" class="form-control" readonly value="`+$t.data('display')+`">`);

      var span = $(`<span class="input-group-btn">
                  </span>`);

      var button = $(`<button class="btn btn-primary" type="button">Search</button>`);

      var modal = $(`<div class="modal fade" role="dialog">
                      <div class="modal-dialog modal-lg">

                        <!-- Modal content-->
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Search</h4>
                          </div>
                          <div class="modal-body modal-lg">
                            
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                          </div>
                        </div>

                      </div>
                    </div>`);
      
      input_group.append(hidden_input);
      input_group.append(input);
      input_group.append(span);
      span.append(button);

      

      var search_form = $(`<form class="form-inline">
                            
                          </form>`);

      var result_table = $(`<table class="table table-bordered" style="margin-top: 40px;">
                              <thead>
                                <tr>
                                </tr>
                              </thead>
                              <tbody>
                              </tbody>
                           </table>`);

      $.each(options.columns, function(i, col){
        if(col.is_searchable == true)
        {
          search_form.append( $(`<div class="form-group">
                                  <label for="`+col.col_name+`">`+col.col_alias+`:</label>
                                  <input id="`+col.col_name+`" type="text" class="form-control" name="`+col.col_name+`">
                                </div>`) );

          
        }
        result_table.find('thead tr').append( $(`<th>`+col.col_alias+`</th>`) );
      });
      result_table.find('thead tr').append( $(`<th class="col-md-1">Select</th>`) );

      var search_btn = $(`<button type="submit" class="btn btn-primary">Search</button>`);

      search_form.append( search_btn );

      modal.find('.modal-body').append(search_form);
      modal.find('.modal-body').append(result_table);


      button.click(function(){
        

        modal.modal('show');

      });

      search_form.submit(function(e){
        e.preventDefault();

        result_table.find('tbody').empty();
        
        var request = $.ajax({
          type: 'get',
          url: options.url,
          data: search_form.serialize(),
        });

        request.done(function(data){
          $.each(data.data, function(i, data){
              var row = '<tr>';

              $.each(options.columns, function(i, col){

                row += '<td>';

                row += data[col.col_name];                

                row += '</td>';                

              });

              row += '</tr>';

              row = $(row);

              //select button
              var select_button = $('<td><button class="btn btn-primary btn-select">Select</button></td>');
              select_button.find('.btn-select').data('obj', data);
              row.append(select_button);
              
              result_table.find('tbody').append(row);

          });
        });

        request.fail(function(jqXHR, exception){

              alert('Some error occurred');

        });

      });

      result_table.on('click', '.btn-select', function(){
        //console.log($(this).data('obj')[options.display]);
        input.val($(this).data('obj')[options.display]);
        hidden_input.val($(this).data('obj')[options.id]);

        modal.modal('hide');
      })



      $t.append(input_group);


    });



    

    


    return this;
  };
})(jQuery);