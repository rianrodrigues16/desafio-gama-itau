
function pegaSomenteNumero(evt) {    
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;

    key = String.fromCharCode( key );

    var regex = /^[0-9.]+$/;
    if( !regex.test(key) ) {
       theEvent.returnValue = false;
       if(theEvent.preventDefault) theEvent.preventDefault();
    }
 }

 function pegaSomenteLetra(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;

    key = String.fromCharCode( key );

    var regex = /^([a-zA-Zà-úÀ-Ú-']|\s+)+$/;
    if( !regex.test(key) ) {
       theEvent.returnValue = false;
       if(theEvent.preventDefault) theEvent.preventDefault();
    }
}
function mascara_cpf(){
    var cpf = document.getElementById('cpf');

    if(cpf.value.length == 3 || cpf.value.length == 7){
        cpf.value += ".";
    }else if(cpf.value.length == 11){
        cpf.value += "-";
    }
}

function mascara_cep(){
    var cep = document.getElementById('cep'); 

    if(cep.value.length == 5){
        cep.value += "-";
    }
}

function mascara_telFixo(){
    var telFixo = document.getElementById('telFixo'); 

    if(telFixo.value.length == 0){
        telFixo.value += "(";
        //telFixo.value = ("(" + telFixo.value).slice(-2);;
    }
    else if( telFixo.value.length == 3){
        telFixo.value += ")";
    }else if(telFixo.value.length == 8){
        telFixo.value += "-";
    }
}

function mascara_telCelular(){
    var telCelular = document.getElementById('telCelular'); 

    if(telCelular.value.length == 0){
        telCelular.value += "(";
    }
    else if( telCelular.value.length == 3){
        telCelular.value += ")";
    }else if(telCelular.value.length == 9){
        telCelular.value += "-";
    }
}

//Evento do botão
var submit = document.getElementById('btn-submit');

submit.addEventListener('click', function(e) {
    var nome    = document.getElementById('nome');
    
    if(validadoDadosObrigatorios()){
        if(verificaEspacoDadosObri()){
            if(validarDados()){
                alert( nome.value.toUpperCase() +"\nSEU CADASTRO FOI ENVIADO COM SUCESSO");
            }else{
                e.preventDefault();
            }
        }else{
            e.preventDefault();
        }
    }
})

function validadoDadosObrigatorios(){//Cpf, Endereco, Numero, Telefone Celular
    var nome    = document.getElementById('nome');
    var cpf     = document.getElementById('cpf');
    var end     = document.getElementById('logradouro'); 
    var num     = document.getElementById('numero');
    var telCel  = document.getElementById('telCelular');

    if(nome.value.length < 3){
        return false;
    }else if(cpf.value.length < 14){
        return false;
    }else if(end.value.length < 3){
        return false;
    }else if(num.value.length == 0){
        return false;
    }else if(telCel.value.length < 14){
        return false;
    }   
    return true;
}

function verificaEspacoDadosObri(){
    var nome    = document.getElementById('nome');
    var end     = document.getElementById('logradouro'); 

    //Verifico se só tem espaço
    if(nome.value.trim().length < 3){
        alert("O nome contém somente " + nome.value.trim().length +" palavra, digite ao menos 3 palavras.");
        nome.value = nome.value.trim();
        nome.focus();
        return false;
    }else if(end.value.trim().length < 3){
        alert("O logradouro contém somente " + end.value.trim().length +" palavra, digite ao menos 3 palavras.");
        end.value = end.value.trim();
        end.focus()
        return false;
    }
    return true;
}

function validarDados()
{
    var cpf     = document.getElementById('cpf');
    var cep     = document.getElementById('cep');
    var telFix  = document.getElementById('telFixo')
    
    if(!TestaCPF(cpf.value)){
        alert("CPF não é Valido!");
        cpf.focus();
        return false;
    }else if (cep.value != "" && cep.value.length != 9) {
        alert("CEP não informado corretamente!");
        cep.focus();
        return false;
    }else if(telFixo.value != "" && telFixo.value.length != 13){
        alert("Telefone Fixo não informado corretamente!");
        telFixo.focus();
        return false;
    }
    return true;
}

function TestaCPF(strCPF) {
    var cpf = strCPF.replace(/[^0-9]/g,'');

    if (cpf== "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;  
}