$(document).ready(function() {
    $('.floating-notification').hide();
    $('#sel-mark, .sel-mark').hide();
    $('#show-buret').hide();
    $('#burt-read').val('00.00');

    //change the burtton id


    //show checkbox
    $('#show-check').click(function(){
        $('#show-buret').toggle();
});


    //Items suggestion
    $( function() {
        var name = $('#itm_labl').data('itmsug');    
        var availableTags = name;
        $( "#item-dtls" ).autocomplete({
          source: availableTags
        });
      });


    //Customer name suggestion script
    $( function() {
        var name = $('#cust-labl').data('name');    
        var availableTags = name;
        $( "#cust-name" ).autocomplete({
          source: availableTags
        });
      });

    //delivery button 
    $('#deliver').click(function(){
        $('#notDeliveredCheck').prop('checked', true);
        $('#deliveredCheck').prop('disabled', true);
    });

    // refresh the page
    $('#refresh').click(function(){
        location.reload();
    });
    
    // Token number when check box click function
    $('#duplicate').on('click', function() {
        var tok_input = $('#tokn-no');
        if ($(this).is(':checked')) {
          tok_input.prop('readonly', false);
        } else {
          tok_input.prop('readonly', true);
        }
      });

    $('#deliveredCheck').on('change', function() {
        if ($('#deliveredCheck').is(':checked')) {
            $('#notDeliveredCheck').prop('disabled', true);
        } else {
            $('#notDeliveredCheck').prop('disabled', false);
        }
    });

    $('#notDeliveredCheck').on('change', function() {
        if ($('#notDeliveredCheck').is(':checked')) {
            $('#deliveredCheck').prop('disabled', true);
        } else {
            $('#deliveredCheck').prop('disabled', false);
        }
    });


    var notification = $('.floating-notification');
    var notificationOffset = notification.offset();
    var notificationTop = notificationOffset.top;
    $(window).scroll(function(){
        if($(window).scrollTop() > notificationTop){
            notification.addClass('fixed');
        } else {
            notification.removeClass('fixed');
        }
    });

    $('#add').click(function(){
        if($('input[name="d-status"]:checked').val()){
            var sta = $('input[name="d-status"]:checked').val();
        }else{
            var sta = "ND";
        }

        var selectedType = $('#type-select').val();
        var markInput = $('#mark');
    
        if (selectedType === 'MELT' && markInput.val().trim() === '') {
          alert('Mark field is required.');
          return; 
        }

        $.ajax({
            type: 'POST',
            url: '/add',
            data: {
            'tokn_no': $('#tokn-no').val(),
            'cust_name': $('#cust-name').val(),
            'second_name': $('#second-name').val(),
            'item_dtls': $('#item-dtls').val(),
            'item_discript': $('#item_discript').val(),
            'date': $('#curnt-date').val(),
            'wight':$('#wight').val(),
            'mark': $('#mark').val(),
            'buretRead': $('#burt-read').val(),
            'sts': sta
        },
            success: function(response){
                if(response == 'insert-success'){
                    $('.floating-notification').html("Insert Successfully").show();

                setTimeout(function() {
                $('.floating-notification').hide()
                location.reload();    
            }, 2000); 
                    
                }
            },
            error: function(xhr, status, error) {
                console.log('Error: ' + error);
            }
        })
    });

    $('#empty-rec').click(function(){

        $.ajax({
            type: 'POST',
            url: '/add',
            data: {
            'tokn_no': $('#tokn-no').val(),
            'cust_name': '',
            'second_name': '',
            'item_dtls': '',
            'item_discript': '',
            'date': $('#curnt-date').val(),
            'wight':'',
            'mark': '',
            'sts': 'ND',
            'buretRead': '00.00',
        },
            success: function(response){
                if(response == 'insert-success'){
                    $('.floating-notification').html("Insert Successfully").show();

                setTimeout(function() {
                $('.floating-notification').hide();
                location.reload();
                }, 2000); 
                    
                }
            },
            error: function(xhr, status, error) {
                console.log('Error: ' + error);
            }
        })
    });

    var prev_def = "";
    $('#mytbl #td').click(function(){

        if(prev_def){
            $('#mytbl tbody tr.click-bg').addClass('bg-info text-white');
            prev_def = "";
        }
        if ($(this).closest('tr.bg-info').length > 0){
            $(this).closest('tr.bg-info').removeClass('bg-info text-white');
            prev_def = true;
          }
        $('#mytbl tbody tr.click-bg').removeClass('click-bg').css('background', '');
        $(this).parent('tr').addClass('click-bg').css('background', '#f5ed72');
        var data_str = $(this).attr("data-json");
        var data_con = JSON.parse(data_str);
        $('#tokn-no').val(data_con.token_no);
        $('#curnt-date').val(data_con.date);
        $('#cust-name').val(data_con.fst_name);
        $('#second-name').val(data_con.sec_name);
        $('#item-dtls').val(data_con.items);
        $('#wight').val(data_con.wight);
        $('#mark').val(data_con.mark);
        $('#burt-read').val(data_con.touch);
        $('#item_discript').val(data_con.item_disc);
        $('#show-buret').text(data_con.true_touch);
        if(data_con.sts == 'D'){
            $('#deliveredCheck').prop('checked', false);
            $('#notDeliveredCheck').prop('checked', true);
        }else{
            $('#notDeliveredCheck').prop('checked', false);
            $('#deliveredCheck').prop('checked', true);
        }
        
    });

    //Delete the table details
    var delet_arr = [];
    $('#delete').click(function(){
        delet_arr.push($('#tokn-no').val())
        if(confirm("Are you Sure to Delete This.")){     
        $.ajax({
            type:'POST',
            url:'/delete',
            data:{ del_id: JSON.stringify(delet_arr) },
            success: function(response){
                if(response == "deleted-successfully"){
                    $('.floating-notification').html("Deleted Successfully").show();
                    setTimeout(function() {
                        $('.floating-notification').hide();
                        location.reload();
                        }, 2000);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Error: " + textStatus + " - " + errorThrown);
            }
        }) 
    }
    });

    // Updateing the details
    $('#modify').click(function(){
        $.ajax({
            type: 'POST',
            url: '/modify',
            data: {
            'tokn_no': $('#tokn-no').val(),
            'cust_name': $('#cust-name').val(),
            'second_name': $('#second-name').val(),
            'item_dtls': $('#item-dtls').val(),
            'date': $('#curnt-date').val(),
            'wight':$('#wight').val(),
            'mark': $('#mark').val(),
            'buretRead': $('#burt-read').val(),
            'item_discript': $('#item_discript').val(),
            'sts': $('input[name="d-status"]:checked').val()
        },
            success: function(response){
                if(response == 'updated-successfully'){
                    $('.floating-notification').html("Modified Successfully").show();

                setTimeout(function() {
                $('.floating-notification').hide();
                location.reload();
                }, 2000); 
                }
            },
            error: function(xhr, status, error) {
                console.log('Error: ' + error);
            }
        })
    });

    $('#sel-print').click(function(){
        $("button[id='delete']").removeAttr('id');
        $('#sel-mark, .sel-mark').toggle();
    })

    var currentDate = new Date();
    var formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate();
    $("#curnt-date").datepicker({ dateFormat: 'yy-mm-dd' });
    $("#curnt-date").datepicker("setDate", formattedDate);

// Get the input elements of burette read and token no

    const buretteReadInput = document.getElementById('burette-tok');
    const toknNoInput = document.getElementById('tokn-no');

    buretteReadInput.addEventListener('input', function() {
    const buretteReadValue = buretteReadInput.value.trim();

    if (buretteReadValue.length === 4) {
    const toknNoValue = toknNoInput.value.trim();

    if (buretteReadValue !== toknNoValue) {
        alert("Mismatched");
        buretteReadInput.value = "";
    } 
  }
});

$('#burette-read-1, #burette-read-2, #burette-read-3').on('input', function () {
    var val1 = parseFloat($('#burette-read-1').val()) || 0;
    var val2 = parseFloat($('#burette-read-2').val()) || 0;
    var val3 = parseFloat($('#burette-read-3').val()) || 0;
    var val4 = val1 + val2 + val3;
    var val5 = val4 / 3 * 0.25;
    $("#burt-read").val(val5.toFixed(2));

});

// Filter the table based on the name
$('#check-fil').click(function(){
    if ($(this).is(':checked')){
    $('#mytbl tbody tr').filter(function(){
        var col_name = $(this).find('td:eq(2)');
        $(this).toggle(col_name.text().toLowerCase().indexOf($('#cust-name').val().toLowerCase()) > -1);
    });
}else{
    $('#mytbl tbody tr').show(); 
}
})

// filtering daily report
$('#daily-rep').click(function(){
    var rows = $('#mytbl tbody tr').hide();
    rows.filter(function() {
        var col_name = $(this).find('td:eq(5)');
        return col_name.text().indexOf(formattedDate) > -1;
    }).show().sort(function(a, b) {
        var a_val = $(a).find('td:eq(8)').text();
        var b_val = $(b).find('td:eq(8)').text();
        return (b_val < a_val) ? -1 : (b_val > a_val) ? 1 : 0;
    }).appendTo('#mytbl tbody');
    rows.not(':visible').remove();
});

// short the table
$('#sort').click(function(){
$('#mytbl tbody tr').sort(function(a, b) {
    var a_val = $(a).find('td:eq(8)').text();
    var b_val = $(b).find('td:eq(8)').text();
    return (b_val < a_val) ? -1 : (b_val > a_val) ? 1 : 0;
}).appendTo('#mytbl tbody');
});


// pdf datas
$('#print').click(function(){
    var tokn_no = $('#tokn-no').val();
    var cust_name = $('#cust-name').val();
    var item_dtls = $('#item-dtls').val();

    window.open('/pdf?name='+cust_name+'&tokno='+tokn_no+'&item='+item_dtls, 'printWindow', 'width=900,height=800').print();
});


$('#print-name').click(function(){
    var tokn_no = $('#tokn-no').val();
    var cust_name = $('#cust-name').val();
    var second_name = $('#second-name').val();
    var item_dtls = $('#item-dtls').val();
    var item_discript = $('#item_discript').val();
    var date = $('#curnt-date').val();
    var wight = $('#wight').val();
    var mark = $('#mark').val();
    var buretRead = $('#burt-read').val();
    var sts = 'D';

    var selectedType = $('#type-select').val();
        var markInput = $('#mark');
    
        if (selectedType === 'MELT' && markInput.val().trim() === '') {
          alert('Mark field is required.');
          return; 
        }
        
    window.open('/pdf?name='+cust_name+'&tok-no='+tokn_no+'&item='+item_dtls+'&secname='+second_name+'itmdes='+item_discript+'&date='+date+'&wight='+wight+'&mark='+mark+'&burt='+buretRead+'&sts='+sts, 'printWindow', 'width=900,height=800').print();
});

var empty_arr = [];
$('#mytbl td #mrk-opt').click(function() {
    var jsoto = $(this).attr('data-json');
    jsoto = JSON.parse(jsoto);
    var checkbox = $(this);
    if (checkbox.is(':checked')) {
        empty_arr.push(JSON.parse(JSON.stringify(jsoto)));
        delet_arr.push(jsoto.token_no);
    } else {
        var index = empty_arr.findIndex(function(item) {
            return item.token_no === jsoto.token_no;
        });
        if (index !== -1) {
            empty_arr.splice(index, 1);
        }
        index = delet_arr.indexOf(jsoto.token_no);
        if (index !== -1) {
            delet_arr.splice(index, 1);
        }
    }
});

$('#take-print').click(function(){
    window.open('/sel-pdf?arr='+JSON.stringify(empty_arr), 'printWindow', 'width=900,height=800').print();
}) 

// click to go design page
$('#design').click(function(){
    location.href = '/design';
})

// click to go customer page
$('#customer').click(function(){
    location.href = '/customer';
})

// burette read calculation
$('#burette-read-2').on('change', function(){
    var b_val = $('#burette-read-1').val();
    b_val = parseInt(b_val);
    if (b_val + 2 >= $('#burette-read-2').val() && b_val - 2 <= $('#burette-read-2').val()) {
} else {
    alert("Limit Crossed");
    $('#burette-read-2').val('');
}
})
$('#burette-read-3').on('change', function(){
    var b_val = $('#burette-read-1').val();
    b_val = parseInt(b_val);
    if (b_val + 2 >= $('#burette-read-3').val() && b_val - 2 <= $('#burette-read-3').val()){
    
    }else{
        alert("Limit Crossed");
        $('#burette-read-3').val('');
    }
    });

// logout script
$('#logout').click(function(){
    location.replace('/');
})
});