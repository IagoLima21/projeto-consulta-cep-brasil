  function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
  }

  function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
      // Atualiza os campos com os valores.
      document.getElementById('cep-resultado').value = conteudo.cep;
      document.getElementById('rua').value = conteudo.logradouro;
      document.getElementById('bairro').value = conteudo.bairro;
      document.getElementById('cidade').value = conteudo.localidade;
      document.getElementById('uf').value = conteudo.uf;

      // Esconde o formulário de busca.
      document.getElementById('formulario').style.display = "none";

      // Mostra o formulário de resultados.
      document.getElementById('resultado').style.display = "block";
    } else {
      // CEP não encontrado.
      limpa_formulário_cep();
      alert("CEP não encontrado.");
    }
  }

  function pesquisacep() {
    // Obtém o valor do CEP digitado pelo usuário.
    var cep = document.getElementById('cep').value.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== "") {
      // Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        // Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('cep-resultado').value = "...";
        document.getElementById('rua').value = "...";
        document.getElementById('bairro').value = "...";
        document.getElementById('cidade').value = "...";
        document.getElementById('uf').value = "...";

        // Cria um elemento javascript.
        var script = document.createElement('script');

        // Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

        // Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);
      } else {
        // CEP é inválido.
        limpa_formulário_cep();
        alert("CEP inválido. Digite apenas números.");
      }
    } else {
      // CEP sem valor, limpa formulário.
      limpa_formulário_cep();
    }
  }

  function formatarCEP(cepInput) {
    var cep = cepInput.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    cepInput.value = cep;

    var cepError = document.getElementById('cep-error');
    cepError.style.display = (cepInput.value.length !== 8) ? 'block' : 'none';
  }