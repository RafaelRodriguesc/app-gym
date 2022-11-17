export class Clients {
  "nome": string = '';
  "idade": string = '';
  "email": string = '';
  "contato": dadosContato = new dadosContato;
  "endereco": dadosEndereco = new dadosEndereco;
  "modalidade": string = '';
  "plano": dadosPlano = new dadosPlano;
  "turno": string = ''
}


export class dadosEndereco {
  "cep": string = '';
  "logradouro": string = '';
  "bairro": string = '';
  "cidade": string = '';
  "estado": string = ''
}

export class dadosContato {
  "celular": string = '';
  "residencial": string = ''
}

export class dadosPlano {
  "nome": string = '';
  "valor": string = ''
}

