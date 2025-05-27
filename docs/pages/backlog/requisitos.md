# Requisitos de Software

## Lista de Requisitos Funcionais (RF)

Requisitos funcionais são especificações que descrevem o que o sistema deve fazer. Eles definem as funções, comportamentos e processos que o software precisa executar para atender às necessidades do usuário ou do negócio. 

### Requisitos Para o Administrador

| **ID** | **Descrição de Requisitos Para o Administrador**            |
| ------ | ----------------------------------------------------------- |
| RF01   | Adicionar um item no cardápio digital                       |
| RF02   | Excluir um item no cardápio digital                         |
| RF03   | Alterar um item no cardápio digital                         |
| RF04   | Alterar o status de um pedido                               |
| RF05   | Visualizar um pedido                                        |
| RF06   | Receber uma notificação sobre um pedido via SMS ou WhatsApp |
| RF07   | Receber notificação de pagamento realizado                  |
| RF08   | Confirmar recebimento do pagamento PIX                      |
| RF09   | Visualizar relatório de pagamentos recebidos                |
| RF10   | Gerenciar chave PIX da doceria                              |
| RF11   | Ter uma conta já cadastrada no sistema                      |

### Requisitos Para o Usuário

| **ID** | **Descrição de Requisitos Para o Usuário**                |
| ------ | --------------------------------------------------------- |
| RF12   | Se cadastrar no sistema                                   |
| RF13   | Realizar a autenticação no sistema                        |
| RF14   | Visualizar o cardápio digital                             |
| RF15   | Gerenciar sua conta de usuário                            |
| RF16   | Adicionar produtos na sacola virtual de compras           |
| RF17   | Remover os produtos da sacola virtual                     |
| RF18   | Inserir os produtos da sacola virtual                     |
| RF19   | Alterar os produtos da sacola virtual                     |
| RF20   | Concluir seu pedido                                       |
| RF21   | Realizar encomenda de produtos                            |
| RF22   | Reservar um produto                                       |
| RF23   | Acompanhar o status do pedido                             |
| RF24   | Visualizar seu histórico de pedidos                       |
| RF25   | Ganhar pontos de fidelidade por pedido                    |
| RF26   | Avaliar um pedido                                         |
| RF27   | Visualizar o valor total do pedido antes de finalizar     |
| RF28   | Gerar código PIX para pagamento do pedido                 |
| RF29   | Visualizar QR Code do PIX para pagamento                  |
| RF30   | Copiar código PIX (chave aleatória) para pagamento manual |
| RF31   | Efetuar o pagamento via PIX                               |
| RF32   | Confirmar o pagamento realizado via PIX                   |
| RF33   | Receber notificação de confirmação de pagamento           |
| RF34   | Visualizar comprovante de pagamento no histórico          |


## Lista de Requisitos Não Funcionais (RNF)

Requisitos não funcionais descrevem como o sistema da Bananoffee Doceria deve operar, garantindo qualidade, usabilidade e desempenho adequados à experiência dos usuários e à administração eficiente da plataforma.

### Usabilidade

