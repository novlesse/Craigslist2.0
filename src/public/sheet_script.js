const newForm = (data, id) => {
    console.log(data);
    return `
    <form id=${id+1}>
        <label for="LastName"></label>
        <input class="update" type="text" name="LastName" value=${data.LastName}>
        <label for="FirstName"></label>
        <input class="update" type="text" name="FirstName" value=${data.FirstName}>
        <label for="Email"></label>
        <input class="update" type="text" name="Email" value=${data.Email}>
        <label for="Address"></label>
        <input class="update" type="text" name="Address" value=${data.Address}>
        <label for="City"></label>
        <input class="update" type="text" name="City" value=${data.City}>
    </form>`
};

$(document).ready(() => {
    $("#form_btn").click(e => {
        e.preventDefault();
        const formData = $('#insert').serialize();
        $.ajax({
            url: `https://sheet.best/api/sheets/bf74a7d5-8229-46a0-8cc0-ff36e26822f9`,
            type: 'POST',
            // mode: 'cors',
            dataType: 'json',
            data: formData,
            success: (response) => {
                const id = $("#sheet:last-child").attr("id");
                $("#sheet").append(newForm(response[0], id));
            },
            error: (err) => {
                console.log(err.message);
            }
        });
    });

    $(".update").change(e=>{
        const id = $(e.target).parent().attr("id");
        const name = $(e.target).attr("name");
        const value = $(e.target).val();
        let obj = {};
        obj[name] = value
        console.log(obj);
    
        fetch(`https://sheet.best/api/sheets/bf74a7d5-8229-46a0-8cc0-ff36e26822f9/`+ id, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        })
        .then(data => {
            // The response comes here
            console.log(data);
        })
        .catch(error => {
            // Errors are reported there
            console.log(error);
        });
    });   

});
