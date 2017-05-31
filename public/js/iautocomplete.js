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

      var input = $(`<input type="text" class="form-control" readonly>`);

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
      
      input_group.append(input);
      input_group.append(span);
      span.append(button);

      

      var search_form = $(`<form class="form-inline">
                            
                          </form>`);

      var result_table = $(`<table class="table table-bordered">
                              <thead>
                                <tr>
                                </tr>
                              </thead>
                           </table>`);

      $.each(options.columns, function(i, col){
        if(col[2] == true)
        {
          search_form.append( $(`<div class="form-group">
                                  <label for="`+col[0]+`">`+col[1]+`:</label>
                                  <input id="`+col[0]+`" type="text" class="form-control" name="`+col[0]+`">
                                </div>`) );

          
        }
        result_table.find('thead tr').append( $(`<th>`+col[1]+`</th>`) );
      });

      var search_btn = $(`<button type="submit" class="btn btn-primary">Search</button>`);

      search_form.append( search_btn );

      modal.find('.modal-body').append(search_form);
      modal.find('.modal_body').append( $(`<br><br>`) );
      modal.find('.modal-body').append(result_table);


      button.click(function(){
        

        modal.modal('show');

      });

      search_form.submit(function(e){
        e.preventDefault();
        alert('ajax here');
      });



      $t.append(input_group);


    });



    

    


    return this;
  };
})(jQuery);