const urlAPI = "https://localhost:44309/";

$(document).ready(function () {

    // Função para limpar o formulário
    $("#btnlimpar").click(function () {
        $("#txtid").val('0');
        $("#txtnome").val('');
        $("#txtprincipioAtivo").val('');
        $("#txtlote").val('');
        $("#txtdataValidade").val('');
        $("#txtfabricante").val('');
        $("#txtformaFarmaceutica").val('');
        $("#txtdosagemExistente").val('');
    });

    // Função para salvar os dados do formulário
    $("#btnsalvar").click(function () {
        // Validação dos campos e criação do objeto
        const obj = {
            id: $("#txtid").val(),
            nome: $("#txtnome").val(),
            principioAtivo: $("#txtprincipioAtivo").val(),
            lote: $("#txtlote").val(),
            dataValidade: $("#txtdataValidade").val(),
            fabricante: $("#txtfabricante").val(),
            formaFarmaceutica: $("#txtformaFarmaceutica").val(),
            dosagemExistente: $("#txtdosagemExistente").val(),
        };

        console.log(JSON.stringify(obj));

        // Chamada AJAX
        $.ajax({
            type: obj.id === "0" ? "POST" : "PUT",
            url: urlAPI + "api/Medicamento",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json",
            success: function (jsonResult) {
                console.log(jsonResult);
                // Limpar o formulário após salvar
                $("#btnlimpar").click();
                alert("Dados salvos com sucesso!");
            },
            error: function (jqXHR) {
                if (jqXHR.status === 400) {
                    var mensagem = "";
                    $(jqXHR.responseJSON.errors).each(function (index, elemento) {
                        mensagem = mensagem + elemento.errorMessage + "\n";
                    });
                    alert(mensagem);
                } else {
                    alert("Erro ao salvar os dados!");
                }
            }
        });
    });
});
