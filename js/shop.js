// function for adding shopping cart
function add_to_cart(obj){
    $(obj).attr("disabled","disabled");
    var package_id = $(obj).data("cartid");
    var url = $(obj).data("url");
    var csrftoken = $(obj).data("csrftoken");
    var title = $(obj).data("title");
  
    $.post(url,{package_id:package_id,csrfmiddlewaretoken:csrftoken},function(data){
        if(data['msg'] == "success"){
            swal({
                title: "Success",
                text: title +" Added To Cart",
                icon: "success",
                timer:1000,
            });
            $('#cart-item').html(data['item_counts']);
           
            $(obj).html("Added To Cart")
             
        }else if(data['msg'] == "error"){
            swal({
                title: title,
                text: " Already Added To Cart",
                timer:2000,
            });
            $(obj).removeAttr("disabled");
        }
    }); 
   
 }

 // booking amount

function booking_amount(obj){
    $(obj).attr("disabled","disabled");
    var package_id = $(obj).data("cartid");
    var url = $(obj).data("url");
    var csrftoken = $(obj).data("csrftoken");
    var title = $(obj).data("title");
  
    $.post(url,{package_id:package_id,csrfmiddlewaretoken:csrftoken},function(data){
        if(data['msg'] == "success"){
            swal({
                title: "Success",
                text: title +" Added To Cart",
                icon: "success",
                timer:1000,
            });
            $('#cart-item').html(data['item_counts']);
           
           window.location = '/cart/';

             
        }else if(data['msg'] == "error"){
            swal({
                title: title,
                text: " Already Added To Cart",
                timer:2000,
            });
            $(obj).removeAttr("disabled");
        }
    }); 
   
 }

 // remove item from shopping cart
 function remove_item(obj){
    var csrftoken = $(obj).data("csrftoken");
   $.post($(obj).data("url"),{package_id:$(obj).data("cartid"),csrfmiddlewaretoken:csrftoken},function(data){
        if(data['msg'] == "success"){
            swal({
                title: "Success",
                text: "Item Remove From Cart",
                icon: "success",
                timer:1000,
              }).then((value) => {
                window.location.reload(true);
              });
             
        }
    }); 
   
 } 
//payment details
 function payment_detail(obj){
    $('#payment_details_model').modal('show');
    $.ajax({
        url:$(obj).data("url"),data:{'package_id':$(obj).data("package_id")},beforeSend:function(){$('#payment_detail').html('<div class="text-danger"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> loading..</div>');},success:function(data){
           
            $('#payment_detail').html(data);
        }
    });
}