| **ID** | **Descrição do Requisito de Usabilidade**                                                                                                                                                                                                                                     |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF01  | O sistema deve permitir que usuários localizem facilmente o cardápio, histórico de pedidos e área de login por meio de uma navegação com ícones visuais para melhorar a compreensão, assim até mesmo usuários com pouca familiaridade digital terão facilidade na utilização. |
| RNF02  | A interface deve exibir feedbacks visuais claros ao adicionar ou remover itens da sacola, realizar login ou confirmar pedidos.                                                                                                                                                |
| RNF03  | A interface deve ser responsiva e adaptável a diferentes dispositivos (smartphones, tablets, desktops).                                                                                                                                                                       |
| RNF04  | O sistema deve oferecer instruções claras durante o fluxo de pedido e pagamento.                                                                                                                                                                                              |
| RNF05  | Os botões e elementos interativos devem ser facilmente clicáveis e legíveis em qualquer dispositivo.                                                                                                                                                                          |
| RNF06  | A interface principal deve destacar os principais produtos e promoções, além de facilitar o acesso ao histórico de pedidos e status.                                                                                                                                          |
| RNF07  | O sistema deve ser acessível para usuários com diferentes níveis de habilidade técnica, com botões claros e sem sobrecarga de informações.                                                                                                                                    |
| RNF08  | As cores da interface devem seguir a paleta visual da Bananoffee Doceria, refletindo a identidade da marca, com contraste adequado para legibilidade.                                                                                                                         |
| RNF09  | A tipografia utilizada no sistema deve seguir o padrão visual da marca, priorizando fontes legíveis e consistentes entre as telas.                                                                                                                                            |
| RNF10  | O QR Code do PIX deve ser claramente visível e facilmente escaneável.                                                                                                                                                                                                         |
| RNF11  | O processo de pagamento deve ser intuitivo, com instruções claras sobre como realizar o PIX.                                                                                                                                                                                  |
| RNF12  | O sistema deve exibir o valor do pagamento de forma destacada e clara.                                                                                                                                                                                                        |

### Confiabilidade

| **ID** | **Descrição do Requisito de Confiabilidade**                                                                                        |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| RNF13  | O sistema deve permitir recuperação automática em caso de queda de conexão durante a finalização do pedido.                         |
| RNF14  | O sistema deve notificar o usuário se algum erro ocorrer durante o processo de pagamento, garantindo que o pedido não seja perdido. |
| RNF15  | A aplicação deve manter os dados dos usuários e pedidos salvos em caso de falhas.                                                   |
| RNF16  | O status dos pedidos deve refletir com precisão as atualizações feitas pelo administrador em tempo real.                            |
| RNF17  | O sistema deve estar disponível pelo menos 99,5% do tempo por mês (uptime), monitorado continuamente.                               |
| RNF18  | O sistema deve manter log de todas as transações PIX para auditoria.                                                                |
| RNF19  | Em caso de falha na geração do PIX, o sistema deve permitir nova tentativa imediatamente.                                           |

### Suportabilidade

| **ID** | **Descrição do Requisito de Suportabilidade**                                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| RNF20  | O sistema deve ser desenvolvido com tecnologias modernas (Next.js, NestJS) para facilitar a manutenção e evolução do código. |
| RNF21  | A aplicação deve seguir uma arquitetura modular para facilitar a adição de novas funcionalidades.                            |
| RNF22  | O sistema deve ter documentação básica que permita a continuidade do desenvolvimento por novos membros da equipe.            |
| RNF23  | O código-fonte deve estar versionado em repositório Git com histórico de mudanças.                                           |
| RNF24  | A base de dados deve permitir consultas eficientes e bem estruturadas com uso de MongoDB.                                    |
| RNF25  | O sistema deve permitir a atualização de categorias e produtos sem necessidade de interrupção do serviço.                    |

### Segurança

| **ID** | **Descrição do Requisito de Segurança**                                                                                   |
| ------ | ------------------------------------------------------------------------------------------------------------------------- |
| RNF26  | O sistema deve criptografar senhas dos usuários antes de armazená-las no banco de dados.                                  |
| RNF27  | O login deve utilizar autenticação segura, com tokens JWT para sessões autenticadas.                                      |
| RNF28  | As rotas administrativas devem ser protegidas e acessíveis apenas para usuários autenticados com perfil de administrador. |
| RNF29  | As requisições de pagamento devem ser protegidas com HTTPS e validação de origem confiável.                               |
| RNF30  | O sistema deve expirar automaticamente sessões inativas após 30 minutos.                                                  |
| RNF31  | Deve haver verificação de duplicidade no cadastro para evitar múltiplas contas com o mesmo e-mail.                        |
| RNF32  | O sistema deve gerar códigos PIX únicos e seguros para cada transação.                                                    |
| RNF33  | As informações de pagamento devem ser criptografadas durante a transmissão.                                               |
| RNF34  | O código PIX deve ter validade máxima de 30 minutos após a geração.                                                       |

---

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