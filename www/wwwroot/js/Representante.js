﻿const urlAPI = "https://localhost:7034/";

$(document).ready(function () {
    // Inicializa os campos select com "Selecione uma opção"
    $("select").prepend('<option value="" selected>Selecione uma opção</option>');

    // Apenas números nos campos CPF, CNS e RG
    $(".numeric-only").on("input", function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Limitar o tamanho dos campos
    $("#txtnomeCompleto, #txtnomeConjuge, #txtnomeMae").attr('maxlength', 100);
    $("#txtcnsNumero").attr('maxlength', 15);
    $("#txtrgNumero").attr('maxlength', 9);
    $("#txtcpfNumero").attr('maxlength', 11);
    $("#txtLogradouro").attr('maxlength', 100);
    $("#txtNumero").attr('maxlength', 10);
    $("#txtComplemento").attr('maxlength', 30);
    $("#txtBairro").attr('maxlength', 70);
    $("#txtCep").attr('maxlength', 8);
    $("#txtPontoReferencia").attr('maxlength', 100);

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
    let RepresentanteDados;

    if ($("#tabela").length > 0) {
        carregarRepresentantes();
    } else if ($("#txtid").length > 0) {
        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        if (id) {
            visualizar(id);
        } else {
            // Alimenta o campo dataCadastro com a data atual
            let dataAtual = new Date().toISOString().split('T')[0];
            $("#txtdataCadastro").val(dataAtual);
        }
    }

    $("#txtdataNascimento").change(function () {
        let dataNascimento = new Date($(this).val());
        let idade = calcularIdade(dataNascimento);
        $("#txtidade").val(idade);
    });

    $("#btnlimpar").click(function () {
        limparFormulario();
    });

    $(document).on("click", ".alterar", function (elemento) {
        let codigo = $(elemento.target).closest("tr").find(".codigo").text();
        window.location.href = "/RepresentanteCadastro?id=" + codigo;
    });

    $(document).on("click", ".excluir", function (elemento) {
        let codigo = $(elemento.target).closest("tr").find(".codigo").text();
        excluir(codigo);
    });

    function validarCampos() {
        let isValid = true;
        $(".form-control").removeClass('is-invalid');

        function adicionarErro(id) {
            $(id).addClass('is-invalid');
            isValid = false;
        }

        if (!$("#txtnomeCompleto").val().trim()) adicionarErro("#txtnomeCompleto");
        if (!$("#txtdataNascimento").val().trim()) adicionarErro("#txtdataNascimento");
        if (!$("#txtrgNumero").val().trim() || $("#txtrgNumero").val().length != 9) adicionarErro("#txtrgNumero");
        if (!$("#txtcpfNumero").val().trim() || $("#txtcpfNumero").val().length != 11) adicionarErro("#txtcpfNumero");
        if (!$("#txtcnsNumero").val().trim() || $("#txtcnsNumero").val().length != 15) adicionarErro("#txtcnsNumero");
        if (!$("#selectStatus").val()) adicionarErro("#selectStatus");
        if (!$("#selectSexo").val()) adicionarErro("#selectSexo");
        if (!$("#selectCorRaca").val()) adicionarErro("#selectCorRaca");
        if (!$("#selectEstadoCivil").val()) adicionarErro("#selectEstadoCivil");
        if ($("#txtnomeConjuge").val().length > 100) adicionarErro("#txtnomeConjuge");
        if (!$("#selectNaturalidadeUf").val()) adicionarErro("#selectNaturalidadeUf");
        if (!$("#selectNaturalidadeCidade").val()) adicionarErro("#selectNaturalidadeCidade");
        if (!$("#txtrgDataEmissao").val().trim()) adicionarErro("#txtrgDataEmissao");
        if (!$("#txtrgOrgaoExpedidor").val().trim() || $("#txtrgOrgaoExpedidor").val().length != 10) adicionarErro("#txtrgOrgaoExpedidor");
        if (!$("#selectRgUfEmissao").val()) adicionarErro("#selectRgUfEmissao");
        if (!$("#txtnomeMae").val().trim()) adicionarErro("#txtnomeMae");
        if (!$("#selectProfissao").val()) adicionarErro("#selectProfissao");

        if (contatos.length === 0) {
            $("#mensagemValidacao").text("Por favor, adicione pelo menos um contato.");
            isValid = false;
        } else {
            $("#mensagemValidacao").text(""); // Limpa a mensagem se a validação for bem-sucedida
        }

        if (enderecos.length === 0) {
            $("#mensagemValidacaoEndereco").text("Por favor, adicione pelo menos um endereço.");
            isValid = false;
        } else {
            $("#mensagemValidacaoEndereco").text(""); // Limpa a mensagem se a validação for bem-sucedida
        }

        return isValid;
    }

    $(".form-control").on("input", function () {
        $(this).removeClass('is-invalid');
    });

    function carregarEstados(selectElement) {
        return $.ajax({
            url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
            method: "GET",
            success: function (data) {
                selectElement.empty();
                selectElement.append('<option value="">Selecione um estado</option>');
                data.sort((a, b) => a.sigla.localeCompare(b.sigla));
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
                    selectElement.append('<option value="">Selecione um município</option>');
                    data.forEach(municipio => {
                        const option = `<option value="${municipio.nome}">${municipio.nome}</option>`;
                        selectElement.append(option);
                    });
                    if (cidadeSelecionada) {
                        selectElement.val(cidadeSelecionada);
                    }
                },
                error: function () {
                    alert("Erro ao carregar os municípios.");
                }
            });
        } else {
            selectElement.empty();
        }
    }

    carregarEstados($("#selectEstado"));
    carregarEstados($("#selectNaturalidadeUf"));
    carregarEstados($("#selectRgUfEmissao"));

    $("#selectEstado").change(function () {
        carregarMunicipios($(this).val(), $("#selectMunicipio"));
    });

    $("#selectNaturalidadeUf").change(function () {
        carregarMunicipios($(this).val(), $("#selectNaturalidadeCidade"));
    });

    function carregarOpcoes(apiEndpoint, selectElement, mensagemPadrao) {
        $.ajax({
            url: urlAPI + apiEndpoint,
            method: "GET",
            success: function (data) {
                selectElement.empty();
                selectElement.append(`<option value="">${mensagemPadrao}</option>`);
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

    carregarOpcoes("api/Representante/tipoContato", $("#selectTipoContato"), "Selecione um tipo de contato");
    carregarOpcoes("api/Representante/tipoEndereco", $("#selectTipoEndereco"), "Selecione um tipo de endereço");
    carregarOpcoes("api/Representante/tipoStatus", $("#selectStatus"), "Selecione um status");
    carregarOpcoes("api/Representante/tipoSexo", $("#selectSexo"), "Selecione um sexo");
    carregarOpcoes("api/Representante/tipoProfissao", $("#selectProfissao"), "Selecione uma profissão");
    carregarOpcoes("api/Representante/tipoCorRaca", $("#selectCorRaca"), "Selecione uma cor/raça");
    carregarOpcoes("api/Representante/tipoEstadoCivil", $("#selectEstadoCivil"), "Selecione um estado civil");

    $("#btnAdicionarContato").click(function () {
        const tipoContato = $("#selectTipoContato option:selected").text();
        const valorContato = $("#txtValorContato").val();
        const idTipoContato = $("#selectTipoContato").val();

        if (!idTipoContato) {
            alert("Por favor, selecione um tipo de contato.");
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

        if (!idTipoEndereco) {
            alert("Por favor, selecione um tipo de endereço.");
            return;
        }

        if (logradouro && numero && bairro && cidade && uf && cep) {
            enderecos.push({ idTipoEndereco, tipo: tipoEndereco, logradouro, numero, complemento, bairro, cidade, uf, cep, pontoReferencia });
            atualizarTabelaEnderecos();
            limparCamposEndereco();
        } else {
            alert("Por favor, preencha todos os campos obrigatórios do endereço.");
        }
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
            contatos.splice(index, 1);
            atualizarTabelaContatos();
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
            enderecos.splice(index, 1);
            atualizarTabelaEnderecos();
        });
    }

    $("#btnsalvar").click(function () {
        if (validarCampos()) {
            const obj = {
                id: $("#txtid").val(),
                nomeCompleto: $("#txtnomeCompleto").val(),
                dataNascimento: $("#txtdataNascimento").val(),
                rgNumero: $("#txtrgNumero").val(),
                rgDataEmissao: $("#txtrgDataEmissao").val(),
                rgOrgaoExpedidor: $("#txtrgOrgaoExpedidor").val(),
                rgUfEmissao: $("#selectRgUfEmissao").val(),
                cnsNumero: $("#txtcnsNumero").val(),
                cpfNumero: $("#txtcpfNumero").val(),
                nomeMae: $("#txtnomeMae").val(),
                nomeConjuge: $("#txtnomeConjuge").val(),
                naturalidadeCidade: $("#selectNaturalidadeCidade").val(),
                naturalidadeUf: $("#selectNaturalidadeUf").val(),

                dataCadastro: $("#txtdataCadastro").val(),  // não pode ser modificado pelo usuário
                idStatus: $("#selectStatus").val(),
                idSexo: $("#selectSexo").val(),
                idProfissao: $("#selectProfissao").val(),
                idCorRaca: $("#selectCorRaca").val(),
                idEstadoCivil: $("#selectEstadoCivil").val(),
                contato: contatos,
                endereco: enderecos
            };

            $.ajax({
                type: obj.id == "0" ? "POST" : "PUT",
                url: urlAPI + "api/Representante" + (obj.id != "0" ? "/" + obj.id : ""),
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(obj),
                dataType: "json",
                success: function () {
                    limparFormulario();
                    alert("Dados Salvos com sucesso!");

                    if ($("#tabela").length > 0) {
                        carregarRepresentantes();
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
        $("#txtid").val('0');
        $("#txtdataCadastro").val(new Date().toISOString().split('T')[0]);
        $("#txtidade").val('');
        $("#txtnomeMae").val('');
        $("#txtnomeConjuge").val('');
        $("#selectNaturalidadeCidade").val('');
        $("#selectNaturalidadeUf").val('');

        $("#selectStatus").val('');
        $("#selectSexo").val('');
        $("#selectProfissao").val('');
        $("#selectCorRaca").val('');
        $("#selectEstadoCivil").val('');
        contatos = [];
        enderecos = [];
        atualizarTabelaContatos();
        atualizarTabelaEnderecos();
    }

    function carregarRepresentantes() {
        $.ajax({
            url: urlAPI + "api/Representante/todosRepresentantesComContatosEEnderecos",
            method: "GET",
            success: function (data) {
                $("#tabela").empty();
                $.each(data, function (index, item) {
                    var linha = $("#linhaExemplo").clone().removeAttr("id").removeAttr("style");
                    $(linha).find(".codigo").html(item.id);
                    $(linha).find(".nomeCompleto").html(item.nomeCompleto);
                    $(linha).find(".dataNascimento").html(new Date(item.dataNascimento).toLocaleDateString()); // Formata a data
                    $(linha).find(".rgNumero").html(item.rgNumero);
                    $(linha).find(".status").html(item.status ? item.status.nome : "Não Definido");

                    // Construir o HTML para exibir os contatos
                    var contatosHTML = item.contato.map(c => {
                        var tipoContatoNome = c.tipocontato ? c.tipocontato.nome : "Tipo de Contato Desconhecido";
                        return `${tipoContatoNome}: ${c.valor}`;
                    }).join("<br>");
                    $(linha).find(".contatos").html(contatosHTML);

                    // Construir o HTML para exibir os endereços
                    var enderecosHTML = item.endereco.map(e => {
                        var tipoEnderecoNome = e.tipoendereco ? e.tipoendereco.nome : "Tipo de Endereço Desconhecido";
                        return `${tipoEnderecoNome}: ${e.logradouro}, ${e.numero}, ${e.complemento}, ${e.bairro}, ${e.cidade}, ${e.uf}, ${e.cep}, ${e.pontoReferencia}`;
                    }).join("<br>");
                    $(linha).find(".enderecos").html(enderecosHTML);

                    $(linha).show();
                    $("#tabela").append(linha);
                });

                $('#tabelaRepresentante').DataTable({
                    language: {
                        url: '/js/pt-BR.json'
                    },
                    destroy: true
                });
            },
            error: function () {
                alert("Erro ao carregar Representantes.");
            }
        });
    }

    function excluir(codigo) {
        $.ajax({
            type: "DELETE",
            url: urlAPI + "api/Representante/" + codigo,
            contentType: "application/json;charset=utf-8",
            success: function () {
                alert('Exclusão efetuada!');
                location.reload(); // Recarrega a página para atualizar a tabela
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Erro ao excluir o Representante: " + errorThrown);
            }
        });
    }

    function visualizar(codigo) {
        $.ajax({
            type: "GET",
            url: urlAPI + "api/Representante/" + codigo,
            contentType: "application/json;charset=utf-8",
            data: {},
            dataType: "json",
            success: function (jsonResult) {
                RepresentanteDados = jsonResult;
                $("#txtid").val(jsonResult.id);
                $("#txtnomeCompleto").val(jsonResult.nomeCompleto);
                // Formatar e definir a data de nascimento
                var dataNascimento = new Date(jsonResult.dataNascimento);
                var formattedDate = dataNascimento.toISOString().split('T')[0];
                $("#txtdataNascimento").val(formattedDate);
                $("#txtrgNumero").val(jsonResult.rgNumero);
                $("#txtrgDataEmissao").val(new Date(jsonResult.rgDataEmissao).toISOString().split('T')[0]);
                $("#txtrgOrgaoExpedidor").val(jsonResult.rgOrgaoExpedidor);
                $("#selectRgUfEmissao").val(jsonResult.rgUfEmissao);
                $("#txtcnsNumero").val(jsonResult.cnsNumero);
                $("#txtcpfNumero").val(jsonResult.cpfNumero);
                $("#txtdataCadastro").val(new Date(jsonResult.dataCadastro).toISOString().split('T')[0]);
                $("#selectStatus").val(jsonResult.idStatus);
                $("#selectSexo").val(jsonResult.idSexo);
                $("#selectProfissao").val(jsonResult.idProfissao);
                $("#selectCorRaca").val(jsonResult.idCorRaca);
                $("#selectEstadoCivil").val(jsonResult.idEstadoCivil);
                $("#txtnomeMae").val(jsonResult.nomeMae);
                $("#txtnomeConjuge").val(jsonResult.nomeConjuge);
                $("#selectNaturalidadeUf").val(jsonResult.naturalidadeUf);

                contatos = jsonResult.contato.map(c => ({
                    idTipoContato: c.idTipoContato,
                    tipo: c.tipocontato.nome,
                    valor: c.valor
                }));
                atualizarTabelaContatos();

                enderecos = jsonResult.endereco.map(e => ({
                    idTipoEndereco: e.idTipoEndereco,
                    tipo: e.tipoendereco.nome,
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

                // Carregar os municípios depois de definir o estado
                carregarMunicipios(jsonResult.naturalidadeUf, $("#selectNaturalidadeCidade"), jsonResult.naturalidadeCidade);

                // Calcular idade e definir no campo
                let idade = calcularIdade(dataNascimento);
                $("#txtidade").val(idade);
            },
            error: function (response) {
                alert("Erro ao carregar os dados: " + response);
            }
        });
    }

    function calcularIdade(dataNascimento) {
        let hoje = new Date();
        let idade = hoje.getFullYear() - dataNascimento.getFullYear();
        let m = hoje.getMonth() - dataNascimento.getMonth();

        if (m < 0 || (m === 0 && hoje.getDate() < dataNascimento.getDate())) {
            idade--;
        }
        return idade;
    }

    carregarRepresentantes();
});
