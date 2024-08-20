﻿const urlAPI = "https://localhost:7034/";

let statusOptions = '';
let sexoOptions = '';
let corRacaOptions = '';
let estadoCivilOptions = '';
let ufOptions = '';
let tipoContatoOptions = '';
let tipoEnderecoOptions = '';
let contatos = [];
let enderecos = [];
let houveAlteracao = false;

<<<<<<< HEAD
    // Limitar os campos de texto
    $("#txtnomeCompleto, #txtnomeMae").attr('maxlength', 100);
    $("#txtrgNumero").attr('maxlength', 9);
    $("#txtcnsNumero").attr('maxlength', 15);
    $("#txtcpfNumero").attr('maxlength', 11);

    // Validar o campo Órgão Expedidor para aceitar até 10 caracteres alfanuméricos
    $("#txtrgOrgaoExpedidor").on("input", function () {
        this.value = this.value.replace(/[^a-zA-Z0-9]/g, ''); // Remove caracteres não alfanuméricos
        if (this.value.length > 10) {
            this.value = this.value.substring(0, 10); // Limita a 10 caracteres
        }
    });

    // Limitar o campo "Valor do Contato" a 100 caracteres alfanuméricos e formatar telefone
    $("#txtValorContato").on("input", function () {
        // Remove qualquer caractere que não seja alfanumérico
        let valor = this.value.replace(/[^a-zA-Z0-9]/g, '');

        // Limita o campo a 100 caracteres
        if (valor.length > 100) {
            valor = valor.substring(0, 100);
        }

        // Verifica se é um número de telefone
        if (/^\d+$/.test(valor)) {
            // Remove qualquer caractere que não seja número
            let telefone = valor.replace(/\D/g, '');

            // Aplica a máscara de telefone (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
            if (telefone.length <= 10) {
                telefone = telefone.replace(/^(\d{2})(\d{4})(\d)/, "($1) $2-$3");
            } else if (telefone.length <= 11) {
                telefone = telefone.replace(/^(\d{2})(\d{5})(\d)/, "($1) $2-$3");
            }

            this.value = telefone;
        } else {
            this.value = valor;
        }
    });

    let contatos = [];
    let enderecos = [];
    let medicoDados;
=======
let contatoEmEdicao = null;
let enderecoEmEdicao = null;

