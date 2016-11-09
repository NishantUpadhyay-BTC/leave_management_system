LeaveManagementSystem = {};
LeaveManagementSystem.Common = {
  bindSelect: function (){
    $('select').material_select();
  },
  bindDatePicker: function(){
    $('.datepicker').pickadate();
  },
  autoCompleteUserList: function(selector, admin_list){
    var users = [];
    var multiple = $(selector).materialize_autocomplete({
      multiple: {
        enable: true,
        onAppend: function(item){
         users.push(item.id);
        }
      },
      appender: {
        el: '.ac-users'
      },
      dropdown: {
        el: '#multipleDropdown'
      }
    });
    var resultCache = admin_list;
    multiple.resultCache = resultCache;
    $('.btn').on('click', function(e){
     $('#user_id').val(users);
    });
  },
  editAutoCompleted: function(selector, req_users)
  {
    $(selector).val('');
    $.each(req_users, function(index, user){
      $('.ac-appender').append("<div class='chip' data-id="+user.id+" data-text="+user.name+">"+user.name+"<i class='fa fa-times close'></i></div>");
    });
  }
};