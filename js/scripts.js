
(function($){
    $(window).on('resize', function () {
      if ($(window).width() > 768) $('#sidebar-collapse').collapse('show')
    })

    $(window).on('resize', function () {
      if ($(window).width() <= 767) $('#sidebar-collapse').collapse('hide')
    })

   
    $(".form .date").keyup(function(e){
        var currentValue = $(e.target).val();
        var newValue = autocompleteMMDDYYYYDateFormat( currentValue );
        if( newValue != currentValue ){
                $(e.target).val(newValue);
        }
    });

    $(".form .userTelefone").mask("(99) 9999Z-9999",{
        translation: {
          'Z': {
            pattern: /[0-9]/, optional: true
          }
        }
    });

    $(".form .userCardRegister, .form .userIdentidade").mask("9999999999",{
         translation: {
          'Z': {
            pattern: /[0-9]/
          }
        }
    });

    $(".form .userNomeInput").text($(".userNome").val());

    $(".form .userCardSchoolInput").text($(".userCardSchool").val());
    $(".form .userCardCourseNameInput").text($(".userCardCourseName").val());
    $(".form .userCardRegisterInput").text($(".userCardRegister").val());

    $(".form .userNome").keyup(function(event) {
        $(".userNomeInput").text($(this).val());
    });

    $(".form .userCardSchool").keyup(function(event) {
        $(".userCardSchoolInput").text($(this).val());
    });

    $(".form .userCardCourseName").keyup(function(event) {
        $(".userCardCourseNameInput").text($(this).val());
    });

     $(".form .userCardRegister").keyup(function(event) {
        $(".userCardRegisterInput").text($(this).val());
    });

    $(".form .cep").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $(".form .userRua").val("...");
                $(".form .userBairro").val("...");
                $(".form .userCidade").val("...");
                $(".form .userEstado").val("...");
                $(".form .userAddressNumber").val("...");
                
                //Consulta o webservice viacep.com.br/
                $.getJSON("http://api.postmon.com.br/v1/cep/"+ cep, function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $(".form .userRua").val(dados.logradouro);
                        $(".form .userBairro").val(dados.bairro);
                        $(".form .userCidade").val(dados.cidade);
                        $(".form .userEstado").val(dados.estado);
                        $(".form .userAddressNumber").val(dados.complemento);

                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulario_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulario_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulario_cep();
        }
    });

    function pad(n, width, z) {
          z = z || '0';
          n = n + '';
          return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    /**
    * This function helps to autocomplete the date format MMDDYYY
    * Converts M to 0M and MMD to MM0D. Ex. `1/` to `01/`, `01/1/` to `01/01/`
    * Adds slash for MM and MMDD Ex. `01` to `01/`, `01/02` to `01/02/`
    * Converts YY to YYYY. Ex. `01/01/01` to `01/01/2001`
    *
    * @param {String} str
    * @return {String}
    */
    var autocompleteMMDDYYYYDateFormat = function (str) {
            str = str.trim();
            var matches, year,
                    looksLike_MM_slash_DD = /^(\d\d\/)?\d\d$/,
                    looksLike_MM_slash_D_slash = /^(\d\d\/)?(\d\/)$/,
                    looksLike_MM_slash_DD_slash_DD = /^(\d\d\/\d\d\/)(\d\d)$/;
     
            if( looksLike_MM_slash_DD.test(str) ){
                    str += "/";
            }else if( looksLike_MM_slash_D_slash.test(str) ){
                    str = str.replace( looksLike_MM_slash_D_slash, "$10$2");
            }else if( looksLike_MM_slash_DD_slash_DD.test(str) ){
                    matches = str.match( looksLike_MM_slash_DD_slash_DD );
                    year = Number( matches[2] ) < 20 ? "20" : "19";
                    str = String( matches[1] ) + year + String(matches[2]);
            }
            return str;
    };

    function limpa_formulario_cep(){
        $(".form .userRua").val("");
        $(".form .userBairro").val("");
        $(".form .userCidade").val("");
        $(".form .userEstado").val("");
        $(".form .userAddressNumber").val("");
    }

    $("#preview").fadeOut();

    /*
    $(".perfilForm").on('submit',(function(e) {
          e.preventDefault();
          $.ajax({
                url: "ajaxPerfil.php",
                type: "POST",
                data:  new FormData(this),
                contentType: false,
                cache: false,
                processData:false,
                beforeSend : function(){
                    $("#err").fadeOut();
                },
                success: function(data){

                    console.log(data);

                    if(data=='invalid file'){
                        $("#err").html("Invalid File !").fadeIn();
                    }else{
                        // view uploaded file.
                        $("#preview").html(data).fadeIn();
                        $(".account")[0].reset(); 
                    }
                },        
                error: function(e){
                    $("#err").html(e).fadeIn();
                    
                }          
            });
     }));

     $(".userCadastroForm").on('submit',(function(e) {
          e.preventDefault();
          $.ajax({
                url: "ajaxCadastro.php",
                type: "POST",
                data:  new FormData(this),
                contentType: false,
                cache: false,
                processData:false,
                beforeSend : function(){
                    $("#err").fadeOut();
                },
                success: function(data){

                    if(data=='invalid file'){
                        $("#err").html("Invalid File !").fadeIn();
                    }else{
                        // view uploaded file.
                        
                        console.log(data == "ok");

                        if(data == "ok"){
                            $("#preview")
                                        .text("Registro Efetuado com Sucesso")
                                        .removeClass('bg-danger')
                                        .addClass('bg-success')
                        }else{
                            $("#preview")
                                        .text("Registro não foi efetuado, tente novamente mais tarde.")
                                        .removeClass('bg-success')
                                        .addClass('bg-danger');
                        }

                        $("#preview").fadeIn();
                    }
                },        
                error: function(e){
                    $("#err").html(e).fadeIn();
                    
                }          
            });
     }));

    $(".carteirinhaForm").on('submit',(function(e) {
          e.preventDefault();
          $.ajax({
                url: "ajaxCarteirinha.php",
                type: "POST",
                data:  new FormData(this),
                contentType: false,
                cache: false,
                processData:false,
                beforeSend : function(){
                    $("#err").fadeOut();
                },
                success: function(data){

                    if(data=='invalid file'){
                        $("#err").html("Invalid File !").fadeIn();
                    }else{
                        // view uploaded file.
                        console.log(data == "ok");

                        if(data == "ok"){
                            $("#preview")
                                        .text("Registro Efetuado com Sucesso")
                                        .removeClass('bg-danger')
                                        .addClass('bg-success')
                        }else{
                            $("#preview")
                                        .text("Registro não foi efetuado, tente novamente mais tarde.")
                                        .removeClass('bg-success')
                                        .addClass('bg-danger');
                        }

                        $("#preview").fadeIn();
                    }
                },        
                error: function(e){
                    $("#err").html(e).fadeIn();
                    
                }          
            });
     }));
     */

     /*
     $(".solicitacoesView .aprovar").on('click',(function(e) {
          e.preventDefault();
          $.ajax({
                url: "ajaxSolicitacoes.php",
                type: "POST",
                data:  {userCardID: $(this).data("value")},
                beforeSend : function(){
                    $("#err").fadeOut();
                },
                success: function(data){

                    if(data=='invalid file'){
                        $("#err").html("Invalid File !").fadeIn();
                    }else{
                        
                        // view uploaded file.
                        if(data == "ok"){
                            $("#preview")
                                        .text("Atualização de registro efetuada com sucesso!")
                                        .removeClass('bg-danger')
                                        .addClass('bg-success')
                        }else{
                            $("#preview")
                                        .text("Registro não foi efetuado, tente novamente mais tarde.")
                                        .removeClass('bg-success')
                                        .addClass('bg-danger');
                        }

                        $("#preview").fadeIn();
                    }
                },        
                error: function(e){
                    $("#err").html(e).fadeIn();
                    
                }          
            });
     }));

     /*
     $(".exportar .exportarBtn").on("click", function(evt){
        evt.preventDefault();

        $.ajax({
            url: "exportarZip.php",
            type: "POST",
            beforeSend : function(){
                $("#err").fadeOut();
            },
            success: function(data){
                    
                console.log(data == "ok");

                if(data == "ok"){
                    $("#preview")
                                .text("Registro Efetuado com Sucesso")
                                .removeClass('bg-danger')
                                .addClass('bg-success')
                }else{
                    $("#preview")
                                .text("Registro não foi efetuado, tente novamente mais tarde.")
                                .removeClass('bg-success')
                                .addClass('bg-danger');
                }

                $("#preview").fadeIn();
                
            },        
            error: function(e){
                $("#err").html(e).fadeIn();
                
            }          
        });
     })
     */

})(jQuery);