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

      var button = $(`<button class="btn btn-primary" type="button">`+options.search_btn+`</button>`);

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
        
        if(!options.one_field_search)
        {
          if(col.is_searchable == true)
          {
            search_form.append( $(`<div class="form-group">
                                    <label for="`+col.col_name+`">`+col.col_alias+`:</label>
                                    <input id="`+col.col_name+`" type="text" class="form-control" name="`+col.col_name+`">
                                  </div>`) );

            
          }
        }

        result_table.find('thead tr').append( $(`<th>`+col.col_alias+`</th>`) );
      });
      result_table.find('thead tr').append( $(`<th class="col-md-1">Select</th>`) );

      if(options.one_field_search)
      {
        
        search_form.append( $(`<div class="form-group">
                                <input type="text" class="form-control" placeholder="Search term..." name="term">
                              </div>`) );

        
      
      }      

      var search_btn = $(`<button type="submit" class="btn btn-primary">Search</button>`);

      search_form.append( search_btn );

      modal.find('.modal-body').append(search_form);
      modal.find('.modal-body').append(result_table);

      modal.find('.modal-body').append($('<div style="display:none;" class="please-wait text-center"><h4>Loading...</h4></div>'));      

      modal.find('.modal-body').append($(`<ul class="pager">
                                          <li><a class="previous" style="display:none;" href="#">Previous</a></li>
                                          <li><a class="next" style="display:none;" href="#">Next</a></li>
                                        </ul>`));

      var next_button = modal.find('.next');
      var previous_button = modal.find('.previous');


      button.click(function(){
        

        modal.modal('show');

      });

      search_form.submit(function(e){
        e.preventDefault();

        
        
        get_ajax_response(options.url);

      });

      result_table.on('click', '.btn-select', function(){
        //console.log($(this).data('obj')[options.display]);
        input.val($(this).data('obj')[options.display]);
        hidden_input.val($(this).data('obj')[options.id]);

        modal.modal('hide');

        if(options.on_select != null)
        {
          options.on_select( $(this).data('obj') );
        }
      })

      next_button.click(function(e){
        e.preventDefault();
        get_ajax_response( $(this).attr('href') );        
      });

      previous_button.click(function(e){
        e.preventDefault();
        get_ajax_response( $(this).attr('href') );
      });



      $t.append(input_group);

      
      function get_ajax_response(ajax_url)
      {
        modal.find('.please-wait').show();

        search_btn.attr('disabled', true);

        result_table.find('tbody').empty();

        var request = $.ajax({
          type: 'get',
          url: ajax_url,
          data: search_form.serialize(),
        });

        request.done(function(data){
          $.each(data.data, function(i, data){
              var row = '<tr>';

              $.each(options.columns, function(i, col){

                row += '<td>';


                if(col.modifier != null)
                {
                  row += col.modifier(data[col.col_name]);
                }
                else
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

          

          if(data.next_page_url != null)
          {
            next_button.show();
            next_button.attr('href', data.next_page_url);
          }else
            next_button.hide();

          if(data.prev_page_url != null)
          {

            previous_button.show();
            previous_button.attr('href', data.prev_page_url);
          }else
            previous_button.hide();

        });

        request.fail(function(jqXHR, exception){

              alert('Some error occurred');

        });

        request.always(function(){
          search_btn.attr('disabled', false);
          modal.find('.please-wait').fadeOut();
        });

        
      }





    });



    

    


    return this;
  };




})(jQuery);