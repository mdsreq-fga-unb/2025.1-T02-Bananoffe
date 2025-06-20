# Requisitos de Software

## Lista de Requisitos Funcionais (RF)

Requisitos funcionais são especificações que descrevem o que o sistema deve fazer. Eles definem as funções, comportamentos e processos que o software precisa executar para atender às necessidades do usuário ou do negócio. 

### Requisitos Para o Administrador

| **ID** | **Descrição de Requisitos Para o Administrador** |
| ------ | ------------------------------------------------ |
| RF01   | Adicionar um item no cardápio digital            |
| RF02   | Excluir um item no cardápio digital              |
| RF03   | Alterar um item no cardápio digital              |
| RF04   | Alterar o status de um pedido                    |
| RF05   | Visualizar um pedido                             |
| RF06   | Visualizar relatório de pagamentos recebidos     |
| RF07   | Alterar chave pix da doceria                     |

### Requisitos Para o Usuário

| **ID** | **Descrição de Requisitos Para o Usuário**      |
| ------ | ----------------------------------------------- |
| RF08   | Realizar cadastro no sistema                    |
| RF09   | Realizar login no sistema                       |
| RF10   | Visualizar o cardápio digital                   |
| RF11   | Alterar conta de usuário                        |
| RF12   | Excluir conta de usuário                        |
| RF13   | Adicionar produtos na sacola virtual de compras |
| RF14   | Remover os produtos da sacola virtual           |
| RF15   | Alterar os produtos da sacola virtual           |
| RF16   | Realizar pedido                                 |
| RF17   | Acompanhar o status do pedido                   |
| RF18   | Visualizar seu histórico de pedidos             |
| RF19   | Avaliar um pedido                               |
| RF20   | Realizar pagamento de pedido via pix            |

## Lista de Requisitos Não Funcionais (RNF)

Requisitos não funcionais descrevem como o sistema da Bananoffee Doceria deve operar, garantindo qualidade, usabilidade e desempenho adequados à experiência dos usuários e à administração eficiente da plataforma.

### Usabilidade

| Código | Requisito                                                                                                                                                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF01  | O sistema deve permitir que usuários localizem facilmente o cardápio, histórico de pedidos e área de login por meio de uma navegação com ícones visuais, facilitando o uso até para pessoas com pouca familiaridade digital. |
| RNF02  | A interface deve exibir feedbacks utilizando popups ao adicionar ou remover itens da sacola, realizar login ou confirmar pedidos.                                                                                            |
| RNF03  | A interface deve ser responsiva e adaptável a diferentes dispositivos: 360x640px (smartphones), 768x1024px (tablets) e 1366x768px (desktops).                                                                                |
| RNF04  | A interface principal deve destacar as principais categorias de produtos, sendo uma para fatias e outra para tortas inteiras.                                                                                                |
| RNF05  | As cores da interface devem seguir a paleta visual da Bananoffee Doceria, refletindo a identidade da marca, com contraste adequado para legibilidade.                                                                        |
| RNF06  | A tipografia utilizada no sistema deve seguir o padrão visual da marca, priorizando fontes legíveis e consistentes entre as telas.                                                                                           |

---

### Confiabilidade

| Código | Requisito                                                                                                                                                                                 |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF07  | O sistema deve permitir recuperação automática em caso de queda de conexão durante a finalização do pedido, restaurando os dados do carrinho usando o armazenamento local (LocalStorage). |
| RNF08  | O status dos pedidos deve refletir com precisão as atualizações feitas pelo administrador em tempo real.                                                                                  |

---

### Suportabilidade

| Código | Requisito                                                                                                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF09  | O sistema deve ser desenvolvido com as tecnologias Next.js, NestJS e MongoDB, visando facilitar a manutenção e evolução do código.                                              |
| RNF10  | A aplicação deve seguir uma arquitetura modular para facilitar a adição de novas funcionalidades.                                                                               |
| RNF11  | O sistema deve ter documentação no repositório para continuidade do desenvolvimento, incluindo instruções de contribuição, instalação, endpoints da API e estrutura do projeto. |
| RNF12  | O código-fonte deve estar versionado em repositório Git com histórico de mudanças.                                                                                              |

---

### Segurança

| Código | Requisito                                                                                                                                                         |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF13  | O sistema deve criptografar senhas dos usuários antes de armazená-las no banco de dados, utilizando o algoritmo bcrypt com salt para garantir segurança adequada. |
| RNF14  | O login deve utilizar autenticação segura com tokens JWT para sessões autenticadas.                                                                               |
| RNF15  | As requisições de pagamento devem ser protegidas com HTTPS e validação de origem confiável.                                                                       |
| RNF16  | O sistema deve expirar automaticamente sessões inativas após 30 minutos.                                                                                          |
| RNF17  | O sistema deve gerar códigos PIX únicos a partir de uma chave aleatória predefinida.                                                                              |

### Referências

- ISO/IEC 25010:2011 – Systems and software Quality Requirements and Evaluation (SQuaRE) – System and software quality models.
- SOMMERVILLE, Ian. *Engenharia de Software*. 10ª ed. São Paulo: Pearson, 2011.
- PRESSMAN, Roger S. *Engenharia de Software: Uma Abordagem Profissional*. 8ª ed. Porto Alegre: AMGH, 2016.

---

## Histórico de Versão

| Data     | Versão | Descrição                            | Autor        |
| -------- | ------ | ------------------------------------ | ------------ |
| 14/05/25 | 1.0    | Criação do Documento e adição dos RF | Bruno Cruz   |
| 14/05/25 | 1.1    | Correção e atualização do doc.       | Fábio Araújo |
| 21/05/25 | 1.2    | Correção e melhorias no doc.         | Fábio Araújo |
| 25/05/25 | 2.0    | Correção e melhorias no documento    | Bruno Cruz   |
| /06/25   | 2.1    | Correção da listas de requisitos     | Bruno Cruz   |