# Requisitos de Software

## Lista de Requisitos Funcionais (RF)

Requisitos funcionais são especificações que descrevem o que o sistema deve fazer. Eles definem as funções, comportamentos e processos que o software precisa executar para atender às necessidades do usuário ou do negócio. 

### Requisitos Para o Administrador

| **ID** | **Descrição de Requisitos Para o Administrador**                                |
|--------|----------------------------------------------------------------------------------|
| RF1    | Adicionar um item no cardápio digital                                            |
| RF2    | Excluir um item no cardápio digital                                              |
| RF3    | Alterar um item no cardápio digital                                              |
| RF4    | Alterar o status de um pedido                                                    |
| RF5    | Visualizar um pedido                                                             |
| RF6    | Gerenciar um pedido                                                              |
| RF7    | Receber uma notificação sobre um pedido                                          |
| RF8    | O sistema deve conter uma conta de administrador já cadastrada                  |

### Requisitos Para o Usuário

| **ID** | **Descrição de Requisitos Para o Usuário**                                       |
|--------|----------------------------------------------------------------------------------|
| RF9    | Se cadastrar no sistema                                                          |
| RF10   | Realizar a autenticação no sistema                                               |
| RF11   | Visualizar o cardápio digital                                                    |
| RF12   | Gerenciar sua conta de usuário                                                   |
| RF13   | Adicionar produtos na sacola virtual de compras                                  |
| RF14   | Administrar os produtos da sacola virtual                                        |
| RF15   | Concluir seu pedido                                                              |
| RF16   | Realizar encomenda de produtos                                                   |
| RF17   | Reservar um produto                                                              |
| RF18   | Acompanhar o status do pedido                                                    |
| RF19   | Visualizar seu histórico de pedidos                                              |
| RF20   | Ganhar pontos de fidelidade por pedido                                           |
| RF21   | Avaliar um pedido                                                                |


## Lista de Requisitos Não Funcionais (RNF)

Requisitos não funcionais descrevem como o sistema da Bananoffee Doceria deve operar, garantindo qualidade, usabilidade e desempenho adequados à experiência dos usuários e à administração eficiente da plataforma.

### Usabilidade

| **ID**   | **Descrição**                                                                                                                                         |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| RNF01    | O sistema deve permitir que usuários localizem facilmente o cardápio, histórico de pedidos e área de login por meio de uma navegação clara e intuitiva. |
| RNF02    | As informações de contato devem estar disponíveis no rodapé do site/app com links clicáveis para e-mail, telefone e redes sociais da doceria.        |
| RNF03    | O processo de pedido e checkout deve ser guiado com ícones e orientações visuais para melhorar a compreensão, mesmo por usuários com pouca familiaridade digital. |
| RNF04    | A interface principal deve destacar os principais produtos e promoções, além de facilitar o acesso ao histórico de pedidos e status.   |
| RNF05    | O sistema deve ser acessível para usuários com diferentes níveis de habilidade técnica, com botões claros e sem sobrecarga de informações.            |
| RNF06    | O tempo de aprendizado para novos administradores não deve exceder 2 horas com o uso de um tutorial básico integrado ao painel administrativo.        |
| RNF07    | As cores da interface devem seguir a paleta visual da Bananoffee Doceria, refletindo a identidade da marca, com contraste adequado para legibilidade. |
| RNF08    | A tipografia utilizada no sistema deve seguir o padrão visual da marca, priorizando fontes legíveis e consistentes entre as telas.                    |

### Confiabilidade

| **ID**   | **Descrição**                                                                                         |
|----------|-------------------------------------------------------------------------------------------------------|
| RNF09    | O sistema deve estar disponível pelo menos 99,5% do tempo por mês (uptime), monitorado continuamente. |
| RNF10    | Em caso de falha de sistema, o serviço deve se recuperar automaticamente em até 10 minutos.          |

### Desempenho

| **ID**   | **Descrição**                                                                                                  |
|----------|----------------------------------------------------------------------------------------------------------------|
| RNF12    | O sistema deve suportar até 300 acessos simultâneos sem degradação perceptível de desempenho.                 |
| RNF13    | A resposta de qualquer ação do usuário (como adicionar à sacola ou mudar o status do pedido) deve ocorrer em até 3 segundos. |
| RNF14    | A interface de administração deve carregar completamente em até 4 segundos em conexões padrão (10 Mbps).       |

### Suportabilidade

| **ID**   | **Descrição**                                                                                                   |
|----------|-----------------------------------------------------------------------------------------------------------------|
| RNF15    | O sistema deve ser compatível com as duas versões mais recentes dos navegadores Chrome, Firefox, Edge e Safari.|
| RNF16    | O código-fonte deve seguir boas práticas de engenharia de software e estar documentado para facilitar manutenção.|
| RNF17    | O sistema deve permitir a atualização de categorias e produtos sem necessidade de interrupção do serviço.       |

---

### Referências

- ISO/IEC 25010:2011 – Systems and software Quality Requirements and Evaluation (SQuaRE) – System and software quality models.
- SOMMERVILLE, Ian. *Engenharia de Software*. 10ª ed. São Paulo: Pearson, 2011.
- PRESSMAN, Roger S. *Engenharia de Software: Uma Abordagem Profissional*. 8ª ed. Porto Alegre: AMGH, 2016.

---

## Histórico de Versão

| Data     | Versão | Descrição                            | Autor      |
| -------- | ------ | ------------------------------------ | ---------- |
| 14/05/25 | 1.0    | Criação do Documento e adição dos RF | Bruno Cruz |
| 14/05/25 | 1.1    | Correção e atualização do doc.       | Fábio Araújo |