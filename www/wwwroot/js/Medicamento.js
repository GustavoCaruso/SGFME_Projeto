const urlAPI = "https://localhost:44309/";

$(document).ready(function () {

    // Fun��o para limpar o formul�rio
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

    // Fun��o para salvar os dados do formul�rio
    $("#btnsalvar").click(function () {
        // Valida��o dos campos
        let isValid = true;
        let errorMessage = "";

        if ($("#txtnome").val().trim() === "") {
            isValid = false;
            errorMessage += "Nome � obrigat�rio.\n";
        }
        if ($("#txtprincipioAtivo").val().trim() === "") {
            isValid = false;
            errorMessage += "Princ�pio ativo � obrigat�rio.\n";
        }
        if ($("#txtlote").val().trim() === "") {
            isValid = false;
            errorMessage += "Lote � obrigat�rio.\n";
        }

        let dataValidade = $("#txtdataValidade").val().trim();
        if (dataValidade === "") {
            isValid = false;
            errorMessage += "Data de validade � obrigat�ria.\n";
        } else {
            let dataAtual = new Date();
            let dataValidadeDate = new Date(dataValidade);
            if (dataValidadeDate < dataAtual) {
                isValid = false;
                errorMessage += "Data de validade n�o pode ser no passado.\n";
            }
        }

        if ($("#txtfabricante").val().trim() === "") {
            isValid = false;
            errorMessage += "Fabricante � obrigat�rio.\n";
        }
        if ($("#txtformaFarmaceutica").val().trim() === "") {
            isValid = false;
            errorMessage += "Forma farmac�utica � obrigat�ria.\n";
        }
        if ($("#txtdosagemExistente").val().trim() === "") {
            isValid = false;
            errorMessage += "Dosagem existente � obrigat�ria.\n";
        }

        if (!isValid) {
            alert(errorMessage);
            return;
        }

        // Cria��o do objeto
        const obj = {
            id: $("#txtid").val() === "" ? 0 : parseInt($("#txtid").val(), 10),
            nome: $("#txtnome").val().trim(),
            principioAtivo: $("#txtprincipioAtivo").val().trim(),
            lote: $("#txtlote").val().trim(),
            dataValidade: dataValidade,
            fabricante: $("#txtfabricante").val().trim(),
            formaFarmaceutica: $("#txtformaFarmaceutica").val().trim(),
            dosagemExistente: $("#txtdosagemExistente").val().trim(),
        };

        console.log("Dados enviados:", JSON.stringify(obj));

        // Chamada AJAX
        $.ajax({
            type: obj.id === 0 ? "POST" : "PUT",
            url: urlAPI + "api/Medicamento",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json",
            success: function (jsonResult) {
                console.log("Resposta do servidor:", jsonResult);
                // Limpar o formul�rio ap�s salvar
                $("#btnlimpar").click();
                alert("Dados salvos com sucesso!");
            },
            error: function (jqXHR) {
                if (jqXHR.status === 400) {
                    var mensagem = "Erro de valida��o no servidor:\n";
                    if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                        $.each(jqXHR.responseJSON.errors, function (index, elemento) {
                            mensagem += elemento.errorMessage + "\n";
                        });
                    } else if (jqXHR.responseJSON) {
                        mensagem += jqXHR.responseJSON.message + "\n";
                    }
                    alert(mensagem);
                } else {
                    alert("Erro ao salvar os dados! C�digo: " + jqXHR.status);
                }
            }
        });
    });
});
