export class Users {
  "nome": string = '';
  "contato": dadosContato = new dadosContato;
  "email": string = '';
  "senha": string = '';
  "acesso": string = '';
  "endereco": dadosEndereco = new dadosEndereco;

}

export class dadosContato {
  "celular": string = '';
  "residencial": string = ''
}

export class dadosEndereco {
  "cep": string = '';
  "logradouro": string = '';
  "bairro": string = '';
  "cidade": string = '';
  "estado": string = '';
}
