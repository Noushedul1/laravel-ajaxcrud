$(document).ready(function(){
    $('.save').click(function(){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        var name = $('.name').val();
        var description = $('.description').val();
        var status = $('.status').val();

        $.ajax({
            type: "POST",
            url: "/store",
            data: {
                'name' : name,
                'description' : description,
                'status' : status
            },
            success:function(response) {
                showCategory();
                alert(response.status);
            }
        });
    });
    function showCategory(){
        $.ajax({
            type: "GET",
            url: "/showCategory",
            success:function(response){
                var sl =1;
                var tdata = '';
                $.each(response.categories, function(kwy,value){
                    if(value.status == 1) {
                        var status = '<button class="active btn btn-primary btn-sm" value="'+value.id+'">Active</button>';
                    }else{
                        var status = '<button class="inactive btn btn-danger btn-sm" value="'+value.id+'">Deactive</button>';
                    }
                    // console.log(value.name);
                    tdata += "<tr>";
                    tdata += "<td>"+sl+"</td>";
                    tdata += "<td>"+value.name+"</td>";
                    tdata += "<td>"+value.description+"</td>";
                    tdata += "<td>"+status+"</td>";
                    tdata += "<td><button class='btn btn-sm btn-danger delete' value='"+value.id+"'>Delete</button><button class='btn btn-sm btn-primary edit' value='"+value.id+"'>Edit</button></td>";
                    tdata += "</tr>";
                    sl++;
                });
                $('.tdata').html(tdata);
            }
        });
    }
    showCategory();
    $(document).on('click','.delete',function(){
        var id = $(this).val();
        $('#delete').modal('show');
        $('.mdelete').val(id);
        // alert(id);
    });
    $(document).on('click','.mdelete',function(){
        var id = $(this).val();
        // alert(id);
         $.ajax({
            type: 'GET',
            url: "/deleteCategory/"+id,
            success:function(response){
                if(response.status == "404") {
                    alert('Data not found');
                }else if(response.status == "200"){
                    showCategory();
                    $('#delete').modal('hide');
                    alert('Data deleted');
                }
            }
        });
    });
    $(document).on('click','.edit',function(){
        var id = $(this).val();
        $.ajax({
            type: "GET",
            url: '/edit/'+id,
            success:function(response){
                // console.log(response.category);
                $('.save').hide();
                $('.update').show();
                $('.name').val(response.category.name);
                $('.description').val(response.category.description);
                $('.status').val(response.category.status);

                $('.update').val(response.category.id);
            }
        });
    });
    $(document).on('click','.update',function(){
        var id = $(this).val();
        var name = $('.name').val();
        var description = $('.description').val();
        var status = $('.status').val();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type: "POST",
            url: '/update/'+id,
            data: {
                'name': name,
                'description': description,
                'status': status
            },
            success:function(response){
                if(response.status == '200'){
                    showCategory();
                    alert('Data updated');
                }else if(response.status == '404'){
                    alert('Data not updated');
                }
            }
        });
    });
    $(document).on('click','.active',function(){
        var id = $(this).val();
        $.ajax({
            type: 'GET',
            url: '/active/'+id,
            success:function(response){
                if(response.status == '200'){
                    alert('Inactive');
                    showCategory();
                }
            }
        });
    });
    $(document).on('click','.inactive',function(){
        var id = $(this).val();
        $.ajax({
            type: 'GET',
            url: '/inactive/'+id,
            success:function(response){
                if(response.status == '200'){
                    alert('Active');
                    showCategory();
                }
            }
        });
    });
});