$(document).ready(async function () {
    await carregarDadosSelecoes();
>>>>>>> 2gustavo

    if ($("#tabela").length > 0) {
        carregarMedicos();
    } else if ($("#txtid").length > 0) {
        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        if (id) {
            visualizar(id);
        } else {
            let dataAtual = new Date().toISOString().split('T')[0];
            $("#txtdataCadastro").val(dataAtual);
        }
    }

    $(".form-control").on("input change", function () {
        if ($(this).hasClass('is-invalid')) {
            $(this).removeClass('is-invalid');
        }
    });

    $(".numeric-only").on("input", function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    $("#btnlimpar").click(function () {
        limparFormulario();
    });

    $(document).on("click", ".alterar", function (elemento) {
        let codigo = $(elemento.target).closest("tr").find(".codigo").text();
        console.log("Clique no botão alterar. Código:", codigo);
        window.location.href = "/MedicoCadastro?id=" + codigo;
    });

    $(document).on("change", ".alterar-status", function (elemento) {
        let codigo = $(elemento.target).closest("tr").find(".codigo").text();
        let novoStatus = $(elemento.target).val();

        if (novoStatus === "0") {
            alert("Seleção inválida! Por favor, escolha um status válido.");
            $(elemento.target).val($(elemento.target).data('original-value'));
        } else {
            console.log("Mudança de status. Código:", codigo, "Novo Status:", novoStatus);
            mudarStatus(codigo, novoStatus);
        }
    });

<<<<<<< HEAD
    function validarCampos() {
        let isValid = true;
        $(".form-control").removeClass('is-invalid');

        if (!$("#txtnomeCompleto").val().trim() || $("#txtnomeCompleto").val().length > 100) {
            $("#txtnomeCompleto").addClass('is-invalid');
            isValid = false;
        }
        if (!$("#txtdataNascimento").val().trim()) {
            $("#txtdataNascimento").addClass('is-invalid');
            isValid = false;
        }
        if (!$("#txtcrm").val().trim()) {
            $("#txtcrm").addClass('is-invalid');
            isValid = false;
        }
        if (!$("#txtnomeMae").val().trim() || $("#txtnomeMae").val().length > 100) {
            $("#txtnomeMae").addClass('is-invalid');
            isValid = false;
        }
        if (!$("#txtrgNumero").val().trim() || $("#txtrgNumero").val().length !== 9) {
            $("#txtrgNumero").addClass('is-invalid');
            isValid = false;
        }
        if (!$("#txtrgDataEmissao").val().trim()) {
            $("#txtrgDataEmissao").addClass('is-invalid');
            isValid = false;
        }
        if (!$("#txtrgOrgaoExpedidor").val().trim() || $("#txtrgOrgaoExpedidor").val().length !== 10) {
            $("#txtrgOrgaoExpedidor").addClass('is-invalid');
            isValid = false;
        }
        if (!$("#selectRgUfEmissao").val().trim() || $("#selectRgUfEmissao").val() === "0") {
            $("#selectRgUfEmissao").addClass('is-invalid');
            isValid = false;
        }
        if (!$("#txtcnsNumero").val().trim() || $("#txtcnsNumero").val().length !== 15) {
            $("#txtcnsNumero").addClass('is-invalid');
            isValid = false;
        }
        if (!$("#txtcpfNumero").val().trim() || $("#txtcpfNumero").val().length !== 11) {
            $("#txtcpfNumero").addClass('is-invalid');
            isValid = false;
        }
        if (!$("#selectStatus").val().trim() || $("#selectStatus").val() === "0") {
            $("#selectStatus").addClass('is-invalid');
            isValid = false;
        }
        if (!$("#selectSexo").val().trim() || $("#selectSexo").val() === "0") {
            $("#selectSexo").addClass('is-invalid');
            isValid = false;
        }
        if (!$("#selectCorRaca").val().trim() || $("#selectCorRaca").val() === "0") {
            $("#selectCorRaca").addClass('is-invalid');
            isValid = false;
        }
        if (!$("#selectEstadoCivil").val().trim() || $("#selectEstadoCivil").val() === "0") {
            $("#selectEstadoCivil").addClass('is-invalid');
            isValid = false;
        }
        if (!$("#selectNaturalidadeUf").val().trim() || $("#selectNaturalidadeUf").val() === "0") {
            $("#selectNaturalidadeUf").addClass('is-invalid');
            isValid = false;
        }
        if (!$("#selectNaturalidadeCidade").val().trim() || $("#selectNaturalidadeCidade").val() === "0") {
            $("#selectNaturalidadeCidade").addClass('is-invalid');
            isValid = false;
        }

        if (contatos.length === 0) {
            $("#mensagemValidacao").text("Por favor, adicione pelo menos um contato.");
            isValid = false;
        } else {
            $("#mensagemValidacao").text("");
        }

        if (enderecos.length === 0) {
            $("#mensagemValidacaoEndereco").text("Por favor, adicione pelo menos um endereço.");
            isValid = false;
        } else {
            $("#mensagemValidacaoEndereco").text("");
        }

        return isValid;
    }

    $(".form-control").on("input", function () {
        $(this).removeClass('is-invalid');
=======
    $(document).on("focus", ".alterar-status", function () {
        $(this).data('original-value', $(this).val());
>>>>>>> 2gustavo
    });

    $("#selectNaturalidadeUf").change(function () {
        const ufSelecionada = $(this).val();
        console.log("UF Naturalidade selecionada:", ufSelecionada);
        if (ufSelecionada !== "0") {
            carregarMunicipios(ufSelecionada, $("#selectNaturalidadeCidade"));
        } else {
            $("#selectNaturalidadeCidade").empty().append('<option value="0">Selecione uma cidade</option>');
        }
    });

    $("#selectEstado").change(function () {
        const ufSelecionada = $(this).val();
        console.log("UF selecionada para endereço:", ufSelecionada);
        if (ufSelecionada !== "0") {
            carregarMunicipios(ufSelecionada, $("#selectMunicipio"));
        } else {
            $("#selectMunicipio").empty().append('<option value="0">Selecione uma cidade</option>');
        }
    });

    $("#txtdataNascimento").on("input", function () {
        const dataNascimento = new Date($(this).val());
        if (!isNaN(dataNascimento)) {
            const idade = calcularIdade(dataNascimento);
            console.log("Data de nascimento inserida:", dataNascimento, "Idade calculada:", idade);
            $("#txtidade").val(idade);
        } else {
            $("#txtidade").val('');
        }
    });

    $(document).off("click", ".btn-danger[data-type='contato']").on("click", ".btn-danger[data-type='contato']", function () {
        const index = $(this).data("index");
        console.log("Clique para excluir contato. Índice:", index);
        const confirmDelete = confirm("Você tem certeza que deseja excluir este contato?");
        if (confirmDelete) {
            console.log("Confirmação de exclusão de contato. Índice:", index);
            contatos.splice(index, 1);
            atualizarTabelaContatos();
        }
    });

    $(document).off("click", ".btn-danger[data-type='endereco']").on("click", ".btn-danger[data-type='endereco']", function () {
        const index = $(this).data("index");
        console.log("Clique para excluir endereço. Índice:", index);
        const confirmDelete = confirm("Você tem certeza que deseja excluir este endereço?");
        if (confirmDelete) {
            console.log("Confirmação de exclusão de endereço. Índice:", index);
            enderecos.splice(index, 1);
            atualizarTabelaEnderecos();
        } else {
            console.log("Exclusão de endereço cancelada.");
        }
    });

    $(".form-control").on("input change", function () {
        if (!houveAlteracao) {
            houveAlteracao = true;
        }
    });

    configurarMascaraCPF();
    configurarMascaraCEP();
});

// Função para remover máscara de valores como telefone ou CPF
function removerMascara(valor, tipo) {
    if (tipo === "Celular" || tipo === "Telefone Fixo" || tipo === "CEP") {
        return valor.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
    }
    return valor;
}

function carregarDadosSelecoes() {
    return Promise.all([
        carregarOpcoesStatus(),
        carregarOpcoesSexo(),
        carregarOpcoesCorRaca(),
        carregarOpcoesEstadoCivil(),
        carregarEstados($("#selectNaturalidadeUf")),
        carregarEstados($("#selectEstado")),
        carregarEstados($("#selectRgUfEmissao")),
        carregarOpcoes("api/Medico/tipoContato", $("#selectTipoContato")),
        carregarOpcoes("api/Medico/tipoEndereco", $("#selectTipoEndereco")),
    ]);
}

function configurarMascaraCPF() {
    $("#txtcpfNumero").off("input").on("input", function () {
        let valor = $(this).val();
        valor = valor.replace(/\D/g, "");
        if (valor.length <= 11) {
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        }
        $(this).val(valor);
    });
}

function configurarMascaraCEP() {
    $("#txtCep").off("input").on("input", function () {
        let valor = $(this).val();
        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
        $(this).val(valor);
    });
}

function carregarOpcoesStatus() {
    const cachedStatus = localStorage.getItem('statusOptions');
    if (cachedStatus) {
        statusOptions = cachedStatus;
        $("#selectStatus").html(statusOptions);
        return Promise.resolve();
    }

    return $.ajax({
        url: urlAPI + "api/Medico/tipoStatus",
        method: "GET",
        success: function (data) {
            statusOptions = '<option value="0">Selecione um status</option>';
            data.forEach(item => {
                statusOptions += `<option value="${item.id}">${item.nome}</option>`;
            });
            $("#selectStatus").html(statusOptions);
            localStorage.setItem('statusOptions', statusOptions);
        },
        error: function () {
            alert("Erro ao carregar os status.");
        }
    });
}

function carregarOpcoesSexo() {
    const cachedSexo = localStorage.getItem('sexoOptions');
    if (cachedSexo) {
        sexoOptions = cachedSexo;
        $("#selectSexo").html(sexoOptions);
        return Promise.resolve();
    }

    return $.ajax({
        url: urlAPI + "api/Medico/tipoSexo",
        method: "GET",
        success: function (data) {
            sexoOptions = '<option value="0">Selecione um sexo</option>';
            data.forEach(item => {
                sexoOptions += `<option value="${item.id}">${item.nome}</option>`;
            });
            $("#selectSexo").html(sexoOptions);
            localStorage.setItem('sexoOptions', sexoOptions);
        },
        error: function () {
            alert("Erro ao carregar os tipos de sexo.");
        }
    });
}

function carregarOpcoesEstadoCivil() {
    const cachedEstadoCivil = localStorage.getItem('estadoCivilOptions');
    if (cachedEstadoCivil) {
        estadoCivilOptions = cachedEstadoCivil;
        $("#selectEstadoCivil").html(estadoCivilOptions);
        return Promise.resolve();
    }

    return $.ajax({
        url: urlAPI + "api/Medico/tipoEstadoCivil",
        method: "GET",
        success: function (data) {
            estadoCivilOptions = '<option value="0">Selecione um estado civil</option>';
            data.forEach(item => {
                estadoCivilOptions += `<option value="${item.id}">${item.nome}</option>`;
            });
            $("#selectEstadoCivil").html(estadoCivilOptions);
            localStorage.setItem('estadoCivilOptions', estadoCivilOptions);
        },
        error: function () {
            alert("Erro ao carregar os estados civis.");
        }
    });
}

function carregarOpcoesCorRaca() {
    const cachedCorRaca = localStorage.getItem('corRacaOptions');
    if (cachedCorRaca) {
        corRacaOptions = cachedCorRaca;
        $("#selectCorRaca").html(corRacaOptions);
        return Promise.resolve();
    }

    return $.ajax({
        url: urlAPI + "api/Medico/tipoCorRaca",
        method: "GET",
        success: function (data) {
            corRacaOptions = '<option value="0">Selecione uma cor/raça</option>';
            data.forEach(item => {
                corRacaOptions += `<option value="${item.id}">${item.nome}</option>`;
            });
            $("#selectCorRaca").html(corRacaOptions);
            localStorage.setItem('corRacaOptions', corRacaOptions);
        },
        error: function () {
            alert("Erro ao carregar as opções de cor/raça.");
        }
    });
}

function carregarOpcoes(apiEndpoint, selectElement) {
    return $.ajax({
        url: urlAPI + apiEndpoint,
        method: "GET",
        success: function (data) {
            const defaultOption = '<option value="0">Selecione uma opção</option>';
            selectElement.html(defaultOption);
            data.forEach(item => {
                const option = `<option value="${item.id}">${item.nome}</option>`;
                selectElement.append(option);
            });
        },
        error: function () {
            alert("Erro ao carregar os dados.");
        }
    });
}

function carregarEstados(selectElement) {
    return $.ajax({
        url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
        method: "GET",
        success: function (data) {
            selectElement.empty();
            selectElement.append('<option value="">Selecione uma UF</option>');
            data.forEach(estado => {
                const option = `<option value="${estado.sigla}">${estado.sigla}</option>`;
                selectElement.append(option);
            });
        },
        error: function () {
            alert("Erro ao carregar os estados.");
        }
    });
}

function carregarMunicipios(estadoSigla, selectElement, cidadeSelecionada = null) {
    if (estadoSigla) {
        return $.ajax({
            url: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSigla}/municipios`,
            method: "GET",
            success: function (data) {
                selectElement.empty();
                selectElement.append('<option value="">Selecione uma Cidade</option>');
                data.forEach(municipio => {
                    const option = `<option value="${municipio.nome}">${municipio.nome}</option>`;
                    selectElement.append(option);
                });
                if (cidadeSelecionada) {
                    selectElement.val(cidadeSelecionada);
                }
            },
            error: function () {
                alert("Erro ao carregar as Cidades.");
            }
        });
    } else {
        selectElement.empty().append('<option value="">Selecione uma cidade</option>');
    }
}

function carregarMedicos() {
    $("#loading").show();

    $.ajax({
        url: urlAPI + "api/Medico/dadosBasicos",
        method: "GET",
        success: function (data) {
            const tabela = $("#tabela");
            tabela.empty();

            const fragment = document.createDocumentFragment();

<<<<<<< HEAD
        if (!valorContato.trim() || valorContato.length > 100) {
            alert("Por favor, insira um valor de contato válido (máximo 100 caracteres).");
            return;
        }

        if (tipoContato && valorContato) {
            contatos.push({ idTipoContato: idTipoContato, tipo: tipoContato, valor: valorContato });
            atualizarTabelaContatos();
            $("#txtValorContato").val('');
        } else {
            alert("Por favor, selecione um tipo de contato e insira um valor.");
        }
    });

    $("#btnAdicionarEndereco").click(function () {
        const idTipoEndereco = $("#selectTipoEndereco").val();
        const tipoEndereco = $("#selectTipoEndereco option:selected").text();
        const logradouro = $("#txtLogradouro").val();
        const numero = $("#txtNumero").val();
        const complemento = $("#txtComplemento").val();
        const bairro = $("#txtBairro").val();
        const cidade = $("#selectMunicipio option:selected").text();
        const uf = $("#selectEstado option:selected").text();
        const cep = $("#txtCep").val();
        const pontoReferencia = $("#txtPontoReferencia").val();

        if (!idTipoEndereco || idTipoEndereco === "0") {
            alert("Por favor, selecione um tipo de endereço.");
            return;
        }

        if (!logradouro.trim() || logradouro.length > 100) {
            alert("Por favor, insira um logradouro válido (máximo 100 caracteres).");
            return;
        }

        if (!numero.trim() || numero.length > 10) {
            alert("Por favor, insira um número válido (máximo 10 caracteres).");
            return;
        }

        if (complemento && complemento.length > 30) {
            alert("O complemento deve ter no máximo 30 caracteres.");
            return;
        }

        if (!bairro.trim() || bairro.length > 70) {
            alert("Por favor, insira um bairro válido (máximo 70 caracteres).");
            return;
        }

        if (!cidade.trim() || cidade === "0") {
            alert("Por favor, selecione uma cidade.");
            return;
        }

        if (!uf.trim() || uf === "0") {
            alert("Por favor, selecione um estado.");
            return;
        }

        if (!cep.trim() || cep.length !== 8) {
            alert("Por favor, insira um CEP válido (8 caracteres).");
            return;
        }

        if (pontoReferencia && pontoReferencia.length > 100) {
            alert("O ponto de referência deve ter no máximo 100 caracteres.");
            return;
        }

        enderecos.push({ idTipoEndereco, tipo: tipoEndereco, logradouro, numero, complemento, bairro, cidade, uf, cep, pontoReferencia });
        atualizarTabelaEnderecos();
        limparCamposEndereco();
    });

    function limparCamposEndereco() {
        $("#txtLogradouro").val('');
        $("#txtNumero").val('');
        $("#txtComplemento").val('');
        $("#txtBairro").val('');
        $("#selectMunicipio").val('');
        $("#selectEstado").val('');
        $("#txtCep").val('');
        $("#txtPontoReferencia").val('');
    }

    function atualizarTabelaContatos() {
        const tabela = $("#contatoTable tbody");
        tabela.empty();

        contatos.forEach((contato, index) => {
            const linha = `<tr>
                <td>${contato.tipo}</td>
                <td>${contato.valor}</td>
                <td><button type="button" class="btn btn-danger excluir-contato" data-index="${index}">Excluir</button></td>
            </tr>`;
            tabela.append(linha);
        });

        $(".excluir-contato").click(function () {
            const index = $(this).data("index");
            if (confirm("Tem certeza de que deseja excluir este contato?")) {
                contatos.splice(index, 1);
                atualizarTabelaContatos();
            }
        });
    }

    function atualizarTabelaEnderecos() {
        const tabela = $("#enderecoTable tbody");
        tabela.empty();

        enderecos.forEach((endereco, index) => {
            const linha = `<tr>
                <td>${endereco.tipo}</td>
                <td>${endereco.logradouro}</td>
                <td>${endereco.numero}</td>
                <td>${endereco.complemento}</td>
                <td>${endereco.bairro}</td>
                <td>${endereco.cidade}</td>
                <td>${endereco.uf}</td>
                <td>${endereco.cep}</td>
                <td>${endereco.pontoReferencia}</td>
                <td><button type="button" class="btn btn-danger excluir-endereco" data-index="${index}">Excluir</button></td>
            </tr>`;
            tabela.append(linha);
        });

        $(".excluir-endereco").click(function () {
            const index = $(this).data("index");
            if (confirm("Tem certeza de que deseja excluir este endereço?")) {
                enderecos.splice(index, 1);
                atualizarTabelaEnderecos();
            }
        });
    }

    $("#btnsalvar").click(function () {
        if (validarCampos()) {
            const obj = {
                id: $("#txtid").val(),
                nomeCompleto: $("#txtnomeCompleto").val(),
                dataNascimento: $("#txtdataNascimento").val(),
                crm: $("#txtcrm").val(),
                dataCadastro: $("#txtdataCadastro").val(),
                idStatus: $("#selectStatus").val(),
                idSexo: $("#selectSexo").val(),
                idCorRaca: $("#selectCorRaca").val(),
                idEstadoCivil: $("#selectEstadoCivil").val(),
                nomeConjuge: $("#txtnomeConjuge").val(),
                naturalidadeUf: $("#selectNaturalidadeUf").val(),
                naturalidadeCidade: $("#selectNaturalidadeCidade").val(),
                rgNumero: $("#txtrgNumero").val(),
                rgDataEmissao: $("#txtrgDataEmissao").val(),
                rgOrgaoExpedidor: $("#txtrgOrgaoExpedidor").val(),
                rgUfEmissao: $("#selectRgUfEmissao").val(),
                cnsNumero: $("#txtcnsNumero").val(),
                cpfNumero: $("#txtcpfNumero").val(),
                nomeMae: $("#txtnomeMae").val(),
                contato: contatos,
                endereco: enderecos
            };

            $.ajax({
                type: obj.id == "0" ? "POST" : "PUT",
                url: urlAPI + "api/Medico" + (obj.id != "0" ? "/" + obj.id : ""),
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(obj),
                dataType: "json",
                success: function () {
                    limparFormulario();
                    alert("Dados Salvos com sucesso!");

                    if ($("#tabela").length > 0) {
                        carregarMedicos();
                    }
                },
                error: function (jqXHR, textStatus) {
                    if (jqXHR.status === 400) {
                        var errors = jqXHR.responseJSON.errors;
                        var message = "";
                        for (var key in errors) {
                            if (errors.hasOwnProperty(key)) {
                                errors[key].forEach(function (errorMessage) {
                                    message += errorMessage + "\n";
                                });
                            }
                        }
                        alert(message);
                    } else {
                        alert("Erro ao salvar os dados: " + textStatus);
                    }
                }
=======
            $.each(data, function (index, item) {
                var linha = $("#linhaExemplo").clone().removeAttr("id").removeAttr("style");
                $(linha).find(".codigo").html(item.id);
                $(linha).find(".nomeCompleto").html(item.nomeCompleto);
                $(linha).find(".dataNascimento").html(new Date(item.dataNascimento).toLocaleDateString());
                $(linha).find(".crm").html(item.crm);
                $(linha).find(".rg").html(item.rgNumero);
                $(linha).find(".cpf").html(item.cpfNumero);

                var statusSelect = $("<select>")
                    .addClass("form-select alterar-status")
                    .html(statusOptions)
                    .val(item.idStatus);
                $(linha).find(".status").html(statusSelect);

                fragment.appendChild(linha[0]);
>>>>>>> 2gustavo
            });

            tabela.append(fragment);

            $('#tabelaMedico').DataTable({
                language: {
                    url: '/js/pt-BR.json'
                },
                destroy: true
            });

            $("#loading").hide();
        },
        error: function () {
            alert("Erro ao carregar médicos.");
            $("#loading").hide();
        }
    });
}
function validarCampos() {
    let isValid = true;
    $(".form-control").removeClass('is-invalid');

    const camposObrigatorios = [
        "#txtnomeCompleto",
        "#txtdataNascimento",
        "#txtrgNumero",
        "#txtrgDataEmissao",
        "#txtrgOrgaoExpedidor",
        "#selectRgUfEmissao",
        "#txtcnsNumero",
        "#txtcpfNumero",
        "#txtcrm",
        "#txtnomeMae",
        "#selectNaturalidadeCidade",
        "#selectNaturalidadeUf",
        "#selectStatus",
        "#selectSexo",
        "#selectCorRaca",
        "#selectEstadoCivil"
    ];

    camposObrigatorios.forEach(function (campo) {
        let valor = $(campo).val().trim();

        if (valor === "" || valor === "0") {
            $(campo).addClass('is-invalid');
            isValid = false;
        }
    });

    if (contatos.length === 0) {
        $("#mensagemValidacao").text("Por favor, adicione pelo menos um contato.");
        isValid = false;
    } else {
        $("#mensagemValidacao").text("");
    }

    if (enderecos.length === 0) {
        $("#mensagemValidacaoEndereco").text("Por favor, adicione pelo menos um endereço.");
        isValid = false;
    } else {
        $("#mensagemValidacaoEndereco").text("");
    }

    return isValid;
}

$("#btnsalvar").click(function () {
    if ($("#txtid").val() !== "0" && houveAlteracao) {
        const confirmSave = confirm("Você fez alterações no formulário. Deseja salvar as alterações?");
        if (!confirmSave) {
            return;
        }
    }

    if (validarCampos()) {
        const rgNumero = removerMascara($("#txtrgNumero").val(), "RG");
        const cnsNumero = removerMascara($("#txtcnsNumero").val(), "CNS");
        const cpfNumero = removerMascara($("#txtcpfNumero").val(), "CPF");

        enderecos = enderecos.map(endereco => ({
            ...endereco,
            cep: removerMascara(endereco.cep, "CEP")
        }));

        const obj = {
            id: $("#txtid").val(),
            nomeCompleto: $("#txtnomeCompleto").val(),
            dataNascimento: $("#txtdataNascimento").val(),
            rgNumero: rgNumero,
            rgDataEmissao: $("#txtrgDataEmissao").val(),
            rgOrgaoExpedidor: $("#txtrgOrgaoExpedidor").val(),
            rgUfEmissao: $("#selectRgUfEmissao").val(),
            cnsNumero: cnsNumero,
            cpfNumero: cpfNumero,
            crm: $("#txtcrm").val(),
            nomeMae: $("#txtnomeMae").val(),
            nomeConjuge: $("#txtnomeConjuge").val(),
            naturalidadeCidade: $("#selectNaturalidadeCidade").val(),
            naturalidadeUf: $("#selectNaturalidadeUf").val(),
            dataCadastro: $("#txtdataCadastro").val(),
            idStatus: $("#selectStatus").val(),
            idSexo: $("#selectSexo").val(),
            idCorRaca: $("#selectCorRaca").val(),
            idEstadoCivil: $("#selectEstadoCivil").val(),
            contato: contatos,
            endereco: enderecos
        };

        console.log("Objeto a ser enviado:", obj);

        $.ajax({
            type: obj.id == "0" ? "POST" : "PUT",
            url: urlAPI + "api/Medico" + (obj.id != "0" ? "/" + obj.id : ""),
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json",
            success: function () {
                limparFormulario();
                alert("Dados Salvos com sucesso!");

                if ($("#tabela").length > 0) {
                    carregarMedicos();
                }
                houveAlteracao = false;
            },
            error: function (jqXHR, textStatus) {
                if (jqXHR.status === 400) {
                    var errors = jqXHR.responseJSON.errors;
                    var message = "";
                    for (var key in errors) {
                        if (errors.hasOwnProperty(key)) {
                            errors[key].forEach(function (errorMessage) {
                                message += errorMessage + "\n";
                            });
                        }
                    }
                    alert(message);
                } else {
                    alert("Erro ao salvar os dados: " + textStatus);
                }
            }
        });
    }
});


function limparFormulario() {
    $("#txtnomeCompleto").val('');
    $("#txtdataNascimento").val('');
    $("#txtrgNumero").val('');
    $("#txtrgDataEmissao").val('');
    $("#txtrgOrgaoExpedidor").val('');
    $("#selectRgUfEmissao").val('');
    $("#txtcnsNumero").val('');
    $("#txtcpfNumero").val('');
    $("#txtcrm").val('');
    $("#txtid").val('0');
    $("#txtdataCadastro").val(new Date().toISOString().split('T')[0]);
    $("#txtidade").val('');
    $("#txtnomeMae").val('');
    $("#txtnomeConjuge").val('');
    $("#selectNaturalidadeCidade").val('');
    $("#selectNaturalidadeUf").val('');

    $("#selectStatus").val("0");
    $("#selectSexo").val("0");
    $("#selectCorRaca").val("0");
    $("#selectEstadoCivil").val("0");

    contatos = [];
    enderecos = [];
    atualizarTabelaContatos();
    atualizarTabelaEnderecos();

    houveAlteracao = false;
}


function mudarStatus(codigo, novoStatus) {
    console.log("Alterando status para Medico:", codigo, "Novo Status:", novoStatus);
    $.ajax({
        type: "PATCH",
        url: urlAPI + "api/Medico/" + codigo + "/mudarStatus",
        contentType: "application/json",
        data: JSON.stringify(novoStatus),
        dataType: "json",
        success: function () {
            alert('Status alterado com sucesso!');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("Erro:", xhr.responseText);
            alert("Erro ao alterar o status do médico: " + xhr.responseText);
        }
    });
}

async function visualizar(codigo) {
    try {
        $("#loading").show();

        const medicoPromise = $.ajax({
            type: "GET",
            url: urlAPI + "api/Medico/" + codigo + "/dadosCompletos",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
        });

        const estadosPromise = carregarEstados($("#selectRgUfEmissao"));

        const [jsonResult, estados] = await Promise.all([medicoPromise, estadosPromise]);

        $("#txtid").val(jsonResult.id);
        $("#txtnomeCompleto").val(jsonResult.nomeCompleto);

        const dataNascimento = new Date(jsonResult.dataNascimento);
        $("#txtdataNascimento").val(dataNascimento.toISOString().split('T')[0]);

        $("#txtrgNumero").val(jsonResult.rgNumero);
        $("#txtrgDataEmissao").val(new Date(jsonResult.rgDataEmissao).toISOString().split('T')[0]);
        $("#txtrgOrgaoExpedidor").val(jsonResult.rgOrgaoExpedidor);
        $("#selectRgUfEmissao").val(jsonResult.rgUfEmissao);

        await carregarEstados($("#selectNaturalidadeUf")).then(() => {
            $("#selectNaturalidadeUf").val(jsonResult.naturalidadeUf);
            carregarMunicipios(jsonResult.naturalidadeUf, $("#selectNaturalidadeCidade"), jsonResult.naturalidadeCidade);
        });

        $("#txtcnsNumero").val(jsonResult.cnsNumero);
        $("#txtcpfNumero").val(jsonResult.cpfNumero);
        $("#txtcrm").val(jsonResult.crm);
        $("#txtdataCadastro").val(new Date(jsonResult.dataCadastro).toISOString().split('T')[0]);

        $("#selectStatus").val(jsonResult.idStatus);
        $("#selectSexo").val(jsonResult.idSexo);
        $("#selectCorRaca").val(jsonResult.idCorRaca);
        $("#selectEstadoCivil").val(jsonResult.idEstadoCivil);

        $("#txtnomeMae").val(jsonResult.nomeMae);
        $("#txtnomeConjuge").val(jsonResult.nomeConjuge);

        contatos = jsonResult.contato.map(c => ({
            idTipoContato: c.idTipoContato,
            tipo: c.tipocontato.nome,
            valor: c.valor
        }));
        atualizarTabelaContatos();

        enderecos = jsonResult.endereco.map(e => ({
            idTipoEndereco: e.idTipoEndereco,
            logradouro: e.logradouro,
            numero: e.numero,
            complemento: e.complemento,
            bairro: e.bairro,
            cidade: e.cidade,
            uf: e.uf,
            cep: e.cep,
            pontoReferencia: e.pontoReferencia
        }));
        atualizarTabelaEnderecos();

        const idade = calcularIdade(dataNascimento);
        $("#txtidade").val(idade);

    } catch (error) {
        alert("Erro ao carregar os dados: " + error.responseText);
    } finally {
        $("#loading").hide();
    }
}

function atualizarTabelaContatos() {
    const tabela = $("#contatoTable tbody");
    tabela.empty();

    contatos.forEach((contato, index) => {
        let valorFormatado = contato.valor;

        if (contato.tipo === "Celular") {
            valorFormatado = aplicarMascara(valorFormatado, "Celular");
        } else if (contato.tipo === "Telefone Fixo") {
            valorFormatado = aplicarMascara(valorFormatado, "Telefone Fixo");
        }

        const linha = `<tr>
            <td>${contato.tipo}</td>
            <td>${valorFormatado}</td>
            <td>
                <button type="button" class="btn btn-warning btn-edit" data-index="${index}" data-type="contato">Editar</button>
                <button type="button" class="btn btn-danger" data-index="${index}" data-type="contato">Excluir</button>
            </td>
        </tr>`;
        tabela.append(linha);
    });

    $(".btn-edit[data-type='contato']").off("click").on("click", function () {
        const index = $(this).data("index");
        editarContato(index);
    });
}

function editarContato(index) {
    if (contatoEmEdicao !== null) {
        contatos[contatoEmEdicao.index] = contatoEmEdicao;
    }

    contatoEmEdicao = { ...contatos[index], index };

    let valorComMascara = contatoEmEdicao.valor;
    if (contatoEmEdicao.tipo === "Celular") {
        valorComMascara = aplicarMascara(valorComMascara, "Celular");
    } else if (contatoEmEdicao.tipo === "Telefone Fixo") {
        valorComMascara = aplicarMascara(valorComMascara, "Telefone Fixo");
    }

    $("#selectTipoContato").val(contatoEmEdicao.idTipoContato);
    $("#txtValorContato").val(valorComMascara);
}

function atualizarTabelaEnderecos() {
    const tabela = $("#enderecoTable tbody");
    tabela.empty();

    enderecos.forEach((endereco, index) => {
        let tipoEnderecoNome = $("#selectTipoEndereco option[value='" + endereco.idTipoEndereco + "']").text();
        let cepFormatado = aplicarMascara(endereco.cep, "CEP");

        const linha = `<tr>
            <td>${tipoEnderecoNome}</td>
            <td>${endereco.logradouro}</td>
            <td>${endereco.numero}</td>
            <td>${endereco.complemento}</td>
            <td>${endereco.bairro}</td>
            <td>${endereco.cidade}</td>
            <td>${endereco.uf}</td>
            <td>${cepFormatado}</td>
            <td>${endereco.pontoReferencia}</td>
            <td>
                <button type="button" class="btn btn-warning btn-edit" data-index="${index}" data-type="endereco">Editar</button>
                <button type="button" class="btn btn-danger" data-index="${index}" data-type="endereco">Excluir</button>
            </td>
        </tr>`;
        tabela.append(linha);
    });

    $(document).off("click", ".btn-edit[data-type='endereco']");
    $(document).off("click", ".btn-danger[data-type='endereco']");

    $(document).on("click", ".btn-edit[data-type='endereco']", function () {
        const index = $(this).data("index");
        editarEndereco(index);
    });

    $(document).on("click", ".btn-danger[data-type='endereco']", function () {
        const index = $(this).data("index");
        const confirmDelete = confirm("Você tem certeza que deseja excluir este endereço?");
        if (confirmDelete) {
            enderecos.splice(index, 1);
            atualizarTabelaEnderecos();
        }
    });
}

function salvarEnderecoEmEdicao() {
    if (enderecoEmEdicao !== null) {
        const enderecoAtualizado = {
            idTipoEndereco: $("#selectTipoEndereco").val(),
            logradouro: $("#txtLogradouro").val(),
            numero: $("#txtNumero").val(),
            complemento: $("#txtComplemento").val(),
            bairro: $("#txtBairro").val(),
            cidade: $("#selectMunicipio option:selected").text(),
            uf: $("#selectEstado option:selected").text(),
            cep: removerMascara($("#txtCep").val(), "CEP"),
            pontoReferencia: $("#txtPontoReferencia").val()
        };

        if (!enderecoAtualizado.idTipoEndereco || !enderecoAtualizado.logradouro || !enderecoAtualizado.numero ||
            !enderecoAtualizado.bairro || !enderecoAtualizado.cidade || !enderecoAtualizado.uf || !enderecoAtualizado.cep) {
            alert("Por favor, preencha todos os campos obrigatórios do endereço.");
            return false;
        }

        enderecos[enderecoEmEdicao] = enderecoAtualizado;
        enderecoEmEdicao = null;

        atualizarTabelaEnderecos();
        limparCamposEndereco();
    }
    return true;
}

function editarEndereco(index) {
    enderecoEmEdicao = index;

    let endereco = enderecos[index];
    let cepComMascara = aplicarMascara(endereco.cep, "CEP");

    $("#selectTipoEndereco").val(endereco.idTipoEndereco);
    $("#txtLogradouro").val(endereco.logradouro);
    $("#txtNumero").val(endereco.numero);
    $("#txtComplemento").val(endereco.complemento);
    $("#txtBairro").val(endereco.bairro);
    $("#selectEstado").val(endereco.uf);
    carregarMunicipios(endereco.uf, $("#selectMunicipio"), endereco.cidade);
    $("#txtCep").val(cepComMascara);
    $("#txtPontoReferencia").val(endereco.pontoReferencia);
}

function calcularIdade(dataNascimento) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const m = hoje.getMonth() - dataNascimento.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }
    return idade;
}

$("#selectTipoContato").change(function () {
    const tipoContato = $("#selectTipoContato option:selected").text();
    const inputContato = $("#txtValorContato");

    inputContato.off("input");
    inputContato.val('');

    if (tipoContato === "Celular") {
        inputContato.attr("maxlength", 11);
        inputContato.on("input", function () {
            this.value = this.value.replace(/\D/g, '');
            this.value = this.value.slice(0, 11);
            this.value = aplicarMascara(this.value, "Celular");
        });
    } else if (tipoContato === "Telefone Fixo") {
        inputContato.attr("maxlength", 10);
        inputContato.on("input", function () {
            this.value = this.value.replace(/\D/g, '');
            this.value = this.value.slice(0, 10);
            this.value = aplicarMascara(this.value, "Telefone Fixo");
        });
    } else if (tipoContato === "E-mail") {
        inputContato.attr("maxlength", 100);
        inputContato.on("input", function () {
            const email = this.value;
            if (!email.includes("@")) {
                this.setCustomValidity("E-mail inválido");
            } else {
                this.setCustomValidity("");
            }
        });
    } else {
        inputContato.removeAttr("maxlength");
    }
});

function aplicarMascara(valor, tipo) {
    if (tipo === "Celular") {
        return valor.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (tipo === "Telefone Fixo") {
        return valor.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    } else if (tipo === "CEP") {
        return valor.replace(/^(\d{5})(\d{3})$/, "$1-$2");
    }
    return valor;
}

$("#btnAdicionarContato").click(function () {
    const idTipoContato = $("#selectTipoContato").val();
    const tipoContato = $("#selectTipoContato option:selected").text();
    let valorContato = $("#txtValorContato").val();

    if (idTipoContato === "" || idTipoContato === null || tipoContato === "Selecione um Tipo de Contato") {
        alert("Por favor, selecione um tipo de contato válido.");
        return;
    }

    valorContato = removerMascara(valorContato, tipoContato);

    if (contatoEmEdicao !== null) {
        const isSameAsOld = (contatos[contatoEmEdicao.index].idTipoContato === idTipoContato &&
            contatos[contatoEmEdicao.index].valor === valorContato);

        if (!isSameAsOld) {
            const contatoDuplicado = contatos.some(contato =>
                contato.idTipoContato === idTipoContato && contato.valor === valorContato
            );

            if (contatoDuplicado) {
                alert("Este contato já foi adicionado.");
                return;
            }
        }

        contatos[contatoEmEdicao.index] = {
            idTipoContato: idTipoContato,
            tipo: tipoContato,
            valor: valorContato
        };
        contatoEmEdicao = null;
    } else {
        const contatoDuplicado = contatos.some(contato =>
            contato.idTipoContato === idTipoContato && contato.valor === valorContato
        );

        if (contatoDuplicado) {
            alert("Este contato já foi adicionado.");
            return;
        }

        if (contatos.length >= 3) {
            alert("Você pode adicionar no máximo 3 contatos.");
            return;
        }

        contatos.push({ idTipoContato: idTipoContato, tipo: tipoContato, valor: valorContato });
    }

    atualizarTabelaContatos();
    $("#txtValorContato").val('');
});

$("#btnAdicionarEndereco").click(function () {
    const idTipoEndereco = $("#selectTipoEndereco").val();
    const logradouro = $("#txtLogradouro").val();
    const numero = $("#txtNumero").val();
    const complemento = $("#txtComplemento").val();
    const bairro = $("#txtBairro").val();
    const cidade = $("#selectMunicipio option:selected").text();
    const uf = $("#selectEstado option:selected").text();
    const cep = removerMascara($("#txtCep").val(), "CEP");
    const pontoReferencia = $("#txtPontoReferencia").val();

    if (!idTipoEndereco || idTipoEndereco === "0") {
        alert("Por favor, selecione um tipo de endereço válido.");
        return;
    }

    if (!logradouro || !numero || !bairro || !cidade || !uf || !cep) {
        alert("Por favor, preencha todos os campos obrigatórios do endereço.");
        return;
    }

    const novoEndereco = {
        idTipoEndereco,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        cep,
        pontoReferencia
    };

    if (enderecoEmEdicao !== null) {
        enderecos[enderecoEmEdicao] = novoEndereco;
        enderecoEmEdicao = null;
    } else {
        enderecos.push(novoEndereco);
    }

    atualizarTabelaEnderecos();
    limparCamposEndereco();

    $("#selectTipoEndereco").val('0');
});

function limparCamposEndereco() {
    $("#selectTipoEndereco").val('0');
    $("#txtLogradouro").val('');
    $("#txtNumero").val('');
    $("#txtComplemento").val('');
    $("#txtBairro").val('');
    $("#selectMunicipio").val('');
    $("#selectEstado").val('');
    $("#txtCep").val('');
    $("#txtPontoReferencia").val('');
    enderecoEmEdicao = null;
}

function removerFormatacao(valor) {
    return valor.replace(/\D/g, "");
}

function removerFormatacaoRG(valor) {
    return valor.replace(/[^\w]/g, "");
}

$("#txtcpfNumero").on("input", function () {
    let valor = $(this).val();

    valor = valor.replace(/\D/g, "");

    if (valor.length <= 11) {
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    $(this).val(valor);
});

$("#txtrgNumero").on("input", function () {
    let valor = $(this).val();
    valor = valor.replace(/[^a-zA-Z0-9]/g, "");
    valor = valor.replace(/(\d{2})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\w{1,2})$/, "$1-$2");
    $(this).val(valor);
});

$("#txtcnsNumero").on("input", function () {
    let valor = $(this).val();
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{3})(\d)/, "$1 $2");
    valor = valor.replace(/(\d{4})(\d)/, "$1 $2");
    valor = valor.replace(/(\d{4})(\d)/, "$1 $2");
    $(this).val(valor);
});

$("#txtCep").on("input", function () {
    let valor = $(this).val();
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
    $(this).val(valor);
});


$("#txtNumero").on("input", function () {
    let valor = $(this).val();

    valor = valor.replace(/\D/g, "");

    if (valor > 9999999999) {
        valor = 9999999999;
    }

    $(this).val(valor);
});

$("#txtNumero").on("blur", function () {
    let valor = $(this).val();

    if (valor === "" || valor === "0") {
        valor = 1;
    }

    $(this).val(valor);
});
